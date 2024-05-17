import dotenv from 'dotenv';
import path from 'path';

export default async (): Promise<void> => {

  const nodeEnv = process.env.NODE_ENV || 'development'

  const envPath = path.join(__dirname, `../../.env.${nodeEnv}`);

  console.log('Reading env file at', envPath);
  dotenv.config({ path: envPath });
};