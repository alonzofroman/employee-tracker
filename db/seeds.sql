INSERT INTO department (dep_name) 
VALUES ('Management'),
        ('Accounting'),
        ('Sales'),
        ('R&D'),
        ('Customer Services'),
        ('Warehouse');

INSERT INTO roles (title, salary, department_id)
VALUES ('CEO', 10000000, 1),
        ('Accountant', 40000, 2),
        ('Finance_Manager', 50000, 2),
        ('Salesman', 35000, 3),
        ('Junior_Salesman', 25000, 3),
        ('Engineer', 40000, 4),
        ('Research_Scientist', 40000, 4),
        ('Technician', 35000, 4),
        ('Quality_Control', 30000, 4),
        ('Operator', 20000, 5),
        ('Forklift_Operator', 25000, 6),
        ('Logistics', 30000, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Robert', 'Bossman', 1),
    ('Steven', 'Summers', 2),
    ('Harry', 'Scott', 3),
    ('Jessica', 'Bridges', 6),
    ('Eliza', 'Lemon', 10),
    ('Craig', 'Roberts', 12);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jason', 'Fielder', 2, 2),
    ('Scott', 'Scottsman', 4, 3),
    ('Tyler', 'Tylerson', 4, 3),
    ('Elizabeth', 'Swan', 6, 4),
    ('Daisy', 'Peach', 7, 4),
    ('Tony', 'Blade', 10, 5),
    ('Ridley', 'Scott', 11, 6);