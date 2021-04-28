var express = require('express');
var router = express.Router();

let adminController= require('../controllers/adminController');

/*******************************/ 
/*    Ingreso administrador   */ 
/*****************************/ 


/* iniciar session para administrador*/
router.get('/incia-sesion', adminController.login);
/* /iniciar session para administrador*/

/* iniciar session de adinistrador por medio de post*/
router.post('/login', adminController.Verificacionlogin);
/* /iniciar session de adinistrador por medio de post*/



/***************************/ 
/*   Panel administrador  */ 
/*************************/ 


/* Panel administrador*/
router.get('/panel', adminController.panel);
/* /Panel administrador*/




/* Crear propiedad*/
router.get('/crear',adminController.crear);
/* Crear propiedad*/

/* Crear propiedad*/
router.post('/crear-propiedad',adminController.crearPropiedad);
/* Crear propiedad*/


/*    EDITAR       */

/* editar propiedad*/
router.get('/editar/:id',adminController.editar);
/* editar propiedad*/

/* editar propiedad*/
router.post('/editar-propiedad/:id',adminController.editarPropiedad);
/* editar propiedad*/


/* borrrar propiedad*/
router.post('/borrar/:id',adminController.deleteById);
/* borrrar propiedad*/

module.exports = router;
