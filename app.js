const { mapValues } = require('async');
const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yuzumikan',
  database: 'pfc'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM pfcbalance',
    (error, results) => {
      console.log(results);
      res.render('top.ejs');
    }
  );

});

app.get('/index', (req,res) => {
  connection.query('SELECT * FROM pfcbalance',
    (error, results) => {
      res.render('index.ejs',{pfcbalance: results})
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO pfc.pfcbalance(date, food, calorie, gram, protein, fat, carbohydrate) VALUES(?)',
    [req.body.inputData],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.listen(3000);
