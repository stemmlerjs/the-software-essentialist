import { exec } from 'child_process';

export class ProcessService {
  public static killProcessOnPort(port: number, cb: any) {
    const killCommand =
      process.platform === 'win32' ? `netstat -ano | findstr :${port} | findstr LISTENING` : `lsof -i:${port} -t`;

    exec(killCommand, (error: any, stdout: any, stderr: any) => {
      if (error) {
        // console.error(`Failed to execute the command: ${error.message}`);
        return cb ? cb() : '';
      }

      if (stderr) {
        // console.error(`Command execution returned an error: ${stderr}`);
        return cb ? cb() : '';
      }

      const processId = stdout.trim();
      if (processId) {
        const killProcessCommand = process.platform === 'win32' ? `taskkill /F /PID ${processId}` : `kill ${processId}`;

        exec(killProcessCommand, (error: any, _stdout: any, _stderr: any) => {
          if (error) {
            // console.error(`Failed to kill the process: ${error.message}`);
            return cb ? cb() : '';
          }
          // console.log(`Process running on port ${port} has been killed.`);
          return cb ? cb() : '';
        });
      } else {
        // console.log(`No process found running on port ${port}.`);
        return cb ? cb() : '';
      }
    });
  }
}
