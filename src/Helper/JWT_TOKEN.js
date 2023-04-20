const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const Cookies = require('universal-cookie');

const JWT_SECRET = crypto.randomBytes(32).toString('base64').replace(/[/+=]/g, '');

console.log(JWT_SECRET,7)

function generateToken(payload,expiresIn) {
  if(expiresIn){
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
    console.log(token,11);
    return token;
  }
  else{
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
  }
  
}

function verifyToken(req, res, next) {
  const cookies = new Cookies()


  const accessToken = req.cookies['cns-token'];
  if (!accessToken) 
      return res.status(400).json({error: 'User not authenticated!'})

  try {
       const validToken = jwt.verify(accessToken, JWT_SECRET)
       if(validToken) {
          req.authenticated = true
          return next();
       }
  } catch(err) {
      return res.status(400).json({error: `json web token ${err}`})
  }
}



module.exports = { generateToken, verifyToken };
