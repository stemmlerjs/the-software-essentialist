
import { SystemEnv } from './systemEnv';
import { SystemRole, SystemRoles } from './systemRoles';

('The roles which you want the program to play (app, worker, relay)');

// Parse the incoming command-line input
// const argv = yargsParser(process.argv.slice(2), options);

export class ApplicationConfig {
  private env: SystemEnv;
  private roles: SystemRoles;

  constructor(env: SystemEnv, roles: SystemRoles) {
    this.env = env;
    this.roles = roles;
  }

  public static fromString(input: string) {
    let argsArray = input.split(' ');

    let currentFlag = '';
    let argsMap: any = {};

    for (let arg of argsArray) {
      if (arg.includes('--')) {
        currentFlag = arg;
        argsMap[arg] = [];
      }

      if (currentFlag && currentFlag !== arg) {
        argsMap[currentFlag].push(arg);
      }
    }

    let rolesArgs = argsMap['--as-roles'];
    let envArgs = argsMap['--env'];

    let systemRolesResult = SystemRoles.create(rolesArgs);

    if (!systemRolesResult.isSuccess()) {
      throw systemRolesResult.getError();
    }

    let systemEnv = SystemEnv.create(envArgs);

    return new this(systemEnv, systemRolesResult.getData() as SystemRoles);
  }

  containsProcessAsSystemRole(role: SystemRole): boolean {
    return this.roles.contains(role);
  }

  getNumberProcessesInProgram() {
    return this.roles.getLength();
  }

  getEnv() {
    return 'dev';
  }
}
