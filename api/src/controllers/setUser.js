const { User } = require('../db')
const bcrypt = require('bcrypt')

const register = async (req, res) => {

    const { name, surname, password } = req.body;
    const email = req.body.email.toLowerCase()

    const emailRegex = /^\S+@\S+\.\S+$/;
    const passNumber = /\d/
    const passChar = /[a-zA-Z]/
    
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "El correo electrónico no es válido" });
    } 


    if (!password || password.length < 6 || !passNumber.test(password) || !passChar.test(password)) {
        return res.status(400).json({ message: "La contraseña debe contener al menos 6 caracteres, letras y números" });
      }

    try {
     
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        surname,
        email,
        password: hashedPassword
      });

      return res.status(201).json({ message: 'Usuario registrado con éxito' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = {
    register
}