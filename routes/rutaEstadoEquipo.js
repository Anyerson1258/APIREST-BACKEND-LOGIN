const { Router } = require('express')
const { createEstadoEquipo, getEstadoEquipo,updateEstadoEquipo, deleteEstadoEquipo } = require('../controllers/controlEstadoEquipo')


const router = Router()

// crear
router.post('/', createEstadoEquipo)

// eliminar 
router.delete('/:id', deleteEstadoEquipo)


// modificar 
router.put('/:id', updateEstadoEquipo)


// listar
router.get('/', getEstadoEquipo)

module.exports = router