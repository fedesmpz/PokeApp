const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
const passwordLong = 5


const validate = (email, password) => {
    const error = {}

    if (!emailRegex.test(email)) {
        error.email = 'No es un email válido'
    } 
    if (!passwordRegex.test(password)) {
        error.password = 'La contraseña debe tener al menos una letra y un número'
    }
    if (password.length < passwordLong) {
        error.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    return error

}

export default validate