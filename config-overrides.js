const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');
const rewirePostcss = require('react-app-rewire-postcss');

module.exports = config => rewirePostcss(config, {
  plugins() {
    return [
      postcssNested,
      postcssPresetEnv({
        stage: 2,
        features: {
          'custom-media-queries': true,
          'custom-properties': {
            appendVariables: false,
            preserve: false, // use true when will be fixed bug with duplicate root variables
          },
        },
      }),
    ];
  },
});
