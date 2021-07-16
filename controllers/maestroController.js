const { response } = require("express");
const Maestro = require("../models/maestro");

const crearMaestro = async(req,res=response ) => {
    
    try {
        const {nombre,materia} = req.body;

        const maestro = new Maestro({nombre,materia});

        const [existeNombre,existeMateria] = await Promise.all([
             Maestro.find({nombre}),
             Maestro.find({materia}),
        ]) 
        
        if(existeNombre.length!==0 && existeMateria.length!==0){
            return res.status(400).json({
                msg:"Error maestro con nombre y materias existentes"
            })
        }
        
        await maestro.save();

        res.status(200).json({
            msg:"Maestro creado correctamente",
            maestro
        })

    } catch (error) {
        console.log(error),
        res.status(400).json({
            msg:"Error inesperado hable con el admin"
        })
    }

}

const borrarMaestro = async(req,res=response) => {
    const uid = req.params.id;

  try {

    const maestroDB = await Maestro.findById(uid);

    if (!maestroDB) {
      return res.status(404).json({
        msg: 'no existe un maestro con ese id'
      })
    }


    const maestroEliminado = await Maestro.findByIdAndDelete(uid);

    res.json({
      msg:"Maestro eliminado correctamente",
      maestro:maestroEliminado
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}

const crearOpinion = async(req,res=response ) => {
    
    try {
        const id = req.params.id;
        
        const opinionesAgregar = req.body.opiniones;

        const maestroEncontrado = await Maestro.findById(id);

        console.log(maestroEncontrado);
        
        if(!maestroEncontrado){
            return res.status(400).json({
                msg:"No existe un maestro con ese id"
            })
        }


        const maestro = await Maestro.findByIdAndUpdate(id,{$push:{'opiniones':opinionesAgregar}},{new:true});
        
        res.json({
            msg:"Maestro modificado correctamente",
            maestro
        })

    } catch (error) {
        console.log(error),
        res.status(400).json({
            msg:"Error inesperado hable con el admin"
        })
    }

}

const borrarOpinion = async(req,res) => {
    const uid = req.params.id;
    const mid = req.params.mid;

    try {
  
     await Maestro.updateOne({_id:mid},{$pull:{'opiniones':{_id:uid}}});

      res.json({
        msg:"opinion eliminada correctamente",
      })
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Hable con el administrador'
      })
    }
}

const obtenerMaestros = async(req,res) => {

 const resultados =await Maestro.find();
  //console.log(resultados);


 if(resultados.length===0){
   return res.json({
     msg:"Sin opiniones que mostrar"
   })
 }

  res.json({
    resultados
  });

}


module.exports={
    crearMaestro,
    crearOpinion,
    borrarMaestro,
    borrarOpinion,
    obtenerMaestros,
 
}