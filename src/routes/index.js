var express = require('express');
var router = express.Router();
let indexController= require('../controllers/indexController');


/* indice de productos*/
router.get('/', indexController.Indice);
/* indice de productos*/



module.exports = router;
