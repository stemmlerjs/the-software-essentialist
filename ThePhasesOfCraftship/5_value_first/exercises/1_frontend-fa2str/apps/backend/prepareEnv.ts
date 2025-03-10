
/**
 * This script allows you to call any other following script with
 * `ts-node prepareEnv <whatever you want to call next>` and if your app
 * is running in development mode (not no NODE_ENV set at all, assumed), it
 * will load the env file before you call the script. This loads the environment
 * up properly.
 * 
 * We currently need this for prisma commands to allow prisma to take the config from
 * .env.development in development mode, and from the secrets in the deployment tools in
 * production.
 */

import { execSync } from 'child_process';
import * as path from 'path';

export const prepareEnv = (): void => {
  const env = process.env.NODE_ENV || 'development';
  const packageRoot = path.resolve(__dirname);
  const execParams = {
    cwd: packageRoot,
    stdio: 'inherit',
  } as const;

  const script = process.argv.splice(2).join(' ');

  if (env === 'development') {
    const devEnvFile = '.env.development'
    console.log(`Preparing dev environment using ${devEnvFile}`);
    execSync(`dotenv -e ${devEnvFile} -- ${script}`, execParams);
    return;
  }

  console.log(`Running ${script} in ${process.env.NODE_ENV} mode without loading from env file.`);
  execSync(`${script}`, execParams);
  
};

prepareEnv();