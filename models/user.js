const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String}
});

userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.pre('save', function (next) {
    const user = this;

    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) return next(error);

            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error) return next(error);

                user.password = hash;
                next();
            });
        });
    } else return next();
});

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, match) {
        if (err) {
            return cb(err);
        }

        cb(null, match);

    });
};

module.exports = mongoose.model('User', userSchema);