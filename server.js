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
    // Retrieve all entries from database, then serve the result as a JSON type on the page
    connection.query('SELECT * FROM budget', function (error, results, fields)
    {
        if (error == true) throw error;
        res.json(results);
    });

});

// TODO: proper format for data, encrpyt password functionm transfor date   
// Create route to main page that connects to database.  
app.get('/api/signup', async (req, res) => 
{
   //const {username, password} = res.body;

    console.log("insert accessed")
    username = "RAdwfages"
    pwd = encryptPassword("agrtaetwgrhstrjh")
    date = transformDate();

    //connection.connect();
    connection.query("INSERT INTO `user` (`id`, `username`, `password`, `signedup`) VALUES (NULL, '" + username + "', '" + pwd + "', '" + date + "');", function (error, results, fields)
    {
        if (error == true) throw error;
        console.log("1 record inserted");
        res.json(results);
    });
});


// Port to listen on for localhost
app.listen(port, () => 
{
    console.log(`API served at http://localhost:${port}`);
});




// References:
// https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime - for date conversion to MYSQL
// https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp - For connection

