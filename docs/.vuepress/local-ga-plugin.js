import path from 'node:path'

/**
 * @type {import('@vuepress/types').Plugin}
 */
export default (options = {}, context) => ({
  name: 'local-google-analytics',

  define () {
    const GA_ID = options.ga || false;
    return { GA_ID };
  },

  enhanceAppFiles: path.resolve(__dirname, 'ga-enhanceAppFile.js')
});