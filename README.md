# ElixirScript Brunch Plugin

This plugin for brunch adds support for ElixirScript files.

It will look for files with the extensions `ex`, `exs`, or `exjs` in your watched paths

It depends on the `elixirscript` binary being in your path. For more information check here: [elixirscript](https://github.com/bryanjos/elixirscript)

elixirscript-brunch relies on the following options:

```javascript
plugins: {
  ...
  elixirscript: {
    inputFolder: "web/static/exjs",
    outputFolder: "web/static/js",
    mainModule: "MyApp",
    convertToES5: false
  }
}
```

`inputFolder` (required): This is the folder that your elixirscript code is located

`outputFolder` (required): This is the folder that the output will end up in.

`mainModule`  (required): The name of starting, or main, module in your elixirscript code.
  i.e. if your main module is:
  ```elixir
  defmodule MyApp do
    ...
  end
  ```
  then `MyApp` is the name to use here. elixirscript-brunch uses rollup to
  bundle the translated code together. Elixirscript's output names files with
  the module name. The output will be the name of the main module. In this case the output
  will be named "MyApp.js"

`convertToES5` (optional, defaults to false): Whether or not to transpile output to ES5 using babel and the
//es2015 preset

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
  and a file called `MyApp.js` will end up in your `web/static/js` folder.
  Since we made sure in our previous step this plugin runs before the others
  `MyApp.js` will be picked up by the remaining plugins in the pipeline for javascript.
  You can change this by updating the configuration if, for instance you would prefer
  not to output the file in to the `web/static/js` folder.
