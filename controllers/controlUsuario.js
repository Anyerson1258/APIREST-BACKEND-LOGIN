const Usuario = require("../models/modeloUsuario");
const { request, response } = require("express");


/**
 * Creación
 */
const createUsuario = async (req = request, res = response) => {
  try {
    const data = req.body;
    const email = data.email;
    const usuarioBD = await Usuario.findOne({ email });
    if (usuarioBD) {
      return res.status(400).json({ msg: "Ya existe usuario" });
    }
    const usuario = new Usuario(data);
    await usuario.save();
    return res.status(201).json(usuario);
  } catch (e) {
    return res.status(500).json({
      msg: e,
    });
  }
};

/**
 * eliminar.
 */
 const deleteUsusario = async (req =request, res = response) =>{
    try{
        const suario= await
        Usuario.findByIdAndDelete(req.params.id)
        return res.json(suario) 
    }catch (e) {
        return res.status(500).json({
          msg: "no se puede eliminar",
        });
      } 
        
    } 

/**
 * editar.
 */
const updateUsusario = async (req =request, res = response) =>{
    try{
        const {id} =req.params;
        const suarioUbdate= await Usuario.findByIdAndUpdate(id, req.body, {
            new: true
        })
       
        return res.json(suarioUbdate)
    } catch (e) {
        return res.status(500).json({
          msg: "no se puede actualizar",
        });
      } 
   

}
        
 
/**
 * Listar todos
 */
const getUsuario = async (req = request, res = response) => {
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
};

module.exports = { createUsuario, getUsuario, deleteUsusario, updateUsusario };
