/* eslint no-console: 0 */

const chalk = require('chalk');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('close', () => {
  console.log('\nBye bye!');
  process.exit(1);
});

console.log('\nThis action will disconnect your project from Contentful permanently.');
rl.question(
  chalk.yellow('Are you sure you want to continue [Y/N]? '),
  (answerYesNo) => {
    if (answerYesNo.toLowerCase().includes('y')) {
      console.log(chalk.green('Reconfiguring smm-video-selector for local content mode...'));

      console.log(chalk.green('Copying plugins folder...'));
      execSync('cp -f -r ./scripts/local-mode/files/plugins ./');

      console.log(chalk.green('Copying content folder...'));
      execSync('cp -f -r ./scripts/local-mode/files/content ./');

      console.log(chalk.green('Copying gatsby-config.js...'));
      execSync('cp -f ./scripts/local-mode/files/gatsby-config.js ./');

      console.log(chalk.green('Deleting src/pages/contentful-example.js...'));
      execSync('rm -f ./src/pages/contentful-example.js');

      process.exit(0);
    } else {
      console.log('\nOkay, thank you for your honesty!');
      process.exit(1);
    }
  },
);
