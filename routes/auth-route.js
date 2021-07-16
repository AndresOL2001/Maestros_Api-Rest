const {Router} = require('express');
const { validarCampos } = require('../middlewares/validarCampos');
const {check} = require('express-validator');
const { login, register } = require('../controllers/authController');

const router=Router();

router.post('/login',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],
login)

router.post('/register',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],
register)

module.exports=router;
