const express = require('express');
const { dependencies } = require('../package.json');
const dayjs = require('dayjs');
const chalk = require('chalk');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    let html = `<h1>📦 Project Dependencies</h1>`;
    html += `<p>Generated at: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}</p>`;
    html += `<p>Request ID: ${uuidv4()}</p>`;
    html += `<ul>`;
    for (const [name, version] of Object.entries(dependencies)) {
        html += `<li>${name}: ${version}</li>`;
    }
    html += `</ul>`;

    try {
        const response = await axios.get('https://api.github.com');
        html += `<p>GitHub API Status: ${response.status}</p>`;
    } catch (error) {
        html += `<p>GitHub API Error</p>`;
    }

    res.send(html);
});

app.listen(port, () => {
    console.log(chalk.green(`✅ App running at http://localhost:${port}`));
});