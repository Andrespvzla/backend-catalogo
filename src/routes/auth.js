/*
   Ruta: /api/login
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { login, registrarUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


router.post('/registrar', 
   [  
      check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
      check('password', 'La contraseña es obligatoria.').not().isEmpty(),
      check('correo', 'El correo es obligatorio').isEmail(),
      validarCampos
   ],
   registrarUsuario
);


router.post('/login', 
   [
      check('correo', 'El correo es obligatorio').isEmail(),
      check('password', 'La contraseña es obligatoria.').not().isEmpty(),
      validarCampos
   ],
   login
);

module.exports = router;