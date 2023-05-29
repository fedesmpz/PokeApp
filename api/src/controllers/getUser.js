require('dotenv').config();
const { User } = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const emailRegex = /^\S+@\S+\.\S+$/;

const login = async (req, res) => {

    const email = req.body.email.toLowerCase();
    const password = req.body.password;


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

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    
        return res.status(200).json({ access: true,  token  });
    
      } catch (error) {
        console.error(error);
        return res.status(500).json(error.message);
      }


}

module.exports = {
    login
}

// import { Request, Response } from 'express';
// import { User } from '../db';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// const emailRegex = /^\S+@\S+\.\S+$/;

// const login = async (req: Request, res: Response): Promise<Response> => {
//   const email: string = req.body.email.toLowerCase();
//   const password: string = req.body.password;

//   if (!emailRegex.test(email)) {
//     return res.status(400).json({ message: "El correo electrónico no es válido" });
//   }

//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(401).json({ message: 'Email o contraseña incorrectos' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Email o contraseña incorrectos' });
//     }

//     const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });

//     return res.status(200).json({ access: true, token });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error interno del servidor' });
//   }
// };

// export { login };
