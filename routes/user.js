const express = require('express');

const { createUser, userLogin, add, isEnrolled, fetchUsers } = require('../controllers/user');
const router = express.Router();

router.route('/').get(fetchUsers);
router.route('/register').post(createUser);
router.route('/login').post(userLogin);
router.route('/').post(add).put(isEnrolled);


module.exports = router;
