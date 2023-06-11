const { Router } = require('express');
const Usuario = require('../models/modeloUsuario');
const { validationResult, check } = require('express-validator');
const bycript = require('bcryptjs')

const router = Router();

router.post('./', [
    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').not().isEmpty(),

], async function (req, res) {

    try {

        //validacion de los campos requeridos
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario) {
            return res.status(400).send({ mensaje: 'Correo no valido' });
        }

        const esIgual = bycript.compareSync(req.body.password, usuario.password);
        if (!esIgual) {
            return res.status(400).send({ mensaje: 'Contraseña no valida' })
        }

        res.json({ _id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol, estado: usuario.estado });


    } catch (error) {
        console.log(500);
        res.status(500).json({ mensaje: 'Internal server error' });
    }


});

//listar

router.get('/', async function (req, res) {
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

module.exports = router;