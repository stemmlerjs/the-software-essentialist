
import express from 'express';

import { PostsController, UserController } from './controllers';
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())

const userController = new UserController();
const postController = new PostsController();

// Create a new user
app.post('/users/new', (req, res) => userController.createUser(req, res));

// Edit a user
app.post('/users/edit/:userId', (req, res) => userController.editUser(req, res));

// Get a user by email
app.get('/users', (req, res) => userController.getUserByEmail(req, res));

// Get posts
app.get('/posts', (req, res) => postController.getPosts(req, res));


export { app };