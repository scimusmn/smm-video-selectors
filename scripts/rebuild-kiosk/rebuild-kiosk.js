/* eslint no-console: 0 */
/*
  Copies changes in local content files (placed in safer location) into correct location
  then rebuilds application in local content mode.
*/

const chalk = require('chalk');
const shell = require('shelljs');

console.log(chalk.green('Checking for content files in expected kiosk location...'));

// First, safety checks to make sure content folder exists and main.json exists
// If they don't exist, we'll assume this is being run by mistake and stop.

// Check for existence of content folder
if (!shell.test('-d', '../content')) {
  console.log(chalk.red('Content folder not found.\nThis script expects a folder named ')
  + chalk.white('"content"')
  + chalk.red(' to be in the parent directory of the application.\nYou may need to copy the existing ')
  + chalk.white('"./static"')
  + chalk.red(' folder up two levels and rename it ')
  + chalk.white('"content"')
  + chalk.red('.\nExiting...'));
  process.exit(1);
}

// Check for existence of main.json file inside content folder
if (!shell.test('-f', '../content/main.json')) {
  console.log(chalk.white('main.json') + chalk.red(' not found in ') + chalk.white('content') + chalk.red(' folder. Exiting...'));
  process.exit(1);
}

// If any *other* node processes are running, kill them
// Get the current process ID
const currentProcessId = process.pid;

if (process.platform === 'win32') {
  // Windows command to list and kill node processes except the current one
  shell.exec('tasklist | findstr node.exe', (code, stdout) => {
    stdout.split('\n').forEach((line) => {
      const pid = line.trim().split(/\s+/)[1];
      if (pid && pid !== currentProcessId.toString()) {
        console.log(chalk.yellow(`Kill Win process: ${currentProcessId}`));
        shell.exec(`taskkill /F /PID ${pid}`);
      }
    });
  });
} else {
  shell.exec('pkill node');
}

console.log(chalk.green('Rebuilding with latest content files...'));
shell.cp('-u', '../content/*', './static');
shell.exec('yarn build && yarn serve');

process.exit(0);
