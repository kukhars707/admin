const User = require('../models/user');

module.exports = {
    signup: async (req, res, next) => {
        const crendeteils = req.body;
        let user;
        
        try {
            user = await User.create(crendeteils);
        } catch (e) {
            next(e);
        }

        res.json(user);
    }
}