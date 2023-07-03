import { SystemEnvType } from '../../shared/bootstrap/domain/systemEnv';
import { PrismaUserRepo } from './infra/prismaUsersRepo';

export function createUsersModule(env: SystemEnvType) {
  const createUserRepo = (env: SystemEnvType) =>
    env === 'dev' ? new Repo() : new PrismaUserRepo();
    
  return {
    repos: {
      usersRepo: createUserRepo(env),
    },
    services: {
      usersService,
    },
  };
}
