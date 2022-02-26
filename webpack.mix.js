const mix = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

console.log(path.resolve(__dirname, 'resources/js/react/assets'));

mix.disableNotifications();
mix.js('resources/js/app.js', 'public/js').react();
mix.webpackConfig({
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'resources/js/app'),
      config: path.resolve(__dirname, 'resources/js/app/config'),
      components: path.resolve(__dirname, 'resources/js/app/components'),
      assets: path.resolve(__dirname, 'resources/js/app/assets/'),
      styles: path.resolve(__dirname, 'resources/js/app/assets/theme/styles')
    }
  }
});
