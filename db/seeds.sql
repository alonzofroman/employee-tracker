INSERT INTO department (id, dep_name) 
VALUES (1, 'Management'),
        (2, 'Accounting'),
        (3, 'Sales'),
        (4, 'R&D'),
        (5, 'Customer Services'),
        (6, 'Warehouse');

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'CEO', 10000000, 1),
        (2, 'Accountant', 40000, 2),
        (3, 'Finance_Manager', 50000, 2),
        (4, 'Salesman', 35000, 3),
        (5, 'Junior_Salesman', 25000, 3),
        (6, 'Engineer', 40000, 4),
        (7, 'Research_Scientist', 40000, 4),
        (8, 'Technician', 35000, 4),
        (9, 'Quality_Control', 30000, 4),
        (10, 'Operator', 20000, 5),
        (11, 'Forklift_Operator', 25000, 6),
        (12, 'Logistics', 30000, 6);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (1, 'Robert', 'Bossman', 1),
    (2, 'Steven', 'Summers', 2),
    (3, 'Harry', 'Scott', 3),
    (4, 'Jessica', 'Bridges', 6),
    (5, 'Eliza', 'Lemon', 10),
    (6, 'Craig', 'Roberts', 12);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, 'Jason', 'Fielder', 2, 2),
    (8, 'Scott', 'Scottsman', 4, 3),
    (9, 'Tyler', 'Tylerson', 4, 3),
    (10, 'Elizabeth', 'Swan', 6, 4),
    (11, 'Daisy', 'Peach', 7, 4),
    (12, 'Tony', 'Blade', 10, 5),
    (13, 'Ridley', 'Scott', 11, 6);