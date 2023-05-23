const { User } = require('../db')
const bcrypt = require('bcrypt')

const emailRegex = /^\S+@\S+\.\S+$/;

const login = async (req, res) => {

    const { email, password } = req.body;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "El correo electrónico no es válido" });
    }

    try {

        const user = await User.findOne({ where: { email } });
        if (!user) {
          return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
    
        return res.status(200).json({ access: true });
    
      } catch (error) {
        console.error(error);
        return res.status(500).json(error.message);
      }


}

module.exports = {
    login
}