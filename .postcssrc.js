// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    require("postcss-import")({
      extensions: ["pcss", "css"]
    }),
    // require('postcss-theme-variables')({
    //     vars: {
    //         'button-primary-background-color': "#0074e4",
    //         'button-primary-border-color': "#0074e4",
    //         'button-disabled-color': '#fff',
    //         'button-disabled-background-color': '#a1a1a1',
    //         'button-disabled-border-color': '#a1a1a1',
    //         'button-bottom-action-primary-background-color': "#0074e4"
    //     },
    //     prefix: '$'
    // }),
    require("precss")(),
    require("autoprefixer")({
      browsers: ["Android >= 4.0", "iOS >= 7"]
    })
  ]
};
