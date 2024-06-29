import { prepareDev } from './prepareDev';

const env = process.argv[2]?.trim() || '.env.development';

prepareDev(env);
