

let adminController = {



/* login de usuario administrador */ 
login: function (req, res) {
    res.render('create');
   },
/* /login de usuario administrador */ 




/* login de usuario administrador */ 
Verificacionlogin: function (req, res) {
    console.log(req.body.titulo);
}

}

module.exports = adminController;
