import { sync as commandExistsSync } from 'command-exists';

export const checkDocker = () => {
  // Check if Docker is installed
  if (!commandExistsSync('docker')) {
    console.error('Docker is not installed.');
    console.error('Please install Docker by following the official Docker installation instructions:');
    console.error('https://docs.docker.com/get-docker/');
    process.exit(1);
  }

  // Check if Docker Compose is installed
  if (!commandExistsSync('docker-compose')) {
    console.error('Docker Compose is not installed.');
    console.error('Please install Docker Compose by following the official Docker Compose installation instructions:');
    console.error('https://docs.docker.com/compose/install/');
    process.exit(1);
  }
};
