// src/index.js
import axios from 'axios';
import chalk from 'chalk';
import dayjs from 'dayjs';
import { readFile } from 'fs/promises';
import _ from 'lodash';
import ora from 'ora';

const spinner = ora('Reading package.json...').start();

try {
    // Read package.json to get dependency list
    const pkgJson = JSON.parse(
        await readFile(new URL('../package.json', import.meta.url))
    );

    spinner.succeed('Dependencies loaded!\n');

    // Display dependencies
    console.log(chalk.green.bold('📦 Project Dependencies:'));
    Object.entries(pkgJson.dependencies).forEach(([name, version]) => {
        console.log(chalk.blue(name) + chalk.gray(` → ${version}`));
    });

    // Random lodash example
    console.log(
        '\n' + chalk.yellow('🔀 Random lodash shuffle:'),
        _.shuffle([1, 2, 3, 4, 5])
    );

    // Current date/time
    console.log(
        chalk.magenta(`🕒 Current date is: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
    );

    // Example axios call
    const res = await axios.get('https://api.github.com/repos/nodejs/node');
    console.log(chalk.cyan(`⭐ Node.js GitHub stars: ${res.data.stargazers_count}`));

} catch (err) {
    spinner.fail('Error loading dependencies');
    console.error(chalk.red(err));
}
