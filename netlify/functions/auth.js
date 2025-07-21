// netlify/functions/auth.js
const { URLSearchParams } = require('url');
const fetch = require('node-fetch'); // You might need to install node-fetch
const jwt = require('jsonwebtoken'); // You might need to install jsonwebtoken

exports.handler = async (event, context) => {
  const { queryStringParameters } = event;
  const { provider, site_id, scope, code, state } = queryStringParameters;

  // Ensure you have these as Netlify Environment Variables
  const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
  const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
  const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
  const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN; // Personal Access Token for the repo

  const redirectUri = `${process.env.URL}/admin/`; // Your Decap CMS admin URL

  if (!code) {
    // Step 1: Redirect to Auth0 for login
    const authorizeUrl = `https://${AUTH0_DOMAIN}/authorize?` + new URLSearchParams({
      audience: `https://${AUTH0_DOMAIN}/api/v2/`, // Or your custom API identifier
      scope: 'openid profile email', // Standard OpenID scopes
      response_type: 'code',
      client_id: AUTH0_CLIENT_ID,
      redirect_uri: `${process.env.URL}/.netlify/functions/auth`, // This function's URL for callback
      state: state || 'decap-cms-auth', // Pass the state from Decap CMS if available
    }).toString();

    return {
      statusCode: 302,
      headers: {
        Location: authorizeUrl,
      },
    };
  } else {
    // Step 2: Handle Auth0 callback and exchange code for token
    try {
      const tokenResponse = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: AUTH0_CLIENT_ID,
          client_secret: AUTH0_CLIENT_SECRET,
          code: code,
          redirect_uri: `${process.env.URL}/.netlify/functions/auth`,
        }).toString(),
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        console.error('Auth0 token error:', tokenData.error_description);
        return {
          statusCode: 500,
          body: `Auth0 token error: ${tokenData.error_description}`,
        };
      }

      const idToken = tokenData.id_token;
      const accessToken = tokenData.access_token; // This is the Auth0 access token

      // You need to decide how to authenticate with GitHub.
      // Option 1: If your Auth0 setup has a GitHub connection AND
      // your Auth0 rule/action issues a JWT with GitHub's access token (complex).
      // Option 2: Use a GitHub Personal Access Token (PAT) for the Decap CMS backend operations.
      // Decap CMS's GitHub backend primarily needs direct GitHub access for commits.

      // For the sake of a simpler initial setup, let's assume you'll manage
      // GitHub authorization for the CMS directly or via a PAT for commits.
      // If you *must* use Auth0 to get a GitHub token, you'd need an Auth0 Rule/Action
      // to exchange the Auth0 token for a GitHub token, and then ensure that GitHub
      // token is passed back in the JWT in a way Decap CMS can understand.

      // For Decap CMS with GitHub backend, the simplest approach for the proxy
      // is to handle the Auth0 login, and then if the user is authorized,
      // simply redirect them back to the CMS with a success message,
      // allowing Decap CMS to use the configured GitHub PAT or its own Git Gateway
      // (if you were still using Netlify Identity's Git Gateway).
      // Since Netlify Identity is deprecated, you're likely going to need to
      // provide a GitHub Personal Access Token to the Decap CMS setup, or
      // implement a more complex server-side Git Gateway.

      // **Important: For Decap CMS GitHub backend, it typically expects a GitHub token
      // to be provided, either via Netlify Identity's Git Gateway or an external
      // OAuth proxy that issues GitHub tokens.**

      // For a simpler Auth0 integration that focuses on user authentication
      // for Decap CMS, you'd usually have Decap CMS configured to use Auth0 as
      // an *external OAuth provider* where Auth0 handles user login, and then
      // your serverless function tells Decap CMS the user is authenticated.
      // The actual Git operations still need to be authorized.

      // A more direct path: If you're setting up Auth0 purely for user authentication
      // and then expecting Decap CMS's GitHub backend to "just work" with it,
      // that's not how it typically functions. The GitHub backend needs a way to
      // commit to your repo.

      // Given your current config:
      // backend:
      //   name: github
      //   repo: fat-buddha-designs/FWF3
      //   branch: main
      //   base_url: https://fwfrost-engineers.netlify.app
      //   auth_endpoint: auth

      // This means Decap CMS expects your `auth_endpoint` to provide the
      // necessary authentication for GitHub.
      // This typically involves your serverless function having access to a GitHub PAT
      // and using it to *sign* a JWT that Decap CMS will then verify and use for GitHub operations.
      // This is what Netlify's Git Gateway used to do.

      // Let's assume for a moment that your Auth0 setup will
      // give you a user identity, and you'll rely on a pre-configured
      // GitHub token for Decap CMS operations. This isn't ideal for
      // granular user permissions but simplifies the initial setup.

      // Alternative: The recommended way to integrate Auth0 for Decap CMS
      // when using a Git backend *without* Netlify Identity is to use an
      // "External OAuth Client" (Decap CMS calls them "OAuth proxies").
      // These proxies take the Auth0 login, then use their own credentials
      // (e.g., a GitHub PAT) to generate a short-lived token for Decap CMS.

      // Let's try to simulate the success callback for Decap CMS.
      // Decap CMS expects a postMessage with an object containing `token`
      // (which would be a GitHub token or a token your proxy generates
      // and Decap CMS understands for Git operations)
      // and potentially `user` information.

      // For a GitHub backend using an external OAuth proxy, you typically need to:
      // 1. Authenticate the user with Auth0.
      // 2. In your Netlify Function, generate a **new token** (e.g., a JWT) that Decap CMS
      //    will recognize. This JWT should contain information about the authenticated user
      //    and, crucially, **allow the CMS to perform Git operations**.
      //    This usually means your serverless function needs to have access to a GitHub PAT
      //    that has `repo` scope, and then issue a short-lived token based on that.

      // This part is the most complex. You need a server-side component (your Netlify Function)
      // that acts as the "Git Gateway" by authenticating with GitHub itself.

      // Here's a simplified (and somewhat insecure for production without further hardening)
      // example of what your Netlify function might send back to Decap CMS.
      // This assumes your function has a GitHub Personal Access Token (GITHUB_ACCESS_TOKEN)
      // that Decap CMS will ultimately use. **This is generally not how Decap CMS
      // expects to receive GitHub tokens directly from the proxy without a proper
      // Git Gateway implementation.**

      // Let's re-evaluate: Decap CMS's GitHub backend expects authentication
      // to either be handled by Netlify Identity's Git Gateway or an external
      // OAuth proxy that implements a similar spec.

      // Given that `auth_endpoint: auth` is set, Decap CMS expects to interact
      // with *your* custom authentication server (the Netlify Function).

      // A more robust external OAuth proxy would:
      // 1. Authenticate with Auth0.
      // 2. If Auth0 user is valid, your function validates if this user is allowed to access the CMS.
      // 3. If authorized, your function uses a GitHub Personal Access Token (stored securely as an environment variable)
      //    to generate a *temporary* access token for GitHub.
      // 4. Send this temporary GitHub token back to Decap CMS.

      // However, many simpler external OAuth proxy examples don't actually
      // exchange Auth0 tokens for GitHub tokens. Instead, they just verify
      // the user with Auth0 and then assume Decap CMS will use its own
      // GitHub credentials or a configured Git Gateway.

      // Let's assume for now you are building a custom OAuth proxy that
      // just authenticates the user and then grants access.
      // Decap CMS requires a token for the `github` backend.
      // The `auth_endpoint` refers to a custom OAuth provider.

      // The `base_url` and `auth_endpoint` in your `config.yml` suggest you want
      // to use a custom OAuth provider. The backend `name: github` still implies
      // that GitHub API calls will be made.

      // The simplest way to get a custom Auth0 login working with Decap CMS
      // *without* fully re-implementing Git Gateway is often:
      // 1. Use Auth0 for user login.
      // 2. Once authenticated, your serverless function generates a simple JWT
      //    that merely indicates successful authentication for Decap CMS.
      // 3. You then use Netlify's "Git Gateway" *functionality* (which is still available
      //    as a separate feature even if Identity is deprecated) or provide
      //    a GitHub Personal Access Token directly to Netlify's build process
      //    for the CMS to use for commits. This is where it gets tricky with deprecated Identity.

      // **Let's pivot to the recommended Netlify/Auth0 approach for Decap CMS:**
      // Netlify now has an official Auth0 integration. This aims to replace Netlify Identity.
      // This integration should handle the server-side OAuth flow for you.