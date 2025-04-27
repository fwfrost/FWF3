import slugify from 'slugify';
import markdownIt from 'markdown-it';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';
import markdownitMark from 'markdown-it-mark';
import markdownitAbbr from 'markdown-it-abbr';

function markdownItSlugify(s) {
  return slugify(removeExtraText(s), {lower: true, remove: /[\=\":’'`,]/g});
}

function removeExtraText(s) {
  let newStr = String(s);
  newStr = newStr.replace(/\-beta\.\d+/, '');
  newStr = newStr.replace(/\-canary\.\d+/, '');
  newStr = newStr.replace(/New\ in\ v\d+\.\d+\.\d+/, '');
  newStr = newStr.replace(/Added\ in\ v\d+\.\d+\.\d+/, '');
  newStr = newStr.replace(/Coming\ soon\ in\ v\d+\.\d+\.\d+/, '');
  newStr = newStr.replace(/⚠️/g, '');
  newStr = newStr.replace(/[?!]/g, '');
  newStr = newStr.replace(/<[^>]*>/g, '');
  return newStr;
}

export default function (eleventyConfig) {
  let markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  })
    .use(markdownItClass, {
      ol: 'list',
      ul: 'list'
    })
    .use(markdownItLinkAttributes, [
      {
        // match external links
        matcher(href) {
          return href.match(/^https?:\/\//);
        },
        attrs: {
          target: '_blank',
          rel: 'noopener'
        }
      }
    ])
    .use(markdownitMark)
    .use(markdownitAbbr);

  // opt out of linkification for .io TLD, e.g. 11ty.io
  markdownLib.linkify.tlds('.io', false);

  eleventyConfig.setLibrary('md', markdownLib);
}
