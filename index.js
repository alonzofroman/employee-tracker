// Load required libraries
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// create port
const PORT = process.envPORT || 3000;
const app = express();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    },
    console.log('Connected to employees_db.')
);

function init() {
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'initStart',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add an employee',
            'Update an employee role'
        ]
    }).then((answers) => {
        if (answers.initStart == 'View all departments') {
            db.query(`Select * FROM department`, (err, data) => {
                if (err) {
                    throw err
                }
                console.log(data);
                restart();
            })
        }
    })
}

function restart() {
    inquirer.prompt({
        type: 'confirm',
        name: 'repeat',
        message: 'Would you like to continue?'
    }).then((answer) => {
        if (answer.repeat === true) {
            init();
        }
        else if (answer.repeat === false) {
            process.exit(1);
        }
    })
};

init();



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});