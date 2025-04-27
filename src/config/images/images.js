import path from 'path';
import eleventyImage from '@11ty/eleventy-img';

export default eleventyConfig => {
  function relativeToInputPath(inputPath, relativeFilePath) {
    const split = inputPath.split('/');
    split.pop();

    return path.resolve(split.join(path.sep), relativeFilePath);
  }

  // Eleventy Image shortcode
  eleventyConfig.addAsyncShortcode('image', async function imageShortcode(src, alt, widths, sizes) {
    const formats = ['webp', 'auto'];
    const metadata = await eleventyImage(src, {
      urlPath: '/assets/img/',
      outputDir: './_site/assets/img/',
      widths: widths || [400, 800, 1200],
      formats,
      outputDir: path.join(eleventyConfig.dir.output, 'img')
    });

    // TODO loading=eager
    const imageAttributes = {
      alt,
      sizes: sizes || '(max-width: 1200px) 100vw, 1200px',
      loading: 'lazy',
      decoding: 'async'
    };
    return eleventyImage.generateHTML(metadata, imageAttributes);
  });
};
