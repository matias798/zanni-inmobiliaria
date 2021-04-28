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
res.send(propiedad)
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
  res.send(propiedad)
})

 .catch((error) => {
 // muestro el error por consola
 console.log(error);
 
 // Redirecciono a productos
 res.redirect("/incia-sesion");
    })
}
/* /indice de productos*/


}







module.exports = indexController;
