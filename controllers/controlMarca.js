const Marca = require('../models/modeloMarca')
const {request, response} = require('express')

/**
 * Creación
 */
const createMarca = async (req = request, 
    res = response) => {
    try{
        const nombre = req.body.nombre 
        ? req.body.nombre.toUpperCase()
        : ''
        const marcaBD = await Marca.findOne({nombre})
        if(marcaBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const marca = new Marca(data)
        //console.log(tipoEquipo)
        await marca.save()
        return res.status(201).json(marca)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }

}

/**
 * eliminar.
 */
const deleteMarca = async (req =request, res = response) =>{
    try{
        const maarca= await
        Marca.findByIdAndDelete(req.params.id)
        return res.json(maarca) 
    }catch (e) {
        return res.status(500).json({
          msg: "no se puede eliminar",
        });
      } 
        
    } 

/**
 * editar.
 */
const updateMarca = async (req =request, res = response) =>{
    try{
        const {id} =req.params;
        const marcaUbdate= await Marca.findByIdAndUpdate(id, req.body, {
            new: true
        })
       
        return res.json(marcaUbdate)
    } catch (e) {
        return res.status(500).json({
          msg: "no se puede actualizar",
        });
      } 
   

}

/**
 * Listar todos
 */
const getMarca = async (req = request, 
    res = response) => {
    try{
        const { estado } = req.query;

        const marcaDB = await Marca.find({estado})
        //select * from tipoequipo where estado = ?;
        return res.json(marcaDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        }) 
    }
}

module.exports = {createMarca, getMarca, updateMarca ,deleteMarca}