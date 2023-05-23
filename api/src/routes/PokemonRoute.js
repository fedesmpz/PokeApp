const router = require('express').Router()
const { getPokemonById } = require('../controllers/getPokemonById')
const { getPokemonByName } = require('../controllers/getPokemonByName')
const { setPokemonInBd } = require('../controllers/setPokemonInBd')


router.get('/:id', (req, res)=>{
    getPokemonById(req, res)
})

router.get('/', (req, res)=>{
    getPokemonByName(req, res)
})

router.post('/', (req, res)=>{
    setPokemonInBd(req, res)
})

module.exports = router