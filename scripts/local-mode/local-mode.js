/* eslint no-console: 0 */
/*
  TODO: Copy these instructions into developer video selector documentation
  How to set up a video selector project with local content mode:
  1. run `yarn local-mode` in your terminal
  2. follow the prompts
  3. run `yarn clean && yarn develop` and ensure the project builds and runs
  4. you should see dummy content that matches the json in static/content.json
  5. edit the content in static/content.json as needed
  6. commit your changes and start pushing to repo
*/

const chalk = require('chalk');
const shell = require('shelljs');
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
      shell.cp('-R', './scripts/local-mode/files/plugins', './');

      console.log(chalk.green('Copying content folder...'));
      shell.mkdir('-p', './static');
      shell.cp('-R', './scripts/local-mode/files/content/*', './static');

      console.log(chalk.green('Copying gatsby-config.js...'));
      shell.cp('-f', './scripts/local-mode/files/gatsby-config.js', './');

      console.log(chalk.green('Deleting src/pages/contentful-example.js...'));
      shell.rm('-f', './src/pages/contentful-example.js');

      console.log(chalk.green('Deleting ENV example files...'));
      shell.rm('-rf', './env*');

      console.log(chalk.green('Removing Contentful dependencies from package.json...'));
      shell.exec('yarn remove gatsby-source-contentful');

      shell.exec('yarn clean');

      process.exit(0);
    } else {
      console.log('\nOkay, thank you for your honesty!');
      process.exit(1);
    }
  },
);
