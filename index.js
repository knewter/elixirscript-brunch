"use strict";

var exec = require('child_process').exec;
var temp = require("temp").track();
var rollup = require('rollup');
var babel = require('babel-core');

function ElixirScriptPlugin(config) {
  this.compiled = false;
  this.config = config.plugins && config.plugins.elixirscript || {};
}

// Tell Brunch we are indeed a plugin for it
ElixirScriptPlugin.prototype.brunchPlugin = true;
// We are a javascript compiler
ElixirScriptPlugin.prototype.type = "javascript";

// We handle .ex, .exs, and .exjs files
ElixirScriptPlugin.prototype.extension = "ex";
ElixirScriptPlugin.prototype.pattern = /\.ex(s|js)?/;

// On-the-fly compilation callback (file by file); assumes Brunch already
// accepted that file for our plugin by checking `type`, `extension` and
// `pattern`.
ElixirScriptPlugin.prototype.compile = function(params, callback) {
  var classScope = this;

  if(classScope.compiled == false){
    classScope.compiled = true;
  }else if(classScope.compiled == true){
    return callback(null, null);
  }

  temp.mkdir('elixirscript-brunch', function(err, dirPath) {
    if(err){
      return callback(err);
    }

    exec("elixirscript '" + classScope.config.path + "' -o '" + dirPath + "'", function(error, stdout, stderr){
      if(error){
        return callback(error);
      }

      rollup.rollup({
        entry: dirPath + "/Elixir." + classScope.config.main + ".js"
      }).then(function (bundle) {

        var result = bundle.generate({ format: 'es6' });
        result = babel.transform(result.code, { presets: ['es2015'] })
        classScope.compiled = false;
        return callback(null, result.code);
      });
    });
  });
};

module.exports = ElixirScriptPlugin;
