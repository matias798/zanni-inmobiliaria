var express = require('express');
var router = express.Router();
let indexController= require('../controllers/indexController');


/* indice de productos*/
router.get('/', indexController.Indice);
/* indice de productos*/

/* detalle de productos*/
router.get('/detalle/:id', indexController.detalle);
/* detalle de productos*/

/* Propiedades en alquiler */
router.get('/propiedades/alquiler', indexController.alquiler);
/* Propiedades en alquiler*/

/* Propiedades en venta*/
router.get('/propiedades/venta', indexController.venta);
/* Propiedades en venta */



module.exports = router;
