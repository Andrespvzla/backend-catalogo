/*
   Ruta: /api/usuarios
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/', validarJWT, obtenerUsuarios);
router.get('/:id', validarJWT, obtenerUsuarioPorId);

router.put('/:id', 
   [
      validarJWT,
      check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
      check('correo', 'El correo es obligatorio').isEmail(),
      validarCampos
   ], 
   actualizarUsuario
);

router.delete('/:id', validarJWT, eliminarUsuario);


module.exports = router;