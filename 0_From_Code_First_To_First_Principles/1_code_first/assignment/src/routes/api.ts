import express from 'express';
import cors from 'cors';
import { createUserValidator } from '../validators/usersValidator';
import UsersController from '../controllers/usersController';

const router = express.Router();

router.use(cors());

router.post('/users/new', createUserValidator, UsersController.create);
router.post('/users/edit/:userId', UsersController.edit);
router.get('/users', UsersController.getByEmail);

export default router;