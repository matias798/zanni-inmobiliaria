const db = require("../database/models");
const { Op } = require("sequelize");


let adminController = {



/* login de usuario administrador */ 
login: function (req, res) {

// Renderizamos vista de login
    res.render('create');
   
},
/* /login de usuario administrador */ 




/* login de usuario administrador */ 
Verificacionlogin: function (req, res) {

// Busca algun admin con igual email
db.admin.findOne({ where:{ email:req.body.email }})


.then(admin=>{

// Si la contraseña es igual a la escrita en el formulario
if (admin.contraseña == req.body.password ){
      
//creo session de usuario administrador
req.session.admin = 'admin';

// Dirigo a ruta de panel de control de usuario 
 res.redirect('/f');

}
// Si no matchea la contraseña
   else{
   
// Redirigo a login 
      res.redirect('/incia-sesion');
   }
   
})

/* Atrapo el error*/ 
.catch(
  error=>{
    // muestro error por consola
    console.log(error);
 
   // Dirigo a inicio 
    res.redirect('/')
 
 })
/* /Atrapo el error*/ 




}

}



module.exports = adminController;
