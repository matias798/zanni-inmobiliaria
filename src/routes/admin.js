var express = require('express');
var router = express.Router();
let adminController= require('../controllers/adminController');
const multer = require('multer')
const path =require('path');

const storage =multer.diskStorage({
    destination:path.join(__dirname,'../../public/images'  ),
   filename:(req,file,cb)=>{
    cb(null,file.originalname)
   } 
  
  })


const upload = multer({storage})


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
router.post('/crear-propiedad',upload.array('images'),adminController.crearPropiedad);
/* Crear propiedad*/


/*    EDITAR       */

/* editar propiedad*/
router.get('/editar/:id',adminController.editar);
/* editar propiedad*/

/* editar propiedad*/
router.post('/editar-propiedad/:id',upload.array('images'),adminController.editarPropiedad);
/* editar propiedad*/


/* borrrar propiedad*/
router.post('/borrar/:id',adminController.deleteById);
/* borrrar propiedad*/




module.exports = router;
