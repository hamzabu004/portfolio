import * as migration_20261023_121828_initial from './20261023_121828_initial';
import * as migration_20261023_193702_storage_fields from './20261023_193702_storage_fields';

export const migrations = [
  {
    up: migration_20261023_121828_initial.up,
    down: migration_20261023_121828_initial.down,
    name: '20261023_121828_initial',
  },
  {
    up: migration_20261023_193702_storage_fields.up,
    down: migration_20261023_193702_storage_fields.down,
    name: '20261023_193702_storage_fields'
  },
];
