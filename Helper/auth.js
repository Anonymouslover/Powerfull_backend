const User = require('./Models/createAdmin');
const bcrypt = require('bcryptjs');

function authUser(email, password, role, callback) {
  User.findOne({ email: email, role: role })
    .exec(function(err, user) {
      if (err) {
        return callback(err);
      } else if (!user) {
        const err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }

      bcrypt.compare(password, user.password, function(err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      });
    });
}

module.exports = authUser;
