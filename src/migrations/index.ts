import * as migration_20261023_121828_initial from './20261023_121828_initial';

export const migrations = [
  {
    up: migration_20261023_121828_initial.up,
    down: migration_20261023_121828_initial.down,
    name: '20261023_121828_initial'
  },
];
