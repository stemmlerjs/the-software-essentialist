import { checkDocker } from '@dddforum/shared/src/scripts/checkDocker';
import { execSync } from 'child_process';
import path from 'path';

export const prepareDev = (env = '.env.development'): void => {
  const packageRoot = path.resolve(__dirname);
  const execParams = {
    cwd: packageRoot,
    stdio: 'inherit',
  } as const;

  console.log(`Preparing dev environment using ${env}`);

  checkDocker();

  execSync('docker-compose up --build -d', execParams);
  execSync('prisma generate --schema=./src/shared/database/prisma/schema.prisma', execParams);
  execSync(`dotenv -e ${env} -- npm run migrate`, execParams);
};
