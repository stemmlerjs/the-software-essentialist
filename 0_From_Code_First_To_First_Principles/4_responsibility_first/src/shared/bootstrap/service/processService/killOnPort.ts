import { exec, ExecException } from 'child_process';

export function killProcessOnPort(port: number): void {
  const command =
    process.platform === 'win32'
      ? `netstat -ano | findstr :${port} | findstr LISTENING`
      : `lsof -i :${port}`;

  exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    const processIds = stdout.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => line.trim().split(/\s+/))
      .map(tokens => tokens[tokens.length - 1]);

    if (processIds.length === 0) {
      console.log(`No process found listening on port ${port}`);
      return;
    }

    processIds.forEach(pid => exec(`kill ${pid}`));
  });
}