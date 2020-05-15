# Hasura CLI supplemented with Modules

This is a proof of concept following this [RFC](RFC.md). It works together with this [module repository](https://github.com/platyplus/hasura-modules).

You can follow the discussion in the [issue in the Hasura GE repository](#).

## Installation

You need to install [Deno](https://deno.land/) first.

Then you can install the CLI supplement with:

```
deno install -A --unstable hasura-sup https://github.com/platyplus/hasura-modules/raw/master/index.ts
```

Note: the script installs the Hasura CLI if not installed already.

## Usage

The Hasura CLI supplement wraps the existing Hasura CLI commands, and add the following _modules_ commands:

- `hasura-sup modules list`

- `hasura-sup modules install <module-name>`

- `hasura-sup modules uninstall <module-name>`
