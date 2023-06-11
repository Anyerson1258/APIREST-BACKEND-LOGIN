const { Router } = require('express')
const { createInventario, getInventarios, deleteInventario, updateInventario} =
 require('../controllers/controlInventario')

const router = Router()

// crear
router.post('/', createInventario)

// eliminar 
router.delete('/:id', deleteInventario)


// modificar 
router.put('/:id', updateInventario)


// consultar todos
router.get('/', getInventarios)

module.exports = router;