const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAllUsers);
router.post('/', controller.createUser);
router.get('/:email', controller.getUserByEmail);

module.exports = router;