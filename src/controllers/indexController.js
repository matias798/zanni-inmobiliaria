const db = require("../database/models");
const { Op } = require("sequelize");


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
res.send(propiedad)
// res.render("create", { categorias: categorias });
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
