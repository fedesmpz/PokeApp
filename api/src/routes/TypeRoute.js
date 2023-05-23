const router = require('express').Router()
const { getPokemonByType } = require('../controllers/getPokemonByType')


router.get('/', (req, res)=>{
    getPokemonByType(req, res)
})

router.get('/:type', (req, res)=>{
    getPokemonByType(req, res)
})


module.exports = router