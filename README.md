# Rationale

Recurrent patterns are present in databases and areas currently covered by Hasura, for example authentication, sending of emails, soft delete, monetisation, storage rules, audit trail...
Whereas not all the business logic of such modules cannot sometimes be embbeded inside an Hasura instance, Hasura can be of great help to ease their implementation, through pieces of metadata and SQL schema.

## Keep track of the SQL migrations and Hasura metadata

## Dependencies between modules

## Interface

## Public repository

`hasura modules list`
`hasura modules show <module-name>`

## Installation

`hasura modules install <module-name>`

## Upgrade

`hasura modules upgrade <module-name>`

## Uninstallation

`hasura modules uninstall <module-name>`
`hasura modules uninstall <module-name> --only-metadata`
`hasura modules uninstall <module-name> --remove-optionals`

## Module directory structure

## Examples

### Module fully embedded into Hasura

Let's imagine quickly a set of SQL functions, triggers and views that allow to alter the tables to implement a soft delete system. Some functions could be mapped as Hasura metadata so an admin user can add soft deletion to a given table. Soft deleted records would be moved to a dedicated table with their values stored as JSONB.
Another function would be available to undo a deletion.

This way is not necessarily the best to implement soft deletion, and is described as a means to illustrate this RFC.

#### Installation

The installation proceedings would be:

- Ensure Hasura is running correctly and that the project `config.yaml` is correctly configured
- `hasura modules install soft-delete`
  - This command would run SQL migrations that create the necessary tables, functions, etc in a dedicated `soft_delete` Postgres schema, and add the corresponding operations to the existing Hasura metadata.
  - The corresponding SQL migrations would be added to the `migrations` directory
  - The corresponding Hasura metadata would be added to the `metadata` directory if using config v2.

#### Upgrade

Let's say a new version of the `soft-delete` is available. It contains new SQL migrations as well as a diff of the metadata. The developer can then upgrade the module with `hasura modules upgrade soft-delete`

#### Uninstall

The command would be `hasura modules uninstall soft-delete`.

The developer could choose not to remove the sql tables and functions for some reasong with `hasura modules uninstall --only-metadata`. It would in that case update only the Hasura metadata.

### Hybrid module working together with an external service
