
import { GameRunnerCLI } from './infra/incoming/gameRunnerCLI';

// CLI Entry Point
if (require.main === module) {
  const resume = process.argv.includes('--resume');
  GameRunnerCLI.create(resume).then(runner => runner.run()).catch(console.error);
}
