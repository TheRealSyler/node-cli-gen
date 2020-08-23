# Node Cli Generator

This is a helper tool that generates a basic node cli with typescript, run `ncg NAME*`, then run `yarn && tsc -b && npm link` to compile and link the cli, after that you should be able to write `YOUR_CLI_NAME` in any cmd/terminal and get `YOUR_CLI_NAME, has been called.` echoed back.

| Command     | Description                       |
| ----------- | --------------------------------- |
| `ncg NAME*` | Creates a new typescript node cli |
