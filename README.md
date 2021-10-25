# employee-tracker

## Author
Alonzo Roman

## Summary
The purpose of this project is to create a program that allows the user to manage a company's employees and departments. This is achieved through the use of MySQL databases and Javascript. Users should be able to view departments, roles, and employees, as well as add new departments, roles and employees. Users are also able to update employee roles"


## Code Snippet
The use of inquirer and mysql were used for the various functions required to process changes to the database. For updating an employee role, once the option has been selected, queries are made to retrieve information from the roles table in the database, which is used as choices in the inquirer prompt that gets the required information from the user. After the prompt, two more queries are made in order to retrieve and update information from the database. 

``` Javascript
if (answers.initStart == 'Update an employee role') {
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
                    console.log(data);
                    newRoleId.push(data[0].id);
                    let sql = `UPDATE employee SET role_id = ${newRoleId} WHERE id = ${updateAnswer.empId}`;
                db.query(sql, (err, data) => {
                    if (err) {
                        throw err
                    }
                    console.log(data);
                    restart();
                })
                })
            })
        }
```


## Steps
- Created the repository and cloned it to my local machine
- Initialized the repository and added required sql and js files
- Created database and tables for sql
- Created seed information for test usage
- Created initial function to begin the program
- Created functions to make queries through inquirer
- Created functions to add information through inquirer
- Created function to update information



## Technologies Used
- [Javascript] (https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js] (https://nodejs.org/en/docs/)
- [MySQL] (https://dev.mysql.com/doc/)
- [Inquirer] (https://www.npmjs.com/package/inquirer)

## Contact Links

- Github (https://github.com/alonzofroman)
- LinkedIn (https://www.linkedin.com/in/alonzo-roman/")

## Resources/Acknowledgements 

- W3Schools (https://www.w3schools.com/)
- MDN Web Docs (https://developer.mozilla.org/en-US/)
