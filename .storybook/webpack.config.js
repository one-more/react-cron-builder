const path = require('path');
const root = path.join(__dirname, '..');

// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
     resolve: {
        root: path.join(root, 'src')
    },
    plugins: [
        // your custom plugins
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css!postcss!resolve-url'
            },
            {
                test: /\.(styl)$/,
                loader: 'style!css!postcss!resolve-url!stylus'
            },
        ],
    },
};
