const { response } = require("express");
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");

const registrarUsuario = async (req, res = response) => {
   const {nombre, correo, password} = req.body;
   try {
      const existeCorreo = await Usuario.findOne({correo});
      if (existeCorreo) {
         return res.status(400).json({
            ok: false,
            msg: 'Ya existe un usuario con ese correo.',
         });
      }
      const usuario = new Usuario({nombre, correo, password});
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);
      await usuario.save();
      const token = await generarJWT(usuario.id);
      res.json({
         ok: true,
         usuario,
         token
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado.'
      });
   }
}

const login = async (req, res = response) => {
   const {correo, password} = req.body;
   try {
      const usuarioDB = await Usuario.findOne({correo});
      if (!usuarioDB) {
         return res.status(404).json({
            ok: false,
            msg: 'El usuario no ha sido encontrado.'
         });
      }
      const passwordValido = bcrypt.compareSync(password, usuarioDB.password);
      if (!passwordValido) {
         return res.status(400).json({
            ok: false,
            msg: 'La contraseña es incorrecta.'
         });
      }
      const token = await generarJWT(usuarioDB.id);
      res.json({
         ok: true,
         token
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
   registrarUsuario,
   login
}