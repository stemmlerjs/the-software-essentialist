
import { ApplicationConfig } from './applicationConfig'

describe('applicationConfig', () => {

  it (`knows that npm run start --as-roles app worker relay 
    should generate a config that starts the entire app in a single program`, () => {
      let input = `npm run start --as-roles app worker relay`;
      let config = ApplicationConfig.fromString(input)

      expect(config.containsProcessAsSystemRole('relay')).toEqual(true);
      expect(config.containsProcessAsSystemRole('app')).toEqual(true);
      expect(config.containsProcessAsSystemRole('worker')).toEqual(true);
      expect(config.getNumberProcessesInProgram()).toEqual(3);
  });

  it (`knows that npm run start --as-roles app
    should generate a config that starts the program to only play 1 role`, () => {
      let input = `npm run start --as-roles app`;
      let config = ApplicationConfig.fromString(input)

      expect(config.containsProcessAsSystemRole('relay')).toEqual(false);
      expect(config.containsProcessAsSystemRole('app')).toEqual(true);
      expect(config.containsProcessAsSystemRole('worker')).toEqual(false);
      expect(config.getNumberProcessesInProgram()).toEqual(1);
  });

  it (`can take in both the env and the roles at the same time`, () => {
      let input = `npm run start --as-roles app --env dev`;
      let config = ApplicationConfig.fromString(input)

      expect(config.containsProcessAsSystemRole('relay')).toEqual(false);
      expect(config.containsProcessAsSystemRole('app')).toEqual(true);
      expect(config.containsProcessAsSystemRole('worker')).toEqual(false);
      expect(config.getNumberProcessesInProgram()).toEqual(1);
      expect(config.getEnv()).toEqual('dev')
  });


})