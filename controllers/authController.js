const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const {generarJWT} = require('../helpers/generarJWT');

const login = async(req,res=response) => {

    const {usuario,password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({usuario});

        if(!usuarioDB){
            return res.status(404).json({
                msg:'Usuario no valido'
            })
        }

        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(password,usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Password no valida'
            })
        }

        //Generamos un token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            msg:'Iniciado Sesion correctamente',
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

const register = async(req,res) => {
    const { usuario, password } = req.body;

    try {
  
      const existeUsuario = await Usuario.findOne({ usuario });
      if (existeUsuario) {
        return res.status(400).json({
          ok: false,
          msg: 'El usuario ya esta registrado'
        })
      }
  
      const usuarioDB = new Usuario(req.body);
      
      console.log(usuarioDB);
      //Encriptamos contraseña
      const salt = bcryptjs.genSaltSync();
      usuarioDB.password = bcryptjs.hashSync(password, salt);
  
      const token = await generarJWT(usuarioDB.uid);
  
      await usuarioDB.save();
  
      res.json({
        ok: "Usuario creado correctamente",
        usuarioDB,
        token
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error inesperado hablar con administrador",
      });
    }
}


module.exports = {
    login,
    register
}