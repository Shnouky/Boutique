const express = require('express');
const router = express.Router();
const controller = require('../controllers/sneaker');


//Definit des routes
router.get('/sneakers', controller.getSneakers)

router.get('/sneaker/:id', controller.getSneaker)

//router.post('./sneaker', controller.addSneaker)
//
//router.delete('./sneaker/:id', controller.deleteSneaker)

module.exports = router;