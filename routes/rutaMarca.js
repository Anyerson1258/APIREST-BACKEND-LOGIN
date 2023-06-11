const { Router } = require('express')
const { createMarca, getMarca, deleteMarca, updateMarca } = require('../controllers/controlMarca')

const router = Router()

// crear
router.post('/', createMarca)

// eliminar 
router.delete('/:id', deleteMarca)


// modificar 
router.put('/:id', updateMarca)


// listar
router.get('/', getMarca)

module.exports = router