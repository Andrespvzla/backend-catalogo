const { response } = require('express');

const Usuario = require('../models/usuario');

const obtenerUsuarios = async (req, res = response) => {
   try {
      const usuarios = await Usuario.find({}, 'nombre correo role google');
      res.json({
         ok: true,
         usuarios
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado.'
      });
   }
}

const obtenerUsuarioPorId = async (req, res = response) => {
   const uid = req.params.id;
   try {
      const usuarioEncontrado = await Usuario.findById(uid, 'nombre correo role google');
      res.json({
         ok: true,
         usuarioEncontrado
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado.'
      });
   }
}

const actualizarUsuario = async (req, res = response) => {
   const uid = req.params.id;
   try {
      const usuarioDB = await Usuario.findById(uid);
      if (!usuarioDB) {
         return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario por ese id.'
         });
      }
      const {password, google, correo, ...campos} = req.body;
      if (usuarioDB.correo !== correo) {
         const existeCorreo = await Usuario.findOne({correo});
         if (existeCorreo) {
            return res.status(400).json({
               ok: false,
               msg: 'Ya existe un usuario con ese correo.'
            });
         }
      }
      campos.correo = correo;
      const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});
      res.json({
         ok: true,
         usuario: usuarioActualizado
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado.'
      });
   }
}
// Activar o Desactivar un usuario
// const desactivarUsuario = async (req, res = respose) => {
//    const uid = req.params.id;
//    try {
//       const usuarioDB = await Usuario.findById(uid);
//       if (!usuarioDB) {
//          return res.status(404).json({
//             ok: false,
//             msg: 'No existe un usuario por ese id.'
//          });
//       }
//       usuarioDB.activado = false;
//       const usuarioDesactivado = await Usuario.findByIdAndUpdate(uid, usuarioDB, {new: true});
//       res.json({
//          ok: true,
//          msg: 'Usuario desactivado',
//          usuario: usuarioDesactivado
//       });
//    } catch (error) {
//       console.log(error);
//       res.status(500).json({
//          ok: false,
//          msg: 'Error inesperado.'
//       });
//    }
// }

const eliminarUsuario = async (req, res = response) => {
   const uid = req.params.id;
   try {
      const usuarioDB = await Usuario.findById(uid);
      if (!usuarioDB) {
         return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario por ese id.'
         });
      }
      await Usuario.findByIdAndDelete(uid);
      res.json({
         ok: true,
         msg: 'Usuario eliminado'
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
   obtenerUsuarios,
   obtenerUsuarioPorId,
   actualizarUsuario,
   eliminarUsuario,
   // desactivarUsuario
}