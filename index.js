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
            viewDepartment();
        }
        // View all roles
        if (answers.initStart == 'View all roles') {
            viewRoles();
        }
        // View all employees
        if (answers.initStart == 'View all employees') {
            viewEmployees();
        }
        // ADD a department
        if (answers.initStart == 'Add a department') {
            addDepartment();
        }
        // Add a role
        if (answers.initStart == 'Add a role') {
            addRole();
        }
        // ADD an Employee
        if (answers.initStart == 'Add an employee') {
            addEmployee();
        }
        // Update employee role
        if (answers.initStart == 'Update an employee role') {
            updateEmployee();
        }
    })
};



// View Department Function
function viewDepartment() {
    db.query(`Select * FROM department`, (err, data) => {
        if (err) {
            throw err
        }
        console.table(data);
        restart();
    })
};

// View Roles function
function viewRoles() {
    db.query('Select * FROM roles', (err, data) => {
        if (err) {
            throw err
        }
        console.table(data);
        restart();
    })
};

// View Employees function
function viewEmployees() {
    db.query('Select * from employee', (err, data) => {
        if (err) {
            throw err
        }
        console.table(data);
        restart();
    })
};

// Add department function
function addDepartment() {
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
        console.table(data)
        restart();
    })
})
};

// Add Role function
function addRole() {
    let departmentChoices = [];
        db.query('SELECT dep_name FROM department', (err, data) => {
            if (err) {
                throw err
            }
            for (i=0; i<data.length; i++) {
                departmentChoices.push(data[i].dep_name);
            }
            // departmentChoices.push(data);
            // console.log(departmentChoices);
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
                message: 'What is the department for the role?',
                choices: departmentChoices
            }
        ]).then((roleAnswers) => {
            db.query(`SELECT id FROM department WHERE dep_name = '${roleAnswers.roleDep}'`, (err, data) => {
                if (err) {
                    throw err
                }
                let depId = data[0].id;
                let sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${roleAnswers.roleTitle}', ${roleAnswers.roleSalary}, ${depId})`;
                db.query(sql, (err, data) => {
                    if (err) {
                        throw err
                    }
                    console.table(data);
                    restart();
                })
            })
        })
};

// Add employee function
function addEmployee() {
    let roleChoices = [];
        db.query(`SELECT title FROM roles`, (err, data) => {
            if (err) {
                throw err
            }
            for (i=0; i<data.length; i++) {
                roleChoices.push(data[i].title);
            }
            // console.log(data);
            // roleChoices.push(data);
            
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
        db.query(`SELECT id FROM roles WHERE title = '${empAnswers.role}'`, (err, data) => {
            if (err) {
                throw err
            }
        let roleId = data[0].id;
        let sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${empAnswers.firstName}', '${empAnswers.lastName}', ${roleId})`;
        db.query(sql, (err, data) => {
            if (err) {
                throw err
            }
            console.table(data);
            restart();
        })
        }); 
    })
};

// Update Employee Role function
function updateEmployee() {
    let roleChoices = [];
        db.query(`SELECT title FROM roles`, (err, data) => {
            if (err) {
                throw err
            }
            for (i=0; i<data.length; i++) {
                roleChoices.push(data[i].title);
            }
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
            db.query(`SELECT id FROM roles WHERE title = '${updateAnswer.empRole}'`, (err, data) => {
                if (err) {
                    throw err
                }
                // console.table(data);
                newRoleId.push(data[0].id);

                let sql = `UPDATE employee SET role_id = ${newRoleId} WHERE id = ${updateAnswer.empId}`;
            db.query(sql, (err, data) => {
                if (err) {
                    throw err
                }
                console.table(data);
                restart();
            })
            })
        })
};

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