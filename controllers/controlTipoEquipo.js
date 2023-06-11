const TipoEquipo = require('../models/modeloTipoEquipo')
const {request, response} = require('express')

/**
 * Creación
 */
const createTipoEquipo = async (req = request, 
    res = response) => {
    try{
        const nombre = req.body.nombre 
        ? req.body.nombre.toUpperCase()
        : ''
        const tipoEquipoBD = await TipoEquipo.findOne({nombre})
        if(tipoEquipoBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const tipoEquipo = new TipoEquipo(data)
        //console.log(tipoEquipo)
        await tipoEquipo.save()
        return res.status(201).json(tipoEquipo)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }

}

/**
 * eliminar.
 */
const deleteTipoEquipo = async (req =request, res = response) =>{
    try{
        const tipo_equipo= await
        TipoEquipo.findByIdAndDelete(req.params.id)
        return res.json(tipo_equipo) 
    }catch (e) {
        return res.status(500).json({
          msg: "no se puede eliminar",
        });
      } 
        
    } 

/**
 * editar.
 */
const updateTipoEquipo = async (req =request, res = response) =>{
    try{
        const {id} =req.params;
        const tipoEquipoUbdate= await TipoEquipo.findByIdAndUpdate(id, req.body, {
            new: true
        })
       
        return res.json(tipoEquipoUbdate)
    } catch (e) {
        return res.status(500).json({
          msg: "no se puede actualizar",
        });
      } 
   

}

/**
 * Listar todos
 */
const getTipoEquipos = async (req = request, 
    res = response) => {
    try{
        const { estado } = req.query;

        const tipoEquiposDB = await TipoEquipo.find({estado})
        //select * from tipoequipo where estado = ?;
        return res.json(tipoEquiposDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        }) 
    }
}

module.exports = {createTipoEquipo, getTipoEquipos, updateTipoEquipo, deleteTipoEquipo}