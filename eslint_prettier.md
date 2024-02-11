Credit: @ZackMFleischman

# Eslint

The tool [Eslint](https://github.com/eslint/eslint) will check for all kinds of stylistic and coding convention errors in your code, including _but not limited to_ formatting (which is the subset of problems that prettier makes go away by auto-formatting your code).

Eslint can be installed in your project via `npm install eslint --save-dev`, has a configuration file at the root of your project called `.eslintrc`, can be run via `npx eslint .`, and has a VSCode extension you can find [here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) which will use the installed eslint library and configuration file in your project.

If the VSCode linter is in a weird state, you can restart the linting server by opening up the command pallete in VSCode (Ctrl+Shift+P on Windows) and looking for `ESLint: Restart ESLint Server`.

## ESLint Configuration

This is the file `.eslintrc` that should live at the root of your project.

Here's the basic ESLint configuration with nothing customized for a browser-based javascript app:

```
{
    "env": {
        "browser": true,
        "node": true,
        "es2024": true
    },
    "extends": ["eslint:recommended"],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "impliedStrict": true
        }
    }
}
```

### `env` section

Javascript can be run in a browser, in node, in jest tests, etc, and all of these have different global scope variables. Whatever you put in this array will say "it's ok for this environments global variables to exist in your code, but no other global variables."

### `parserOptions` section

This is all about which javascript SYNTAX is valid. There's different language features (like async/await) in later versions of Javascript/ECMAScript, and normally javascript "scripts" can't import or require other modules so those words aren't allowed.

Setting the `ecmaVersion` to "latest" means it won't complain if you use all the new javascript language features.
Setting `sourceType` to module (instead of the default `script`) will mean it won't complain if you try to use `import` in your files to import other javascript files.
Setting `impliedStrict` to true under the `ecmaFeatures` means by default, your Javascript code will be more stringent with checks to ensure better formed code (javascript by default SUCKED because it had so many ways you can shoot yourself in the foot. This will stop you from doing that by throwing a linter error).

### `extends` section

This array is essentially saying "these are a list of names that represent groups of settings for rules to use, before applying any other custom rules in the `rules` section". (Think of these as "presets" of rules.) You can have more than 1 and each subsequent one overwrites any of the rules a preset that came before it might have set if there are conflicts.

### Rules

You can tweak individual rules by adding a "rules" section like this:

```
{
     "env": {
        "browser": true,
        "node": true,
        "es2024": true
    },
    "extends": ["eslint:recommended"],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "impliedStrict": true
        }
    }
    "rules": {
        "quotes": ["error", "double"],
        "curly": "warn"
    }
}
```

Rules can generally be "off", "warn", or "error" (and sometimes with different parameters depending on the [rules documentation](https://eslint.org/docs/latest/use/configure/rules)).

#### Adding new sets of rule configurations for existing rules.

People can come up with certain settings they like, and you can install these via `npm install` and that will make the names of these rules configurations available to use in the `"extends"` field. We're gonna use that later. This is different from adding entirely new rules, which is where plugins come in next.

## ESLint Plugins

Plugins are entirely new sets of custom rules that people have made that don't come standard with eslint. You would have to install these plugin libraries separately with npm install, and then add their name to a "plugins" section in eslint to make these rule-sets _available_ to eslint to use, and then you could turn those rules on for your project via the `extends` or `rules` objects.
e.g.
We want to add typescript linting rules, which don't come by default, so we do:

```
// 1. Install the plugin to our project
npm install --save-dev @typescript-eslint/eslint-plugin
```

and

```
// 2. Configure .eslintrc to use it as a plugin to make the ruleset availalbe, AS WELL as add the recommended ruleset to extends to turn those rules on
{
    "env": {
        "browser": true,
        "node": true,
        "es2024": true
    },
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "impliedStrict": true
        }
    },
     "plugins": ['@typescript-eslint']
}
```

(For typescript you also would need to change the parser, but that's not relevant for demonstrating the difference between eslint plugins and rulesets)

# Prettier

[Prettier](https://github.com/prettier/prettier) is the code formatter, and on its own, you just need to do:

1. Install it in your project

```
npm install --save-dev prettier
```

2. Install the [prettier VSCode extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
3. Make sure these 3 VSCode settings are set correctly:
    1. The prettier vscode extension is set to be the default formatter. (VSCode settings -> Search for "Default Formatter" -> Set to Prettier)
    2. Your "Format on Save" setting is on
    3. Your "Auto save" setting is set to "onFocusChange" and _not_ "off" or "afterDelay" (which won't work with formatting).

This should now format your code on save, which will happen when you hit ctrl+s or switch windows. You can also manually format the file by opening the command palette (ctrl+shift+P) and running the "Format Document" command (which can be bound to a shortcut if you wanted).

## Prettier Config File

The prettier extensionfor VSCode has its own settings you can access through VSCode settings -> prettier extension settings, and you can just set these in the UI to be whatever you want. These settings will apply by default for all your repos.

These VSCode prettier settings will be **overwritten completely** though if you specify a `.prettierrc` configuration file for your project at the root. This file would look like this:

```
{
    "printWidth": 120,
    "singleQuote": true,
    "tabWidth": 4,
    "trailingComma": "none",
}
```

If you _know_ you're the only one working in your repo, you don't need this `.prettierrc` file. Just use your VSCode prettier extension's settings.

_However_, if anyone else is going to contribute code to your repo, you should have a `.prettierrc` file, so you all have consistent formatting rules for the repo, even if you have different default configurations for prettier in your VSCode extensions.

# ESLint + Prettier Together

The way they recommend it working is that you _don't_ want to install any plugins for prettier. You don't need any new linting rules. Prettier is just going to fix the things anyway, so no need to warn you about it.

What ends up causing issues though, is sometimes your linter rules are going to say that the code that prettier has formatted is violating some of it's linter rules. That is to say, when you run prettier, it formats your code, and that code is now stuff that eslint is like "hey I don't like this, it breaks rules A and B for me."

The way they get around this is saying "Ok, so prettier is going to take care of a whole group of rules in eslint for you, so we don't need you to check those rules anymore, so just turn all of those rules off completely so there's no conflicts." The way we configure that is by installing the npm package `eslint-config-prettier` which is NOT an eslint plugin, but does make the `prettier` rule configuration available, which just turns off all the rules eslint might complain about, and we just need to add that to _the end_ of our `"extends"` section:

1. Install [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

```
npm install --save-dev eslint-config-prettier
```

2. Add "prettier" ruleset (that just turns off all the potentially conflicting eslint rules) to the end of our "extends" section in our eslint config

```
{
    "env": {
        "browser": true,
        "node": true,
        "es2024": true
    },
    "extends": ["eslint:recommended", "prettier"],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "impliedStrict": true
        }
    }
}
```

and that's it!

---

# What you should do to setup a new repo with eslint and prettier

I took all of the information up above, and condensed it into a small checklist below that you can use for setting up new repositories. Steps 4 and 5 you should only have to setup once, and they should persist when you make a new repo.

1. On a codespace (or anywhere `npm` is available), initialize your project with `npm` to create a package.json file:

```
npm init -y
```

2.  Install the packages `eslint`, `prettier`, and `eslint-config-prettier` in your repository:

```
npm install --save-dev eslint prettier eslint-config-prettier
```

3. Add an ESLint config file `.eslintrc` with the following configuration (the important part is the "extends" line with "prettier" at the end):

```
{
    "env": {
        "browser": true,
        "node": true,
        "es2024": true
    },
    "extends": ["eslint:recommended", "prettier"],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "impliedStrict": true
        }
    }
}
```

4. Verify you have the official [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) VSCode extensions installed.
5. Verify your VSCode Settings are set correctly (prettier is the default formatter, format on save is on, and auto-save is on):
    1. The prettier vscode extension is set to be the default formatter. (VSCode settings -> Search for "Default Formatter" -> Set to Prettier)
    2. Your "Format on Save" setting is on
    3. Your "Auto save" setting is set to "onFocusChange" and _not_ "off" or "afterDelay" (which won't work with formatting).
    4. Make sure the "Eslint: Debug" mode is enabled
6. (optional) Add a Prettier config file `.prettierrc` with the following configuration:

```
{
    "printWidth": 120,
    "singleQuote": true,
    "tabWidth": 4,
    "trailingComma": "none",
}
```
