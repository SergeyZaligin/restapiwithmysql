const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql');
const authRoutes = require('./routes/auth');

const config = require('./config/keys');

const app = express();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'cobweb',
  password: '123456',
  database: 'api',
});

pool.query('SELECT * FROM user', (error, results, fields) => {
  if (error) throw error;
  console.log('The solution is: ', results);
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);

module.exports = app;
