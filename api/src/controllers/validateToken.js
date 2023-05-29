require('dotenv').config();
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;


const validateToken = async (req, res) =>{
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }
  
    try {
        jwt.verify(token, SECRET_KEY);
        return res.status(200).json({ validate: true });
      } catch (error) {
        return res.status(401).json({ validate: false });
      }

}

module.exports = {
    validateToken
}