const { response } = require('express');

const Catalogo = require('../models/catalogo');

const agregarCatalogo = async (req, res = response) => {
   const {nombre, telefono, img, tiposDePago, redesSociales} = req.body;
   try {
      const catalogo = new Catalogo({nombre, telefono, img, tiposDePago, redesSociales});
      catalogo.usuario = req.uid;
      await catalogo.save();
      res.json({
         ok: true,
         catalogo
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado.'
      });
   }
}

const obtenerCatalogos = async (req, res = response) => {
   try {
      const catalogos = await Catalogo.find().populate('usuario', 'nombre');
      res.json({
         ok: true,
         catalogos
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado.'
      });
   }
}

const obtenerCatalogoPorId = async (req, res = response) => {
   const id = req.params.id;
   try {
      const catalogo = await Catalogo.findById(id).populate('usuario', 'nombre');
      if (!catalogo) {
         return res.status(404).json({
            ok: false,
            msg: 'No existe un catalogo por ese id.'
         });
      }
      res.json({
         ok: true,
         catalogo
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado.'
      });
   }
}

const actualizarCatalogo = async (req, res = response) => {
   const id = req.params.id;
   try {
      const catalogo = await Catalogo.findById(id);
      if (!catalogo) {
         return res.status(404).json({
            ok: false,
            msg: 'No existe un catalogo por ese id.'
         });
      }
      const catalogoActualizado = await Catalogo.findByIdAndUpdate(id, req.body, {new: true});
      res.json({
         ok: true,
         catalogoActualizado
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado.'
      });
   }
}

const borrarCatalogo = async (req, res = response) => {
   const id = req.params.id;
   try {
      const catalogo = await Catalogo.findById(id);
      if (!catalogo) {
         return res.status(404).json({
            ok: false,
            msg: 'No existe un catalogo por ese id.'
         });
      }
      await Catalogo.findByIdAndDelete(id);
      res.json({
         ok: true,
         msg: 'El catalogo ha sido eliminado.'
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado.'
      });
   }
}

module.exports = {
   agregarCatalogo,
   obtenerCatalogos,
   obtenerCatalogoPorId,
   actualizarCatalogo,
   borrarCatalogo
}