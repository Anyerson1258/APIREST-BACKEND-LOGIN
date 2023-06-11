const Inventario = require('../models/modeloInventario')
const { request, response} = require('express')
const Usuario = require('../models/modeloUsuario')
const Marca = require('../models/modeloMarca')
const EstadoEquipo = require('../models/modeloEstadoEquipo')
const TipoEquipo = require('../models/modeloTipoEquipo')
// crear
const createInventario= async (req = request, 
    res = response) => {
    try{
        const data = req.body
        console.log(data)
        const { usuario, marca, estado, tipoEquipo } = data;
        //validación de usuario
        const usuarioDB = Usuario.findOne({
            _id: usuario._id,
            estado: true
        })
        if(!usuarioDB){
            return res.status(400).json({msg: 'usuario invalido'})
        }
        // validación de marca
        const marcaDB = Marca.findOne({
            _id: marca._id,
            estado: true
        })
        if(!marcaDB){
            return res.status(400).json({msg: 'marca invalida'})
        }
        // validación de estado
        const estadoDB = EstadoEquipo.findOne({
            _id: estado._id,
            estado: true
        })
        if(!estadoDB){
           return res.status(400).json({msg: 'estado invalido'})
        }
        // validación tipo equipo
        const tipoEquipoDB = TipoEquipo.findOne({
            _id: tipoEquipo._id,
            estado: true
        })
        if(!tipoEquipoDB){
           return res.status(400).json({msg: 'estado invalido'})
        }      
        const inventario = new Inventario(data)

        await inventario.save()
        
        return res.status(201).json(inventario)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}


/**
 * eliminar.
 */
const deleteInventario = async (req =request, res = response) =>{
    try{
        const inventario= await
        Inventario.findByIdAndDelete(req.params.id)
        return res.json(inventario) 
    }catch (e) {
        return res.status(500).json({
          msg: "no se puede eliminar",
        });
      } 
        
    } 

/**
 * editar.
 */
const updateInventario = async (req =request, res = response) =>{
    try{
        const {id} =req.params;
        const data = req.body
        const inventario= await Inventario.findByIdAndUpdate(id,data, {new: true})
       
        return res.status(201).json(inventario)
    } catch (e) {
        return res.status(500).json({
          msg: "no se puede actualizar",
        });
      } 
   

}



//listar todos
const getInventarios = async (req = request, 
    res = response) => {
        try{
            const inventariosDB = await Inventario.find()//select * from inventarios
                .populate({
                    path: 'usuario',
                    match: { estado: true }
                })
                .populate({
                    path: 'marca',
                    match: { estado: true }
                })
                .populate({
                    path: 'estado',
                    match: { estado: true }
                })
                .populate({
                    path: 'tipoEquipo',
                    match: { estado: true }
                })
            return res.json(inventariosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

module.exports = { createInventario, getInventarios, deleteInventario, updateInventario}