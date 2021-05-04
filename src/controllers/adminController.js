const db = require("../database/models");
const { Op } = require("sequelize");
const { nanoid } = require('nanoid')
let adminController = {



/* login de usuario administrador */ 
login: function (req, res) {

// Renderizamos vista de login
    res.render('login');
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
req.session.admin = true;

// Dirigo a ruta de panel de control de usuario 
 res.redirect('/admin/panel');

}
// Si no matchea la contraseña
   else{
   
// Redirigo a login 
      res.redirect('/admin/incia-sesion');
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
},

/* Panel administrador*/
panel: function (req, res) {

// Si existe una sesionn de administrador
  let isAdmin = req.session.admin

  if(isAdmin){

//  Busca las propiedades
db.propiedades.findAll()

  .then(
    propiedad=>{
  // Renderizamos vista de panel de control del admin
  res.render('panelAdmin',{propiedad});
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
  else{
// Redirigo a login 
      res.redirect('/admin/incia-sesion');
   
  }
  


  },
/* Panel administrador*/

/* Crear propiedad*/
crear: function (req, res) {

//Busco todas las categorias 
db.categorias.findAll()

.then(categorias=>{

// Busco todas las operaciones
db.operaciones.findAll()

.then(operacion=>{

  res.render('crear',{categorias,operacion})
})


})

.catch(error=>{
  console.log(error);
})
  
},
/* /Crear propiedad*/




/* Crear propiedad*/
crearPropiedad: function (req, res) {

  console.log(req.files);
  db.propiedades.create({
              titulo:req.body.titulo,
              descripcion:req.body.Descripcion,
              habitaciones:req.body.habitaciones,
              baños:req.body.baños,
              dormitorios:req.body.dormitorios,
              direccion:req.body.direccion,
              precio:req.body.precio,
              imagen_principal:req.files[0].filename,
              role_id:req.body.category,
              rolee_id:req.body.operacion
            },
            
            
            )
          
            .then(propiedad=>{
              
// Creo array para almacenar las imagenes
              let arrayImages=[]

// loop que inserta imagenes a el arrayimages
              for(let i = 0 ;i < req.files.length;i++){
                arrayImages.push(

                  // creo datos para la tabla
                  db.images.create({
                  id:nanoid(),
                  path:req.files[i].filename,
                  propiedades_id:propiedad.idpropiedad
                  }))


                  Promise.all(arrayImages).then(() => {
                    // Redirecciono a el panel
                res.redirect('/admin/panel')

                  })
      
                  // atrapo el error
                  .catch((error) => {
                    // muestro el error por consola
                    console.log(error);
      
                    // Redirecciono a productos
                    res.redirect("/propiedades");
                  });
                }

            })
          
            /*En caso de error lo atrapamos */ 
            .catch(
            error=>{
    // Muestro error por consola
    console.log(error);
    
    // Redirigimos a inicio
    res.redirect('/')
    })

  },



  /* Editar mediante get */
editar: (req, res) => {

  // Busco todas las propiedades 
  db.propiedades.findOne(
    {where:{idpropiedad:req.params.id}},
     {
      // Busco categorias y asociaciones
      include:[{association:"categorias"},{association:"operaciones"}]
    }
  )

.then((propiedad) => {

  // Busco todas las categorias 
  db.categorias.findAll()
  
  .then(categorias=>{
  
  // Busco todas las operaciones
  db.operaciones.findAll()
  
  .then(operacion=>{

    // Declaro variable parametro 
    let parametro = req.params.id;

    res.render('editar',{propiedad,categorias,operacion,parametro})
    
  })
  
  
  })

})

 .catch((error) => {
 // muestro el error por consola
 console.log(error);
 
 // Redirecciono a productos
 res.redirect("/incia-sesion");
    })

},
  /* Editar mediante get */

/* Editar propiedad mediante post*/
editarPropiedad: (req, res) => {
  db.propiedades.update(
    { titulo:req.body.titulo,
      descripcion:req.body.Descripcion,
      habitaciones:req.body.habitaciones,
      baños:req.body.baños,
      dormitorios:req.body.dormitorios,
      direccion:req.body.direccion,
      precio:req.body.precio,
      imagen_principal:"ddd",
      role_id:req.body.category,
      rolee_id:req.body.operacion
    }
,    {
      where: {
        idpropiedad: req.params.id,
      },
    })
    .then((result) => {
      res.redirect("/admin/panel");
    })

    .catch((error) => {
      console.log(error);
      res.redirect("/admin/panel");
    });
},
/* Editar propiedad mediante post*/


/* Borrar propiedad mediante post*/

deleteById: (req, res) => {
  db.propiedades
    .destroy({
      where: {
        idpropiedad: req.params.id,
      },
    })
    .then((result) => {
      res.redirect("/admin/panel");
    })

    .catch((error) => {
      console.log(error);
      res.redirect("/panel");
    });
},
/* /Borrar propiedad mediante post*/



}



module.exports = adminController;
