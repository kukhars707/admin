const express = require('express');
const auth = require('../controllers/signin');

const router = express.Router();

router.post('/auth', auth.login);

module.exports = router;