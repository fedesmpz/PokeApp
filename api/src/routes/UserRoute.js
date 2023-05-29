const router = require('express').Router()
const { register } = require('../controllers/setUser')
const { login } = require('../controllers/getUser')
const { validateToken } = require('../controllers/validateToken')


router.post('/register', (req, res) => {
    register(req, res)
})

router.post('/', (req, res)=>{
    login(req, res)
})

router.post('/validate-token', (req, res)=>{
    validateToken(req, res)
})

module.exports = router