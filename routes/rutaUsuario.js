const { Router } = require('express');
const Usuario = require ('../models/modeloUsuario');
const { validationResult, check } = require('express-validator');
const bycript = require('bcryptjs')

//const { createUsuario,updateUsusario,  getUsuario, deleteUsusario } = require('../controllers/controlUsuario');

const router = Router()

// crear
router.post('/', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('email','invalid.email').isEmail(),
    check('password','invalid.password').not().isEmpty(),
    check('rol','invalid.rol').isIn(['ADMIN','DOCENTE']),
    check('estado','invalid.estado').isIn(['ACTIVO','INACTIVO'])

], async function(req, res){

    try {

        //validacion de los campos requeridos
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ mensaje: errors.array() })
        }

        const existeUsuario = await Usuario.findOne({email: req.body.email});
        if(existeUsuario){
            return res.status(400).send('Email existe');
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;


        const salt = bycript.genSaltSync()
        const password = bycript.hashSync(req.body.password, salt);
        usuario.password = password;

        usuario.rol = req.body.rol
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();


        usuario = await usuario.save();

        res.send(usuario);

        
    } catch (error) {
        console.log(500);
        res.status(500).json({mensaje: 'Internal server error'});
    }


});

//listar

router.get('/', async function (req, res){
    try {
        const { estado } = req.query;
    
        const usuarioDB = await Usuario.find({ estado });
        //select * from tipoequipo where estado = ?;
        return res.json(usuarioDB);
      } catch (e) {
        return res.status(500).json({
          msg: e,
        });
      }
});











/*
// eliminar 
router.delete('/:id', deleteUsusario)


// modificar 
router.put('/:id', updateUsusario)


// listar
router.get('/', getUsuario)
*/



module.exports = router;