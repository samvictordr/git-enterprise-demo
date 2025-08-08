import chalk from 'chalk';
import dayjs from 'dayjs';
import figlet from 'figlet';
import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json
const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const dependencies = pkg.dependencies || {};

console.log(chalk.green(figlet.textSync('Dependencies')));

// Build HTML content
let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Project Dependencies</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
    h1 { color: #333; }
    table { border-collapse: collapse; width: 50%; background: white; }
    th, td { padding: 8px 12px; border: 1px solid #ccc; }
    th { background-color: #eee; }
  </style>
</head>
<body>
  <h1>Dependency Versions</h1>
  <p>Generated at: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}</p>
  <table>
    <tr><th>Dependency</th><th>Version</th></tr>
`;

// Append dependencies to HTML
lodash.forOwn(dependencies, (version, name) => {
    console.log(`${chalk.yellow(name)}: ${chalk.blue(version)}`);
    htmlContent += `<tr><td>${name}</td><td>${version}</td></tr>`;
});

htmlContent += `
  </table>
</body>
</html>
`;

// Ensure dist folder exists
const distPath = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
}

// Write HTML file
fs.writeFileSync(path.join(distPath, 'index.html'), htmlContent, 'utf8');

console.log(chalk.green('\nHTML file generated at dist/index.html'));
