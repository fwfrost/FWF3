import Accommodation from "/admin/preview-templates/accommodation.js";
import Page from "/admin/preview-templates/page.js";
import Sightings from "/admin/preview-templates/sightings.js";
import Sites from "/admin/preview-templates/sites.js";
import Species from "/admin/preview-templates/species.js";

// Register the Post component as the preview for entries in the blog collection
CMS.registerPreviewTemplate("pages", Page);

CMS.registerPreviewStyle("/assets/css/inline.css");
// Register any CSS file on the home page as a preview style
fetch("/")
  .then(response => response.text())
  .then(html => {
    const f = document.createElement("html");
    f.innerHTML = html;
    Array.from(f.getElementsByTagName("link")).forEach(tag => {
      if (tag.rel == "stylesheet" && !tag.media) {
        CMS.registerPreviewStyle(tag.href);
      }
    });
  });
