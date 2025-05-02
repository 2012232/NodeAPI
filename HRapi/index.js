const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async (req, res) => {
    try {
        res.json('Welcome to the HR API');
    }
    catch (err) {
        res.status(500).json({Error:err.message});
    }   
});

app.get('/country', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM countries');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/region', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM regions');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/employee', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees'); 
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/employee/count', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS total_employees FROM employees');
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
