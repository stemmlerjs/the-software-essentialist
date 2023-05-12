const queries = require('./queries');
const pool = require('../../db');

const getAllUsers = (req, res) => {
    pool.query(queries.getAllUsers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const getUserByEmail = (req, res) => {
    const email = req.params.email;
    pool.query(queries.getUserByEmail, [email], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows[0].name);
    });
}

const createUser = (req, res) => {
    const {name, lastname, email, password} = req.body;
    pool.query(queries.checkExistingEmail, [email], (error, results) => {
        if (results.rows.length) {
            console.log('Email already exists, Try Again with new email credentials!');
            res.send("Email already exists, Try Again with new email credentials!");
        } else {
            pool.query(queries.createUser, [name, lastname, email, password], (error, results) => {
                if (error) throw error;
                res.status(201).send("Student Created Successfully!");
                console.log('Student Created Successfully!');
            });
        }
    });
}
 
module.exports = { 
    getAllUsers,
    getUserByEmail,
    createUser,
}