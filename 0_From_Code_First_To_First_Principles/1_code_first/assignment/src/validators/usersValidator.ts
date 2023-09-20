import { body } from 'express-validator';

const createUserValidator = [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').not().isEmpty(),
    body('firstName', 'First name is required').not().isEmpty(),
    body('lastName', 'Last name is required').not().isEmpty(),
];

export { createUserValidator };