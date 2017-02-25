# ElixirScript Brunch Plugin

This plugin for brunch adds support for ElixirScript files.

It will look for files with the extensions `ex`, `exs`, or `exjs` in your watched paths

It depends on the `elixirscript` binary being in your path. For more information check here: [elixirscript](https://github.com/elixirscript/elixirscript)

elixirscript-brunch relies on the following options:

```javascript
plugins: {
  ...
  elixirscript: {
    inputFolder: "web/static/exjs",
    outputFolder: "web/static/js",
    format: "es",
    configPath: "path/to/my/elixirscript.exs"
  }
}
```

`inputFolder` (required if not specified in a config file): This is the folder that your elixirscript code is located

`outputFolder` (required if not specified in a config file): This is the folder that the output will end up in.

`format`  (optional): The module format of the output. Defaults to "es"

`configPath`  (optional): The path to your elixirscript.exs file. Defaults to current directory

Usage with Phoenix:
  This is just an example of how you could use this plugin with Phoenix

  1. Install the elixirscript-brunch plugin:
  ```bash
  npm install --save elixirscript-brunch
  ```

  *Note*: In your package.json file, be sure to place it above any of your other
  Brunch plugins. The reason for this is that Brunch runs plugins in the order that
  they appear in the package.json file.

  2. Configure the elixirscript-brunch plugin as described above.
  Using the above settings, your elixirscript code will be in the `web/static/exjs` folder
  and output will end up in your `web/static/js` folder.
