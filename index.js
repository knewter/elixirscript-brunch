"use strict";

var childProcess = require("child_process");
var path = require("path");

function ElixirScriptPlugin(config) {
  var defaults = {
    inputFolder: process.cwd(),
    outputFolder: path.join(config.paths.public, "js"),
    format: "umd",
    jsModules: []
  };

  var elixirscriptConfig = config.plugins && config.plugins.elixirscript || {};
  this.config = Object.assign({}, defaults, elixirscriptConfig);
}

// Tell Brunch we are indeed a plugin for it
ElixirScriptPlugin.prototype.brunchPlugin = true;
// We are a javascript compiler
ElixirScriptPlugin.prototype.type = "javascript";

// We handle .ex, .exs, and .exjs files
ElixirScriptPlugin.prototype.extension = "ex";
ElixirScriptPlugin.prototype.pattern = /\.ex(s|js)?/;

ElixirScriptPlugin.prototype.stripTrailingSlash = function(str) {
  const separatedPath = str.split(path.sep);
  path.join.apply(path, separatedPath);
};

ElixirScriptPlugin.prototype.compile = function(file, callback) {
  return callback(null, "");
};

ElixirScriptPlugin.prototype.onCompile = function() {
  var args = ["elixirscript"];

  if (this.config.inputFolder) {
    var input = [];

    if (Array.isArray(this.config.inputFolder)) {
      input = this.config.inputFolder;
    } else {
      input = [this.config.inputFolder];
    }

    input = input.join(" ");

    args.push(input);
  }

  args = args.concat(["-o", this.config.outputFolder]);
  args = args.concat(["-f", this.config.format]);

  modules = this.config.jsModules.map(function(module) {
    return "--js-module" + module.join(":");
  });

  args = args.concat(modules);

  var command = args.join(" ");
  childProcess.execSync(command);
};

module.exports = ElixirScriptPlugin;
