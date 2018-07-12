const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

module.exports = {
    login: async (req, res) => {
        await User.findOne({email: req.body.email}, (err, user) => {
            if (err) throw err;

            if (!user) {
                res.send({success: false, message: 'User no found'});
            } else {
                user.comparePassword(req.body.password, (err, match) => {
                    if (match && !err) {
                        let token = jwt.sign(user.toJSON(), config.secretkey, {
                            expiresIn: 100080
                        });
                        // res.header('Authorization', 'Bearer ' + token);
                        res.json({success: true, token: 'Bearer ' + token});
                    } else {
                        res.send({success: false, message: 'Authenticate false'});
                    }
                });
            }
        });
    }
}