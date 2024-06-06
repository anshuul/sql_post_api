// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12712242',
    password: 'QDvWd882fQ',
    database: 'sql12712242'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS user (
            uid INT AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            PRIMARY KEY (uid)
        );
    `;
    connection.query(createTableQuery, (err, results) => {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }
        console.log('User table ensured to exist.');
    });
});

module.exports = connection;
