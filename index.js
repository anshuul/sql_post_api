// index.js
const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/user', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send({ error: 'Name and email are required' });
    }

    // Check if the email already exists in the database
    const checkEmailQuery = 'SELECT COUNT(*) AS count FROM user WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).send({ error: 'Database error' });
        }

        const emailExists = results[0].count > 0;
        if (emailExists) {
            return res.status(400).send({ error: 'Email already exists' });
        }

        // Insert the user if the email doesn't exist
        const insertUserQuery = 'INSERT INTO user (name, email) VALUES (?, ?)';
        db.query(insertUserQuery, [name, email], (err, results) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send({ error: 'Database error' });
            }

            res.status(201).send({ message: 'User added successfully', userId: results.insertId });
        });
    });
});


// Get All
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM user';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).send({ error: 'Database error' });
        }

        res.status(200).send(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
