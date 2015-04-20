/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-highcharts',

  setupPreprocessorRegistry: function(type, registry) {
    var options = getOptions(this.parent && this.parent.options && this.parent.options['babel']);

    var plugin = {
      name   : 'ember-cli-babel',
      ext    : 'js',
      toTree : function(tree) {
        return require('broccoli-babel-transpiler')(tree, options);
      }
    };

    registry.add('js', plugin);
  },

  included: function(app) {
    this._super.included(app);

    var options = app.options.emberHighCharts || {includeHighCharts: true};

    if (options.includeHighCharts && options.includeHighMaps) {
      app.import('vendor/highcharts-release/highcharts.src.js');
      app.import('vendor/highmaps-release/map.src.js');
      return;
    }

    if (options.includeHighCharts) {
      app.import('vendor/highcharts-release/highcharts.src.js');
      return;
    }

    if (options.includeHighStock) {
      app.import('vendor/highstock-release/highstock.src.js');
      return;
    }

    if (options.includeHighMaps) {
      app.import('vendor/highmaps-release/highmaps.src.js');
      return;
    }
  }
};

function getOptions(options) {
  options = options || {};

  // Ensure modules aren't compiled unless explicitly set to compile
  options.blacklist = options.blacklist || ['es6.modules'];

  if (options.compileModules === true) {
    if (options.blacklist.indexOf('es6.modules') >= 0) {
      options.blacklist.splice(options.blacklist.indexOf('es6.modules'), 1);
    }

    delete options.compileModules;
  } else {
    if (options.blacklist.indexOf('es6.modules') < 0) {
      options.blacklist.push('es6.modules');
    }
  }

  // Ember-CLI inserts its own 'use strict' directive
  options.blacklist.push('useStrict');

  return options;
}
