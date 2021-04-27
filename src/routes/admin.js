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
/*   Panel administrador   */ 
/**************************/ 


/* Panel administrador*/
router.get('/panel', adminController.panel);
/* /Panel administrador*/

module.exports = router;
