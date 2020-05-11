# Extended Hasura CLI with Modules

This is a proof of concept following this [RFC](RFC.md).

You can follow the discussion in the [issue in the Hasura GE repository]().

## Installation

You need to install the [Hasura CLI](https://hasura.io/docs/1.0/graphql/manual/hasura-cli/install-hasura-cli.html) and [Deno](https://deno.land/) first.

Then you can install the extended CLI with:

```
deno install -A hasura-ext https://github.com/platyplus/hasura-modules/raw/master/index.ts
```

## Usage

The extended Hasura CLI wraps the existing Hasura CLI commands, and add the following _modules_ commands:

### `hasura-ext modules list`

### `hasura-ext modules install <module-name>`

### `hasura-ext modules uninstall <module-name>`

### `hasura-ext modules upgrade <module-name>`
