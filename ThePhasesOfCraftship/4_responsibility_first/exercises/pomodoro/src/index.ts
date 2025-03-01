import inquirer from 'inquirer';

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

async function startTimer(durationInMinutes: number) {
  let timeLeft = durationInMinutes * 60;
  
  return new Promise<void>((resolve) => {
    const timer = setInterval(() => {
      console.clear();
      console.log(`Time remaining: ${formatTime(timeLeft)}`);
      
      timeLeft--;
      
      if (timeLeft < 0) {
        clearInterval(timer);
        console.log('Pomodoro completed!');
        resolve();
      }
    }, 1000);
  });
}

export async function startPomodoro() {
  // Clear the console
  console.clear();
  
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Ready to start some pomodoros?',
      choices: [
        { name: 'Yes (y)', value: 'start', key: 'y' },
        { name: 'Quit (q)', value: 'quit', key: 'q' }
      ]
    }
  ]);

  if (answer.action === 'start') {
    await startTimer(25); // 25 minutes for a standard pomodoro
  } else {
    console.log('Maybe next time!');
    process.exit(0);
  }
}

if (require.main === module) {
  startPomodoro().catch(console.error);
}
