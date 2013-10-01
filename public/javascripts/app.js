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

;require.register("templates/home", function(exports, require, module) {
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<link href='http://fonts.googleapis.com/css?family=Buenard' rel='stylesheet' type='text/css'>\n<div class=\"hns\">hns(<span class=\"brad\"></span>)<span style=\"color: grey\">-></span></div>\n\n<pre class=\"file-manager repo\">\n  _____.__.__\n_/ ____\\__|  |   ____     _____ _____    ____ _____     ____   ___________\n\\   __\\|  |  | _/ __ \\   /     \\\\__  \\  /    \\\\__  \\   / ___\\_/ __ \\_  __ \\\n |  |  |  |  |_\\  ___/  |  Y Y  \\/ __ \\|   |  \\/ __ \\_/ /_/  >  ___/|  | \\/\n |__|  |__|____/\\___  > |__|_|  (____  /___|  (____  /\\___  / \\___  >__|\n                    \\/        \\/     \\/     \\/     \\//_____/      \\/\n</pre>\n\n<div class=\"map-holder\">\n    <div class=\"static\"></div>\n    <div class=\"vendor\"></div>\n    <div class=\"china-flag\"></div>\n    <div class=\"sprocket\"></div>\n\n    <div class=\"bike\" />\n    <img id=\"boston_map\" class=\"map\" src=\"";
  foundHelper = helpers.bostonMapUrl;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.bostonMapUrl; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n    <img id=\"china_map\" class=\"map\" src=\"";
  foundHelper = helpers.chinaMapUrl;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.chinaMapUrl; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n    <pre class=\"timber repo\">\n           (      *             (\n      *   ))\\ ) (  `     (      )\\ )\n    ` )  /(()/( )\\))(  ( )\\ (  (()/(\n     ( )(_))(_)|(_)()\\ )((_))\\  /(_))\n    (_(_()|_)) (_()((_|(_)_((_)(_))\n    |_   _|_ _||  \\/  || _ ) __| _ \\\n      | |  | | | |\\/| || _ \\ _||   /\n      |_| |___||_|  |_||___/___|_|_\\\n    </pre>\n    </div>\n</div>\n\n<div style=\"background: url(http://en.xn--icne-wqa.com/images/icones/1/8/ark-open.png); background-size: 4%; padding: 80px\">\n    <div class=\"note\">\n        <p>Example note, with some details.  signed <br/><br /> &mdash;Lincoln</p>\n        <p><img src=\"http://f.cl.ly/items/0K2V1C3G09083B1z2a3N/chicago-bikes.gif\" /></p>\n        <p><img src=\"//i.imgur.com/fXgaQWRh.jpg\" /></p>\n    </div>\n    <div class=\"note\">\n        <p>Brad, you brought us Jasmine...</p>\n        <p><img src=\"http://pivotal.github.io/jasmine/images/jasmine_logo.png\" /></p>\n        <p>:)</p>\n        <p>And built us a 3d sprocket!!</p>\n        <iframe src=\"http://sprocket3d.herokuapp.com/\" style=\"border: 10px dashed orange; margin: 5%; width: 90%; overflow: hidden; height: 440px;\" allowtransparency=\"yes\" scrolling=\"no\"></iframe>\n        <p><pre><code><iframe src=\"http://sprocket3d.herokuapp.com/\" style=\"border: 10px dashed orange; margin: 5%; width: 90%; overflow: hidden; height: 440px;\" allowtransparency=\"yes\" scrolling=\"no\"></iframe></code></pre></p>\n        <p>We iFramed all of the things with <code>allowtransparency=\"yes\"</code> and <code>scrolling=\"no\"</code> ;)</p>\n        <p>Have a great time in Chicago! We'll miss you!</p>\n        <p>&mdash; Adam</p>\n    </div>\n        <div class=\"note\">\n        <p>Thanks for all your help in my getting up to javascript speed, and for taking on the File Manager frontend!</p>\n        <p>Good Luck in ChiTown!</p>\n        <p>&mdash; Chris K</p>\n    </div>\n</div>\n";
  return buffer;});
});

;require.register("views/home", function(exports, require, module) {
var Backbone, HomeTemplate, HomeView, bikePath, bostonMapParams, bostonMapUrl, chinaMapParams, chinaMapUrl, coords, mapParams, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require('backbone');

HomeTemplate = require('templates/home');

coords = {
  boston: '33.284620,-96.503906',
  china: '28.690588,105.996094'
};

mapParams = {
  zoom: 3,
  maptype: 'terrain',
  size: '1000x500',
  sensor: false,
  style: 'feature:all|element:labels|visibility:off'
};

bostonMapParams = $.extend({}, mapParams, {
  center: coords.boston
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