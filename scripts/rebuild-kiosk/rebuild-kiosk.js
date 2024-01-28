/* eslint no-console: 0 */
/*
  Copies changes in local content files (placed in safer location) into correct location
  then rebuilds application in local content mode.
*/

const chalk = require('chalk');
const shell = require('shelljs');

console.log(chalk.green('Checking for content files in expected kiosk location...'));

// First, safety check to make sure content folder exists and main.json exists
// If they don't exist, we'll assume this is being run by mistake and stop.

// Check for existence of content folder
if (!shell.test('-d', '../content')) {
  console.log(chalk.red('Content folder not found. Exiting...'));
  process.exit(1);
}

// Check for existence of main.json file inside content folder
if (!shell.test('-f', '../content/main.json')) {
  console.log(chalk.red('main.json not found. Exiting...'));
  process.exit(1);
}

// If node process is running, kill it depending on OS
if (process.platform === 'win32') {
  shell.exec('taskkill /F /IM node.exe');
} else {
  shell.exec('killall node');
}

// Looks like the external content folder exists, so we'll continue.
console.log(chalk.green('Copying content folder...'));
shell.cp('-u', '../content/*', './static');

shell.exec('yarn build && yarn serve');

process.exit(0);
