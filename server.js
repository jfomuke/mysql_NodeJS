// Imports 
const express = require('express');
const mysql = require('mysql');
const port = process.env.port || 3000;
const app = express();
const CryptoJS = require('crypto-js');

const key = "156169154017411"
var connection = mysql.createConnection(
{
    host    : 'sql9.freemysqlhosting.net',
    user    : 'sql9374488',
    password: 'VUPdJ4Wlzf',
    database: 'sql9374488'
})

function transformDate() 
{
    const tempDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(tempDate);
    return tempDate;  
}

function encryptPassword(passwordToEncrypt) 
{
    // Encrypt it using AES from Crypto-JS
        var key= 'abc123XYZ';
        var encrypted = CryptoJS.AES.encrypt(passwordToEncrypt, key);
        console.log(encrypted.toString());

    return encrypted;  
}

// Create route to main page that connects to database.  
app.get('/', async (req, res) => 
{
    connection.connect();
    // Retrieve all entries from database, then serve the result as a JSON type on the page
    connection.query('SELECT * FROM budget', function (error, results, fields)
    {
        connection.end();
        if (error == true) throw error;
        res.json(results);
    });

});

// TODO: proper format for data, encrpyt password functionm transfor date   
// Create route to main page that connects to database.  
app.get('/api/signup', async (req, res) => 
{
    const date = transformDate();

    const {username, password} = res.body;
    //Encrypt the stuff before inserting later on
    const pwd = encryptPassword();
    console.log(pwd);

    connection.connect();
    connection.query('INSERT INTO user VALUES ("", ?, ?, date)', [username, pwd, date], function (error, results, fields)
    {
        connection.end();
        if (error == true) throw error;
        res.json(results);
    });
});

// Testing route
app.get('/insert', async (req, res) => 
{
    console.log("insert accessed")
    // Testing
    username = "Mario"
    pwd = encryptPassword("MarioIsItalian")
    date = transformDate();

    sqlInsertQuery = "INSERT INTO `user` (`id`, `username`, `password`, `signedup`) VALUES (`"+ username + "`,`" + pwd + "`, `" + date + "`)"
    connection.connect(function(err) 
    {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO `user` (`id`, `username`, `password`, `signedup`) VALUES (NULL, '" + username + "', '" + pwd + "', '" + date + "');";
        connection.query(sql, function (err, result) 
        {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
    /*connection.connect();
    connection.query(sqlInsertQuery, function (error, results, fields)
    {
        connection.end();
        if (error == true) throw error;
        res.json(results);
    });*/
});


// Port to listen on for localhost
app.listen(port, () => 
{
    console.log(`API served at http://localhost:${port}`);
});


// References:
// https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime - for date conversion to MYSQL



// Backup 
/* 
connection.connect(function(err) 
    {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO `user` (`id`, `username`, `password`, `signedup`) VALUES (NULL, 'user3', 'pass3', '2020-11-11');";
        connection.query(sql, function (err, result) 
        {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
      */