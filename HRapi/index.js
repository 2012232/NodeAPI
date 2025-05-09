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


app.get('/',async (req, res) =>{
    try {
        res.json({message: "Welcome to the HR API"});
    }catch (err) {
        res.status(500).json({error: err.message});

    }
});

app.get('/country', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM countries');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
);

app.get('/region', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM regions');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
);


app.get('/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//40
app.get('/employees-location-country', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                e.employee_id, e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date, e.department_id,
                l.street_address, l.city, l.state_province, l.postal_code, c.country_name
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//41
app.get('/job-history-employee', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                jh.start_date, jh.end_date, jh.job_id,
                e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date, e.department_id
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//42
app.get('/employees-job-history', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                e.employee_id, e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date, e.department_id,
                jh.start_date, jh.end_date, jh.job_id
            FROM employees e
            JOIN job_history jh ON e.employee_id = jh.employee_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//43
app.get('/employees-job-history-department', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                e.employee_id, e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date, 
                d.department_name, jh.start_date, jh.end_date, jh.job_id
            FROM employees e
            JOIN job_history jh ON e.employee_id = jh.employee_id
            JOIN departments d ON e.department_id = d.department_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




//44
app.get('/employees-job-history-department-location', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                e.employee_id, e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date,
                d.department_name, l.street_address, l.city, l.state_province, l.postal_code,
                jh.start_date, jh.end_date, jh.job_id
            FROM employees e
            JOIN job_history jh ON e.employee_id = jh.employee_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//45
app.get('/employees-job-history-country', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                e.employee_id, e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date,
                c.country_name, jh.start_date, jh.end_date, jh.job_id
            FROM employees e
            JOIN job_history jh ON e.employee_id = jh.employee_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//46
app.get('/job-history-employee-department', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                jh.start_date, jh.end_date, jh.job_id,
                e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date, 
                d.department_name
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN departments d ON e.department_id = d.department_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//47
app.get('/job-history-employee-job', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                jh.start_date, jh.end_date, jh.job_id,
                e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date,
                j.job_title
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//48
app.get('/job-history-employee-job-department', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                jh.start_date, jh.end_date, jh.job_id,
                e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date, 
                j.job_title, d.department_name
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//49
app.get('/job-history-employee-job-location', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                jh.start_date, jh.end_date, jh.job_id,
                e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date,
                j.job_title, l.street_address, l.city, l.state_province, l.postal_code
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//50
app.get('/job-history-employee-job-country', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                jh.start_date, jh.end_date, jh.job_id,
                e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date,
                j.job_title, c.country_name
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//51
app.get('/regions-countries-locations', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                r.region_name, c.country_name, l.street_address, l.city, l.state_province
            FROM regions r
            JOIN countries c ON r.region_id = c.region_id
            JOIN locations l ON c.country_id = l.country_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//52
app.get('/countries-regions-locations', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                c.country_name, r.region_name, l.street_address, l.city, l.state_province
            FROM countries c
            JOIN regions r ON c.region_id = r.region_id
            JOIN locations l ON c.country_id = l.country_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//53
app.get('/locations-countries-regions', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                l.street_address, l.city, l.state_province, l.postal_code, 
                c.country_name, r.region_name
            FROM locations l
            JOIN countries c ON l.country_id = c.country_id
            JOIN regions r ON c.region_id = r.region_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//54
app.get('/departments-employees-locations', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                d.department_name, e.first_name, e.last_name, e.email, e.phone_number, 
                l.street_address, l.city, l.state_province, l.postal_code
            FROM departments d
            JOIN employees e ON d.department_id = e.department_id
            JOIN locations l ON d.location_id = l.location_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




//55
app.get('/employees-departments-locations-countries', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date,
                d.department_name, l.street_address, l.city, l.state_province, l.postal_code, 
                c.country_name
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




//56
app.get('/employees-managers-departments-locations', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date,
                m.first_name AS manager_first_name, m.last_name AS manager_last_name, 
                d.department_name, l.street_address, l.city, l.state_province, l.postal_code
            FROM employees e
            LEFT JOIN employees m ON e.manager_id = m.employee_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





//57
app.get('/employees-job-titles-departments-locations', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date, 
                j.job_title, d.department_name, l.street_address, l.city, l.state_province, l.postal_code
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




//58
app.get('/employees-job-titles-departments-managers', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date, 
                j.job_title, d.department_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            LEFT JOIN employees m ON e.manager_id = m.employee_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});




//59
app.get('/employees-job-titles-departments-managers-locations', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                e.first_name, e.last_name, e.email, e.phone_number, e.salary, e.hire_date, 
                j.job_title, d.department_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name,
                l.street_address, l.city, l.state_province, l.postal_code
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            LEFT JOIN employees m ON e.manager_id = m.employee_id
            JOIN locations l ON d.location_id = l.location_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





//60
app.get('/countries-region-1', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.country_name
            FROM countries c
            JOIN regions r ON c.region_id = r.region_id
            WHERE r.region_id = 1;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//61
app.get('/departments-cities-starting-with-n', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.department_name, l.city
            FROM departments d
            JOIN locations l ON d.location_id = l.location_id
            WHERE l.city LIKE 'N%';
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





//62
app.get('/employees-departments-managed-by-commission-over-0-15', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name, e.last_name, e.job_id, e.department_id
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN employees m ON d.manager_id = m.employee_id
            WHERE m.commission_pct > 0.15;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//63
app.get('/managers-job-titles', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT j.job_title
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            WHERE e.employee_id IN (SELECT manager_id FROM employees WHERE manager_id IS NOT NULL);
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





//64
app.get('/postal-codes-in-asia', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT l.postal_code
            FROM locations l
            JOIN countries c ON l.country_id = c.country_id
            JOIN regions r ON c.region_id = r.region_id
            WHERE r.region_name = 'Asia';
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});






//65
app.get('/departments-with-employees-commission-less-than-average', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT d.department_name
            FROM departments d
            JOIN employees e ON d.department_id = e.department_id
            WHERE e.commission_pct < (SELECT AVG(commission_pct) FROM employees WHERE commission_pct IS NOT NULL);
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});







//66
app.get('/employees-with-salary-above-average-in-department', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT j.job_title
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            WHERE e.salary > (
                SELECT AVG(salary) FROM employees WHERE department_id = e.department_id
            );
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});






//67
app.get('/employees-not-assigned-to-department', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT employee_id
            FROM employees
            WHERE department_id IS NULL;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





//68
app.get('/employees-with-multiple-job-positions', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name, e.last_name
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            GROUP BY e.first_name, e.last_name
            HAVING COUNT(jh.job_id) > 1;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});






//69
app.get('/employee-count-in-departments', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.department_name, COUNT(e.employee_id) AS employee_count
            FROM departments d
            LEFT JOIN employees e ON d.department_id = e.department_id
            GROUP BY d.department_name;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});









//70
app.get('/total-salary-for-job-titles', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT j.job_title, SUM(e.salary) AS total_salary
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            GROUP BY j.job_title;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});












//71
app.get('/average-commission-per-department', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.department_name, AVG(e.commission_pct) AS avg_commission
            FROM departments d
            JOIN employees e ON d.department_id = e.department_id
            WHERE e.commission_pct IS NOT NULL
            GROUP BY d.department_name;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//72a
app.get('/max-salary-in-each-country', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.country_name, MAX(e.salary) AS max_salary
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            GROUP BY c.country_name;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





//72b
app.get('/employees-with-z-in-first-name', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name, e.last_name, d.department_name, l.city, l.state_province
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            WHERE e.first_name LIKE '%z%';
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





//73
app.get('/jobs-starting-after-1993-ending-before-1997', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT j.job_title, d.department_name, e.first_name || ' ' || e.last_name AS full_name, jh.start_date
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id
            JOIN departments d ON jh.department_id = d.department_id
            WHERE jh.start_date >= '1993-01-01' AND jh.end_date <= '1997-08-31';
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});







//74
app.get('/departments-with-at-least-2-employees', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.country_name, l.city, d.department_name, COUNT(e.employee_id) AS employee_count
            FROM departments d
            JOIN employees e ON d.department_id = e.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            GROUP BY c.country_name, l.city, d.department_name
            HAVING COUNT(e.employee_id) >= 2;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});







//75
app.get('/employees-without-commission-last-job', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name || ' ' || e.last_name AS full_name, j.job_title, jh.start_date, jh.end_date
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id
            WHERE e.commission_pct IS NULL
            ORDER BY jh.start_date DESC;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




//76
app.get('/employee-country-presently-working', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.employee_id, e.first_name || ' ' || e.last_name AS full_name, c.country_name
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            WHERE e.department_id IS NOT NULL
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




//77
app.get('/employees-with-smallest-salary-in-department', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name, e.last_name, e.salary, e.department_id
            FROM employees e
            WHERE e.salary = (
                SELECT MIN(salary) FROM employees WHERE department_id = e.department_id
            );
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//78
app.get('/employees-with-third-highest-salary', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM employees
            WHERE salary = (
                SELECT DISTINCT salary
                FROM employees
                ORDER BY salary DESC
                LIMIT 1 OFFSET 2
            );
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




//79
app.get('/employees-earning-more-than-average-and-department-has-j-in-name', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.employee_id, e.first_name, e.last_name, e.salary
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            WHERE e.salary > (
                SELECT AVG(salary) FROM employees
            )
            AND d.department_id IN (
                SELECT department_id FROM employees WHERE first_name LIKE '%J%' OR last_name LIKE '%J%'
            );
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});






//80
app.get('/employees-in-toronto', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name, e.last_name, e.employee_id, j.job_title
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            WHERE l.city = 'Toronto';
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});












const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);
