const { response } = require('express');

const Producto = require('../models/productos');

const agregarProducto = async (req, res = response) => {
   const {nombre, descripcion, categoria, precio, stock, img} = req.body;
   try {
      const nuevoProducto = new Producto({nombre, descripcion, categoria, precio, stock, img});
      await nuevoProducto.save();
      res.json({
         ok: true,
         nuevoProducto
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado.'
      });
   }
}

const obtenerProducto = async (req, res = response) => {
   try {
      const productos = await Producto.find({}, 'nombre descripcion categoria precio stock img');
      res.json({
         ok: true,
         productos
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado.'
      });
   }
}

const obtenerProductoPorId = async (req, res = response) => {
   const id = req.params.id;
   try {
      const existeProducto = await Producto.findById(id);
      if (!existeProducto) {
         return res.status(404).json({
            ok: false,
            msg: 'No existe un producto por ese id.'
         });
      }
      const producto = await Producto.findById(id);
      res.json({
         ok: true,
         producto
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado.'
      });
   }
}

const actualizarProducto = async (req, res = response) => {
   const id = req.params.id;
   try {
      const existeProducto = await Producto.findById(id);
      if (!existeProducto) {
         return res.status(404).json({
            ok: false,
            msg: 'No existe un producto por ese id.'
         });
      }
      const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, {new: true});
      res.json({
         ok: true,
         productoActualizado
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado.'
      });
   }
}

const eliminarProducto = async (req, res = response) => {
   const id = req.params.id;
   try {
      const existeProducto = await Producto.findById(id);
      if (!existeProducto) {
         return res.status(404).json({
            ok: false,
            msg: 'No existe un producto por ese id.'
         });
      }
      await Producto.findByIdAndDelete(id);
      res.json({
         ok: true,
         msg: 'Producto eliminado.'
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
   agregarProducto,
   obtenerProducto,
   obtenerProductoPorId,
   actualizarProducto,
   eliminarProducto
}