const express = require('express');
const test = require('../controllers/test-auth');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/test', passport.authenticate('jwt', {session: false}), test.testAuth);

module.exports = router;