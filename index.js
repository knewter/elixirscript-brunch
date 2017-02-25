"use strict";

var exec = require("child_process").exec;

function ElixirScriptPlugin(config) {
  var elixirscriptConfig = config.plugins && config.plugins.elixirscript || {};

  this.config = Object.assign({}, elixirscriptConfig);

  this.config.inputFolder = this.stripTrailingSlash(this.config.inputFolder);
  this.config.outputFolder = this.stripTrailingSlash(this.config.outputFolder);

  this.compile = this.doCompile;
}

// Tell Brunch we are indeed a plugin for it
ElixirScriptPlugin.prototype.brunchPlugin = true;
// We are a javascript compiler
ElixirScriptPlugin.prototype.type = "javascript";

// We handle .ex, .exs, and .exjs files
ElixirScriptPlugin.prototype.extension = "ex";
ElixirScriptPlugin.prototype.pattern = /\.ex(s|js)?/;

ElixirScriptPlugin.prototype.stripTrailingSlash = function(str) {
  var lastIndex = str.length - 1;

  if (str.substr(lastIndex) === "/") {
    return str.substr(0, lastIndex);
  }

  return str;
};

ElixirScriptPlugin.prototype.debounce = function(func, wait) {
  var timeout;
  var previousCallback = null;
  return function(params, callback) {
    var later = function() {
      timeout = null;
      previousCallback = null;
      func(params, callback);
    };

    clearTimeout(timeout);
    if (previousCallback) {
      previousCallback(null, null);
    }

    previousCallback = callback;
    timeout = setTimeout(later, wait);
  };
};

ElixirScriptPlugin.prototype.doCompile = function(params, callback) {
  var args = ["elixirscript"];

  if (this.config.inputFolder) {
    var inputFolders = Array.isArray(this.config.inputFolder)
      ? this.config.inputFolder
      : [this.config.inputFolder];

    args = args.concat(inputFolders);
  }

  if (this.config.outputFolder) {
    args = args.concat(["-o", this.config.outputFolder]);
  }

  if (this.config.format) {
    args = args.concat(["-f", this.config.format]);
  }

  if (this.config.configPath) {
    args = args.concat(["-c", this.config.configPath]);
  }

  var command = args.join(" ");

  exec(command, function(error, stdout, stderr) {
    if (error) {
      return callback(error);
    } else {
      return callback(null, null);
    }
  });
};

module.exports = ElixirScriptPlugin;
