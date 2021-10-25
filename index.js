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

// Function to start the program
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
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ]
    }).then((answers) => {
        // View all departments
        if (answers.initStart == 'View all departments') {
            db.query(`Select * FROM department`, (err, data) => {
                if (err) {
                    throw err
                }
                console.log(data);
                restart();
            })
        }
        // View all roles
        if (answers.initStart == 'View all roles') {
            db.query('Select * FROM roles', (err, data) => {
                if (err) {
                    throw err
                }
                console.log(data);
                restart();
            })
        }
        // View all employees
        if (answers.initStart == 'View all employees') {
            db.query('Select * from employee', (err, data) => {
                if (err) {
                    throw err
                }
                console.log(data);
                restart();
            })
        }
        // ADD a department
        if (answers.initStart == 'Add a department') {
            inquirer.prompt([{
                type: 'input',
                name: 'departmentName',
                message: 'What is the department name?'
            }
        ]).then((depAnswers) => {
            let sql = `INSERT INTO department (dep_name) VALUES ('${depAnswers.departmentName}')`;
            db.query(sql, (err, data) => {
                if (err) {
                    throw err
                }
                console.log(data)
                restart();
            })
        })
        }
        // Add a role
        if (answers.initStart == 'Add a role') {
            let departmentChoices = [];
            db.query('SELECT id FROM department', (err, data) => {
                if (err) {
                    throw err
                }
                for (i=0; i<data.length; i++) {
                    departmentChoices.push(data[i].id);
                }
                // departmentChoices.push(data);
                console.log(departmentChoices);
                // console.log(JSON.stringify(data));
            })

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleTitle',
                    message: 'What is the title of the role?'
                },
                {
                    type: 'input',
                    name: 'roleSalary',
                    message: 'What is the salary of the role?'
                },
                {
                    type: 'list',
                    name: 'roleDep',
                    message: 'What is the department ID for the role?',
                    choices: departmentChoices
                }
            ]).then((roleAnswers) => {
                let sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${roleAnswers.roleTitle}', ${roleAnswers.roleSalary}, ${roleAnswers.roleDep})`;
                db.query(sql, (err, data) => {
                    if (err) {
                        throw err
                    }
                    console.log(data);
                    restart();
                })
            })
        }
        // ADD an Employee
        if (answers.initStart == 'Add an employee') {
            let roleChoices = [];
            db.query(`SELECT title FROM roles`, (err, data) => {
                if (err) {
                    throw err
                }
                console.log(data);
                roleChoices.push(data);
            })
            inquirer.prompt([{
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of the employee?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the employee?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the role of the employee?',
                choices: roleChoices
            }
        ]).then((empAnswers) => {
            let sql = `INSERT INTO employee (first_name, last_name) VALUES ('${empAnswers.firstName}', '${empAnswers.lastName}')`;
            db.query(sql, (err, data) => {
                if (err) {
                    throw err
                }
                console.log(data);
                restart();
            })
        })
        }
        // Update employee role
        if (answers.initStart == 'Update an employee role') {
            let roleChoices = [];
            db.query(`SELECT title FROM roles`, (err, data) => {
                if (err) {
                    throw err
                }
                console.log(data);
                roleChoices.push(data);
            })
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'empId',
                    message: 'What is the employee ID?'
                },
                {
                    type: 'list',
                    name: 'empRole',
                    message: 'What is their new role?',
                    choices: roleChoices
                }
            ]).then((updateAnswer) => {
                let newRoleId = [];
                db.query(`SELECT id FROM WHERE roles.title = '${updateAnswer.empRole}'`, (err, data) => {
                    if (err) {
                        throw err
                    }
                    console.log(data);
                    newRoleId.push(data);
                })
                let sql = `UPDATE employee SET role_id = ${newRoleId} WHERE id = ${updateAnswer.empId}`;
                db.query(sql, (err, data) => {
                    if (err) {
                        throw err
                    }
                    console.log(data);
                    restart();
                })
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