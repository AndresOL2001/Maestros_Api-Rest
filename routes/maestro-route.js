const {Router} = require('express');
const {check} = require('express-validator');

const { crearMaestro, crearOpinion, borrarMaestro, borrarOpinion,obtenerMaestros} = require('../controllers/maestroController');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');


const router=Router();


router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('materia','La materia es obligatoria').not().isEmpty(),
    validarCampos
],
crearMaestro)

router.delete('/:id',[
    validarJWT,
],
borrarMaestro)

router.put('/opinion/:id',[
    check('opiniones','Las opiniones no pueden estar vacias').not().isEmpty(),
    validarCampos
],
crearOpinion)

router.delete('/opinion/:mid/:id',[
    validarJWT,
    //check('opiniones','Las opiniones no pueden estar vacias').not().isEmpty(),
    validarCampos
],
borrarOpinion)

router.get('/',[
    
],
obtenerMaestros)


module.exports=router;
