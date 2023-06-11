const EstadoEquipo = require('../models/modeloEstadoEquipo')
const {request, response} = require('express')

/**
 * Creación
 */
const createEstadoEquipo = async (req = request, 
    res = response) => {
    try{
        const nombre = req.body.nombre 
        ? req.body.nombre.toUpperCase()
        : ''
        const estadoEquipoBD = await EstadoEquipo.findOne({nombre})
        if(estadoEquipoBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const estadoEquipo = new EstadoEquipo(data)
        //console.log(tipoEquipo)
        await estadoEquipo.save()
        return res.status(201).json(estadoEquipo)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }

}

//* eliminar  */
const deleteEstadoEquipo = async (req =request, res = response) =>{
    try{
        const stadoEquipo= await
        EstadoEquipo.findByIdAndDelete(req.params.id)
        return res.json(stadoEquipo) 
    }catch (e) {
        return res.status(500).json({
          msg: "no se puede eliminar",
        });
      } 
        
    } 

/**
 * editar.
 */
const updateEstadoEquipo = async (req =request, res = response) =>{
    try{
        const {id} =req.params;
        const estadoEquipoUbdate= await EstadoEquipo.findByIdAndUpdate(id, req.body, {
            new: true
        })
       
        return res.json(estadoEquipoUbdate)
    } catch (e) {
        return res.status(500).json({
          msg: "no se puede actualizar",
        });
      } 
   

}

/**
 * Listar todos
 */
const getEstadoEquipo = async (req = request, 
    res = response) => {
    try{
        const { estado } = req.query;

        const estadoEquipoDB = await EstadoEquipo.find({estado})
        //select * from tipoequipo where estado = ?;
        return res.json(estadoEquipoDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        }) 
    }
}

module.exports = {createEstadoEquipo, getEstadoEquipo , updateEstadoEquipo, deleteEstadoEquipo}