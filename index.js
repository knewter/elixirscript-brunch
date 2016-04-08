"use strict";

var exec = require('child_process').exec;
var fs = require('fs');
var temp = require("temp").track();
var rollup = require('rollup');
var babel = require('babel-core');

function ElixirScriptPlugin(config) {
  var elixirscriptConfig = config.plugins && config.plugins.elixirscript || {};

  this.config = Object.assign({ convertToES5: true }, elixirscriptConfig);

  if(!this.config.inputFolder){
    throw new Error("'inputFolder' required");
  }

  if(!this.config.mainModule){
    throw new Error("'mainModule' required");
  }

  if(!this.config.outputFolder){
    throw new Error("'outputFolder' required");
  }

  this.config.inputFolder = this.stripTrailingSlash(this.config.inputFolder);
  this.config.outputFolder = this.stripTrailingSlash(this.config.outputFolder);

  this.compile = this.debounce((params, callback) => { this.doCompile(params, callback) }, 250);
}

// Tell Brunch we are indeed a plugin for it
ElixirScriptPlugin.prototype.brunchPlugin = true;
// We are a javascript compiler
ElixirScriptPlugin.prototype.type = "javascript";

// We handle .ex, .exs, and .exjs files
ElixirScriptPlugin.prototype.extension = "ex";
ElixirScriptPlugin.prototype.pattern = /\.ex(s|js)?/;

ElixirScriptPlugin.prototype.stripTrailingSlash = function(str){
  var lastIndex = str.length - 1;

  if(str.substr(lastIndex) === '/') {
      return str.substr(0, lastIndex);
  }

  return str;
}

ElixirScriptPlugin.prototype.debounce = function(func, wait){
  var timeout;
  var previousCallback = null;
  return function(params, callback) {

    var later = function() {
      timeout = null;
      previousCallback = null;
      func(params, callback);
    };

    clearTimeout(timeout);
    if(previousCallback){
      previousCallback(null, null);
    }

    previousCallback = callback;
    timeout = setTimeout(later, wait);
  };
}

ElixirScriptPlugin.prototype.doCompile = function(params, callback){
  var inputFolder = this.config.inputFolder;
  var mainModule = this.config.mainModule;
  var convertToES5 = this.config.convertToES5;
  var outputPath = this.config.outputFolder + "/" + mainModule + ".js";

  temp.mkdir('elixirscript-brunch', function(err, dirPath) {

    exec("elixirscript '" + inputFolder + "' -o '" + dirPath + "'", function(error, stdout, stderr){
      if(error){
        return callback(error);
      }

      rollup.rollup({
        entry: dirPath + "/Elixir." + mainModule + ".js"
      }).then(function (bundle) {

        var result = bundle.generate({ format: 'es6' });

        if(convertToES5){
          result = babel.transform(result.code, { presets: ['es2015'] })
        }

        fs.writeFile(outputPath, result.code, function (err) {
          if (err){
            return callback(err);
          }

          return callback(null, null);
        });
      });
    });
  });
}

module.exports = ElixirScriptPlugin;
