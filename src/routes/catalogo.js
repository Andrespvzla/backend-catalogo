/*
   Ruta: /api/catalogos
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { agregarCatalogo, obtenerCatalogos, obtenerCatalogoPorId, actualizarCatalogo, borrarCatalogo } = require('../controllers/catalogo');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/', obtenerCatalogos);
router.get('/:id', obtenerCatalogoPorId);

router.post('/', 
   [
      validarJWT,
      check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
      check('telefono', 'El número de teléfono es obligatorio.').not().isEmpty(),
      validarCampos
   ], agregarCatalogo
);

router.put('/:id', 
   [
      validarJWT,
      check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
      check('telefono', 'El número de teléfono es obligatorio.').not().isEmpty(),
      validarCampos
   ], actualizarCatalogo
);

router.delete('/:id', 
   [
      validarJWT,
   ], borrarCatalogo
);

module.exports = router;
