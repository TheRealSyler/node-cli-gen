# Node Cli Generator

This is a helper tool that generates a basic node cli with typescript, after running `ncg NAME` make sure to change the package.json, then run `tsc -b && npm link` to compile and link the cli, after that you should be able to write `CLI_COMMAND` in any cmd/terminal ang get `YOUR_CLI_NAME, has been called.` echoed back.

| Command    | Description                       |
| ---------- | --------------------------------- |
| `ncg NAME` | Creates a new typescript node cli |
