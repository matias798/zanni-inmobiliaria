const db = require("../database/models");
const { Op } = require("sequelize");
const { nanoid } = require('nanoid')
var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name:'dsoeo0zhi',
  api_key:'899347544757772',
  api_secret:'8M0dPqtAnK9GEm4m-YkSwkm3F7A'
})


let adminController = {



/* login de usuario administrador */ 
login: function (req, res) {

  let aviso = undefined;
  // Renderizamos vista de login
    res.render('login',{aviso});
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
   let aviso= 'el usuario o la contraseña no son correctas'

   // Renderizo login 
   res.render('login',{aviso});

   }
   
})

/* Atrapo el error*/ 
.catch(
  error=>{
    // muestro error por consola
    console.log(error);
 
    let aviso= 'El usuario o la contraseña no son correctas'

    // Renderizo login 
    res.render('login',{aviso});
 
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
crearPropiedad: async function (req, res) {
  try{
    const result = await cloudinary.v2.uploader.upload(req.files[0].path)
    const url= await result.url;

    /* Creating a property with the attributes  */ 
 db.propiedades.create({
              titulo:req.body.titulo,
              descripcion:req.body.Descripcion,
              habitaciones:req.body.habitaciones,
              baños:req.body.baños,
              dormitorios:req.body.dormitorios,
              direccion:req.body.direccion,
              precio:req.body.precio,
              imagen_principal: url ,
              role_id:req.body.category,
              rolee_id:req.body.operacion
            })

.then( (propiedad)=>{

  // Assync Function created for creating the data about all the images in the database and in cloudinary
  async function UploadImages() {

/* Declaring variables */ 
let results;
let onlineId;
const arrayimage=[];

// Loop for the length of the files uploaded
for(let i = 0; i < req.files.length; i ++ )

{
  // upload the file to cloudinary
  results = await cloudinary.v2.uploader.upload(req.files[i].path)
  onlineId= await results.public_id;//id of file in cloudinary
             
arrayimage.push( 

// Inserting data to the myqsl
  db.images.create({
    id:nanoid(),
    path:onlineId,  
    propiedades_id:propiedad.idpropiedad
    })

// If it haves problems inserting data to mysql image table 
    .catch(e=>{
      console.log(e);
      
      res.redirect('/admin/panel')
    })
)

}
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
}


UploadImages();
})

// In case of having an error uploading the property
}catch (error) {
console.log(error);
               
res.redirect('/admin/inicia-sesion')
              }
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
editarPropiedad: async (req, res) => {

  try{
    const result = await cloudinary.v2.uploader.upload(req.files[0].path)
    const url= await result.url;

    /* Creating a property with the attributes  */ 

  db.propiedades.update(
    { titulo:req.body.titulo,
      descripcion:req.body.Descripcion,
      habitaciones:req.body.habitaciones,
      baños:req.body.baños,
      dormitorios:req.body.dormitorios,
      direccion:req.body.direccion,
      precio:req.body.precio,
      imagen_principal: url ,
      role_id:req.body.category,
      rolee_id:req.body.operacion
    }
,    {
      where: {
        idpropiedad: req.params.id,
      },
    })
      .then(propiedad=>{
              
// Borro imagenes en la base de datos
db.images.destroy({where:{propiedades_id:req.params.id}})

.then( (propiedad)=>{

  // Assync Function created for creating the data about all the images in the database and in cloudinary
  async function UploadImages() {

/* Declaring variables */ 
let results;
let onlineId;
const arrayimage=[];

// Loop for the length of the files uploaded
for(let i = 0; i < req.files.length; i ++ )

{
  // upload the file to cloudinary
  results = await cloudinary.v2.uploader.upload(req.files[i].path)
  onlineId= await results.public_id;//id of file in cloudinary
             
arrayimage.push( 
// Inserting data to the myqsl
db.images.create({
  id:nanoid(),
  path:onlineId,  
  propiedades_id:req.params.id
  })


// If it haves problems inserting data to mysql image table 
    .catch(e=>{
      console.log(e);
      
      res.redirect('/admin/panel')
    })
)

}
// Renderizamos vista de panel de control del admin
res.redirect('/admin/panel')

 // Dirigo a inicio 

}


UploadImages();
})

                  
                    /*En caso de error al crear datos de imagenes lo atrapamos */ 
                    .catch(
                    error=>{
            // Muestro error por consola
            console.log(error);
            
            // Redirigimos a inicio
            res.redirect('/admin/login')
            })
          })



// In case of having an error uploading the property
}catch (error) {
  console.log(error);
                 
  res.redirect('/admin/inicia-sesion')
                }
                
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
