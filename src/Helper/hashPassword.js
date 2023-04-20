const crypto = require('crypto');

function MySecurePassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

function hashPassword(next) {
  if (this.isModified('password')) {
    const { salt, hash } = MySecurePassword(this.password);
    this.salt = salt;
    this.password = hash;
  }
  
  next();
}


function addVerifyPassword(schema) {
  schema.methods.verifyPassword = function(password) {
    const passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    
    return passwordHash === this.password;
  };
}

module.exports = { hashPassword, addVerifyPassword };
