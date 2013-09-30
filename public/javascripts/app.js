(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("initialize", function(exports, require, module) {
var HomeView;

HomeView = require('views/home');

$(document).on('ready', function() {
  var homeView;
  homeView = new HomeView({
    el: $('#page-container')
  });
  return homeView.render();
});

});

;require.register("templates/page", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"map-holder\">\n    <img class=\"bike\" src=\"./img/bike.png\" />\n    <img id=\"boston_map\" class=\"map\" src=\"";
  foundHelper = helpers.bostonMapUrl;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.bostonMapUrl; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n    <img id=\"china_map\" class=\"map\" src=\"";
  foundHelper = helpers.chinaMapUrl;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.chinaMapUrl; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n<div>";
  return buffer;});
});

;require.register("views/home", function(exports, require, module) {
var Backbone, HomeTemplate, HomeView, bikePath, bostonMapParams, bostonMapUrl, chinaMapParams, chinaMapUrl, coords, mapParams, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require('backbone');

HomeTemplate = require('templates/page');

coords = {
  boston: '33.284620,-96.503906',
  china: '28.690588,105.996094'
};

mapParams = {
  zoom: 4,
  maptype: 'terrain',
  size: '1000x500',
  sensor: false,
  style: 'feature:all|element:labels|visibility:off'
};

bostonMapParams = $.extend({}, mapParams, {
  center: coords.boton
});

chinaMapParams = $.extend({}, mapParams, {
  center: coords.china
});

bostonMapUrl = 'http://maps.google.com/maps/api/staticmap?' + $.param(bostonMapParams);

chinaMapUrl = 'http://maps.google.com/maps/api/staticmap?' + $.param(chinaMapParams);

bikePath = [[80, 50], [25, 50], [22, 40], [75, 50]];

HomeView = (function(_super) {
  __extends(HomeView, _super);

  function HomeView() {
    _ref = HomeView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomeView.prototype.template = HomeTemplate;

  HomeView.prototype.bikePathStep = 0;

  HomeView.prototype.getContext = function() {
    var bostonCoords, chinaCoords;
    bostonCoords = '33.284620,-96.503906';
    chinaCoords = '28.690588,105.996094';
    mapParams = {
      zoom: 3,
      maptype: 'terrain',
      size: '1000x500',
      sensor: false,
      style: 'feature:all|element:labels|visibility:off'
    };
    bostonMapParams = $.extend({}, mapParams, {
      center: bostonCoords
    });
    chinaMapParams = $.extend({}, mapParams, {
      center: chinaCoords
    });
    bostonMapUrl = 'http://maps.google.com/maps/api/staticmap?' + $.param(bostonMapParams);
    chinaMapUrl = 'http://maps.google.com/maps/api/staticmap?' + $.param(chinaMapParams);
    return {
      bostonMapUrl: bostonMapUrl,
      chinaMapUrl: chinaMapUrl
    };
  };

  HomeView.prototype.render = function() {
    this.$el.html(this.template(this.getContext()));
    return this.pathStep();
  };

  HomeView.prototype.pathStep = function() {
    var coord;
    coord = bikePath[this.bikePathStep];
    this.$('.bike').animate({
      left: coord[0] + '%',
      top: coord[1] + '%'
    });
    this.$('.bike').toggleClass('flip', this.currentStep && this.currentStep < coord);
    this.currentStep = coord;
    this.bikePathStep++;
    if (this.bikePathStep > bikePath.length - 1) {
      this.bikePathStep = 0;
    }
    return _.delay(_.bind(this.pathStep, this), 5000);
  };

  return HomeView;

})(Backbone.View);

module.exports = HomeView;

});

;
//@ sourceMappingURL=app.js.map