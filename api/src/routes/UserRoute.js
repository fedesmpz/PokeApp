const router = require('express').Router()
const { register } = require('../controllers/setUser')
const { login } = require('../controllers/getUser')


router.post('/register', (req, res) => {
    register(req, res)
})

router.post('/', (req, res)=>{
    login(req, res)
})

module.exports = router