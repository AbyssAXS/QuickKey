#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const { generatePassword, generateApiKey, copyToClipboard } = require('./keyforge');

/**
 * Display ASCII art banner
 */
function displayBanner() {
  console.clear();
  console.log(
    chalk.cyan(
      figlet.textSync('QuickKey', {
        font: 'Standard',
        horizontalLayout: 'default'
      })
    )
  );
  console.log(chalk.gray('━'.repeat(60)));
  console.log(chalk.yellow('  Secure Password & API Key Generator'));
  console.log(chalk.gray('━'.repeat(60)));
  console.log();
}

/**
 * Main menu
 */
async function mainMenu() {
  displayBanner();

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: chalk.cyan('What would you like to generate?'),
      choices: [
        { name: '🔐 Generate Password', value: 'password' },
        { name: '🔑 Generate API Key', value: 'apikey' },
        { name: '❌ Exit', value: 'exit' }
      ]
    }
  ]);

  switch (action) {
    case 'password':
      await handlePasswordGeneration();
      break;
    case 'apikey':
      await handleApiKeyGeneration();
      break;
    case 'exit':
      console.log(chalk.green('\n✨ Thanks for using QuickKey! Goodbye!\n'));
      process.exit(0);
  }
}

/**
 * Handle password generation flow
 */
async function handlePasswordGeneration() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'length',
        message: 'Password length:',
        default: '16',
        validate: (input) => {
          const num = parseInt(input);
          if (isNaN(num) || num < 4 || num > 128) {
            return 'Please enter a number between 4 and 128';
          }
          return true;
        }
      },
      {
        type: 'confirm',
        name: 'uppercase',
        message: 'Include uppercase letters?',
        default: true
      },
      {
        type: 'confirm',
        name: 'lowercase',
        message: 'Include lowercase letters?',
        default: true
      },
      {
        type: 'confirm',
        name: 'numbers',
        message: 'Include numbers?',
        default: true
      },
      {
        type: 'confirm',
        name: 'symbols',
        message: 'Include symbols?',
        default: true
      }
    ]);

    const length = parseInt(answers.length);
    const options = {
      uppercase: answers.uppercase,
      lowercase: answers.lowercase,
      numbers: answers.numbers,
      symbols: answers.symbols
    };

    // Validate at least one character type is selected
    if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
      console.log(chalk.red('\n❌ Error: At least one character type must be selected!\n'));
      await promptReturnToMenu();
      return;
    }

    const password = generatePassword(length, options);

    console.log(chalk.gray('\n' + '─'.repeat(60)));
    console.log(chalk.green('✅ Password generated successfully!'));
    console.log(chalk.gray('─'.repeat(60)));
    console.log(chalk.bold.white('\n  ' + password + '\n'));
    console.log(chalk.gray('─'.repeat(60)));

    // Copy to clipboard
    const copied = await copyToClipboard(password);
    if (copied) {
      console.log(chalk.green('📋 Copied to clipboard!\n'));
    } else {
      console.log(chalk.yellow('⚠️  Could not copy to clipboard\n'));
    }

    await promptReturnToMenu();
  } catch (error) {
    console.log(chalk.red(`\n❌ Error: ${error.message}\n`));
    await promptReturnToMenu();
  }
}

/**
 * Handle API key generation flow
 */
async function handleApiKeyGeneration() {
  try {
    const { length } = await inquirer.prompt([
      {
        type: 'input',
        name: 'length',
        message: 'API key length:',
        default: '32',
        validate: (input) => {
          const num = parseInt(input);
          if (isNaN(num) || num < 16 || num > 128) {
            return 'Please enter a number between 16 and 128';
          }
          return true;
        }
      }
    ]);

    const apiKey = generateApiKey(parseInt(length));

    console.log(chalk.gray('\n' + '─'.repeat(60)));
    console.log(chalk.green('✅ API Key generated successfully!'));
    console.log(chalk.gray('─'.repeat(60)));
    console.log(chalk.bold.white('\n  ' + apiKey + '\n'));
    console.log(chalk.gray('─'.repeat(60)));

    // Copy to clipboard
    const copied = await copyToClipboard(apiKey);
    if (copied) {
      console.log(chalk.green('📋 Copied to clipboard!\n'));
    } else {
      console.log(chalk.yellow('⚠️  Could not copy to clipboard\n'));
    }

    await promptReturnToMenu();
  } catch (error) {
    console.log(chalk.red(`\n❌ Error: ${error.message}\n`));
    await promptReturnToMenu();
  }
}

/**
 * Prompt user to return to main menu
 */
async function promptReturnToMenu() {
  const { returnToMenu } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'returnToMenu',
      message: 'Return to main menu?',
      default: true
    }
  ]);

  if (returnToMenu) {
    await mainMenu();
  } else {
    console.log(chalk.green('\n✨ Thanks for using QuickKey! Goodbye!\n'));
    process.exit(0);
  }
}

/**
 * Handle uncaught errors gracefully
 */
process.on('uncaughtException', (error) => {
  console.log(chalk.red(`\n❌ Unexpected error: ${error.message}\n`));
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log(chalk.green('\n\n✨ Thanks for using QuickKey! Goodbye!\n'));
  process.exit(0);
});

// Start the application
mainMenu();
