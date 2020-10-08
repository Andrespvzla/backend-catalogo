/*
   Ruta: /api/productos
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { obtenerProducto, obtenerProductoPorId, actualizarProducto, eliminarProducto, agregarProducto } = require('../controllers/productos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/', validarJWT, obtenerProducto);
router.get('/:id', validarJWT, obtenerProductoPorId);

router.post('/', 
   [
      validarJWT,
      check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
      check('descripcion', 'La descripción es obligatoria.').not().isEmpty(),
      check('categoria', 'La categoria es obligatoria.').not().isEmpty(),
      check('precio', 'El precio es obligatorio.').not().isEmpty(),
      check('stock', 'El stock es obligatorio.').not().isEmpty(),
      validarCampos
   ], agregarProducto
);

router.put('/:id', 
   [
      validarJWT,
      check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
      check('descripcion', 'La descripción es obligatoria.').not().isEmpty(),
      check('categoria', 'La categoria es obligatoria.').not().isEmpty(),
      check('precio', 'El precio es obligatorio.').not().isEmpty(),
      check('stock', 'El stock es obligatorio.').not().isEmpty(),
      validarCampos
   ], 
   actualizarProducto
);

router.delete('/:id', validarJWT, eliminarProducto);


module.exports = router;