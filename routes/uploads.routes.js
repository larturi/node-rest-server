const { Router } = require('express');
const { subirArchivo } = require( '../controllers/uploads.controller' );

const router = Router();

router.post('/', subirArchivo);

module.exports = router;