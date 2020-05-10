# Rationale

Recurrent patterns are present in databases and areas currently covered by Hasura, for example authentication, sending of emails, soft delete, monetisation, storage rules, audit trail...
Whereas not all the business logic of such modules cannot sometimes be embbeded inside an Hasura instance, Hasura can be of great help to ease their implementation, through pieces of metadata and SQL schema.

# Requirements

## Keep track of the SQL migrations and Hasura metadata

## Incremental metadata

## Core and Non-Core SQL/metadata

## Dependencies between modules

## Interface

Initially the Hasura modules would be available through the Hasura CLI, but the inclusion of the following features to the console is to be considered.

# Features

## Installation

`hasura modules install <module-name>`

## Upgrade

`hasura modules upgrade <module-name>`

## Inconsistencies & safety

`hasura modules status <module-name>`

`hasura modules repare <module-name>`

"dry run"

## Uninstallation

### `hasura modules uninstall <module-name>`

Unintall a module i.e. its Postgres structure and hasura metadata.

A distinction is made between elements (SQL or metadata, would also be removed as they would have become essential to the application.

`hasura modules uninstall <module-name> --only-metadata`

`hasura modules uninstall <module-name> --only-core`

## Public repository

### List

`hasura modules list`

### Module information

`hasura modules show <module-name>`

<!-- ## Contributions -->

# Module Directory Structure

# Examples

## Embedded Module

Some modules won't need any external service to be fully functionnal with Postgres and Hasura.

Let's imagine quickly a set of SQL functions, triggers and views that allow to alter the tables to implement a soft delete system. Some functions could be mapped as Hasura metadata so an admin user can add soft deletion to a given table. Soft deleted records would be moved to a dedicated table with their values stored as JSONB.
Another function would be available to undo a deletion.

_(Note: this way is not necessarily the best to implement soft deletion, and is described as a means to illustrate this RFC.)_

### Installation

The installation proceedings would be:

- Ensure Hasura is running correctly and that the project `config.yaml` is correctly configured
- `hasura modules install soft-delete`
  - This command would run SQL migrations that create the necessary tables, functions, etc in a dedicated `soft_delete` Postgres schema, and add the corresponding operations to the existing Hasura metadata.
  - The corresponding SQL migrations would be added to the `migrations` directory
  - The corresponding Hasura metadata would be added to the `metadata` directory if using config v2.

### Upgrade

Let's say a new version of the `soft-delete` is available. It contains new SQL migrations as well as a diff of the metadata. The developer can then upgrade the module with `hasura modules upgrade soft-delete`

### Uninstall

The command would be `hasura modules uninstall soft-delete`.

The developer could choose not to remove the sql tables and functions for some reasong with `hasura modules uninstall --only-metadata`. It would in that case update only the Hasura metadata.

## Microservice Module

Let's imagine now a module that allows the sending of email through an external email service, the tracking of the mails sent by users, the ability to define templates... This module would require some tables, relationships and most likely event triggers or actions.
