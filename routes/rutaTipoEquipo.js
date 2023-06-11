const { Router } = require('express')
const { createTipoEquipo, getTipoEquipos, deleteTipoEquipo, updateTipoEquipo } = require('../controllers/controlTipoEquipo')

const router = Router()

// crear
router.post('/', createTipoEquipo)

// eliminar 
router.delete('/:id', deleteTipoEquipo)


// modificar 
router.put('/:id', updateTipoEquipo)


// listar
router.get('/', getTipoEquipos)

module.exports = router