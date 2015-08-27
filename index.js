"use strict";

function ElixirScriptPlugin(config) {
}

// Tell Brunch we are indeed a plugin for it
ElixirScriptPlugin.prototype.brunchPlugin = true;
// We are a javascript compiler
ElixirScriptPlugin.prototype.type = "javascript";
// We handle .ex files
ElixirScriptPlugin.prototype.extension = "ex";

// On-the-fly compilation callback (file by file); assumes Brunch already
// accepted that file for our plugin by checking `type`, `extension` and
// `pattern`.
ElixirScriptPlugin.prototype.compile = function processMarkers(params, callback) {
  console.log(params.data);
  callback(null, params);
};

module.exports = ElixirScriptPlugin;
