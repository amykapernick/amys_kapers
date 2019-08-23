const pluginA11yText = require("@11ty/eleventy-plugin-inclusive-language");
const pluginRespimg = require("eleventy-plugin-respimg");
// const cleanCss = require("clean-css");

module.exports = function(eleventyConfig) {
  // Config
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.setTemplateFormats("html, js, njk, png, jpg, svg, css");
  eleventyConfig.setBrowserSyncConfig({
    notify: true,
    watch: true
  });

  // Plugins
  eleventyConfig.addPlugin(pluginA11yText, {
    words:
      "simply,obviously,basically,of course,clearly,just,everyone knows,however,easy"
  });
  eleventyConfig.cloudinaryCloudName = "amyskapers";
  eleventyConfig.srcsetWidths = [320, 960, 1280];
  eleventyConfig.fallbackWidth = 640;
  eleventyConfig.addPlugin(pluginRespimg);
};
