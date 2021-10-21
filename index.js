const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const PORT = process.envPORT || 3000;
const app = express();