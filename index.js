"use strict";

var exec = require('child_process').exec;
var BabelCompiler = require('babel-brunch');

function ElixirScriptPlugin(config) {
  this.babelCompiler = new BabelCompiler(config);
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
  var babelCompiler = this.babelCompiler;

  exec("ex2js '" + params.data + "' -ex", function(error, stdout, stderr){
    params.data = stdout;
    babelCompiler.compile(params, callback);
  });
};

module.exports = ElixirScriptPlugin;

