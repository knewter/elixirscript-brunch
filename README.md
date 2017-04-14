# ElixirScript Brunch Plugin

This plugin for brunch adds support for ElixirScript files.

```bash
npm install --save elixirscript-brunch
```

It will look for files with the extensions `ex`, `exs`, or `exjs` in your watched paths

It depends on the `elixirscript` binary being in your path. For more information check here: [elixirscript](https://github.com/elixirscript/elixirscript)

elixirscript-brunch relies on the following options:

```javascript
plugins: {
  ...
  elixirscript: {
    inputFolder: "my/exjs/code/path",
    outputFolder: "my/output/path",
    format: "umd",
    jsModules: [
      ["React", "react"]
    ]
  }
}
```

`inputFolder` (optional): This is the folder that your elixirscript code is located. 
Defaults to current working directory

`outputFolder` (optional): This is the folder that the output will end up in.
Defaults to 'js' folder in paths.public

`format` (optional): The module format of the output. Defaults to "umd"

`jsModules` (optional): A list of JavaScript modules used
