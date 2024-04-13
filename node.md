# Node commands

| command                                      | description                                                                                                                                      |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `node -v`                                    | check node version                                                                                                                               |
| `node`                                       | enter node REPL                                                                                                                                  |
| `.editor`                                    | turn on multi-line typing in REPL                                                                                                                |
| `.exit`                                      | exit node                                                                                                                                        |
| `require('module').builtinModules`           | lists all core node modules                                                                                                                      |
| `console.assert([condition that will fail])` | using the console module to print to the terminal                                                                                                |
| `process.env`                                | the `env` object of the global `process` module stores and controls information about the environment in which the process is currently running. |
| `process.env.NODE_ENV`                       | setting a variable called `NODE_ENV` in the `env` object can be used to determine `development` or `production` environment                      |
| `process.memoryUsage()`                      | returns information on the CPU demands of the current process                                                                                    |
| `const os = require('os')`                   | unlike `process` and `console`, `os` is not a global module and needs to be imported                                                             |
