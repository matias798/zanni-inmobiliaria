const db = require("../database/models");
const { Op, where } = require("sequelize");


let indexController = {

/* indice de productos*/
Indice: function (req, res) {

  // Busco todas las propiedades 
  db.propiedades.findAll(
    {
      // Busco categorias y asociaciones
      include:[{association:"categorias"},{association:"operaciones"}]
    }
  )

.then((propiedad) => {
// res.send(propiedad)
res.json(propiedad)
})

 .catch((error) => {
 // muestro el error por consola
 console.log(error);
 
 // Redirecciono a productos
 res.redirect("/incia-sesion");
    })
},
/* /indice de productos*/




detalle: function (req, res) {

  // Busco todas las propiedades 
  db.propiedades.findOne(
    {where:{idpropiedad:req.params.id}},
    {
      // Busco categorias y asociaciones
      include:[{association:"categorias"},{association:"operaciones"}]
    }
  )

.then((propiedad) => {
  res.json(propiedad)
})

 .catch((error) => {
 // muestro el error por consola
 console.log(error);
 
 // Redirecciono a productos
 res.redirect("/incia-sesion");
    })
},
/* /indice de productos*/



/* Propiedades en alquiler */
alquiler: function (req, res) {

  // Busco todas las propiedades 
  db.propiedades.findAll(
    {where:{rolee_id:2}},
    {
      // Busco categorias y asociaciones
      include:[{association:"categorias"},{association:"operaciones"}]
    }
  )

.then((propiedad) => {
  res.json(propiedad)
})

 .catch((error) => {
 // muestro el error por consola
 console.log(error);
 
 // Redirecciono a productos
 res.redirect("/incia-sesion");
    })
},
/* /Propiedades en alquiler */

/* Propiedades en venta*/
venta: function (req, res) {

  // Busco todas las propiedades 
  db.propiedades.findAll(
    {where:{rolee_id:1}},
    {
      // Busco categorias y asociaciones
      include:[{association:"categorias"},{association:"operaciones"}]
    }
  )

.then((propiedad) => {
  res.json(propiedad)
})

 .catch((error) => {
 // muestro el error por consola
 console.log(error);
 
 // Redirecciono a productos
 res.redirect("/incia-sesion");
    })
},
/* Propiedades en venta*/



}







module.exports = indexController;
