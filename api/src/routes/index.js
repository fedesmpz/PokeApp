const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRoutes = require('./PokemonRoute.js')
const typeRoutes = require('./TypeRoute')
const userRoutes = require('./UserRoute.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', userRoutes);
router.use('/pokemon', pokemonRoutes);
router.use('/type', typeRoutes);


module.exports = router;
