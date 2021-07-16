const {Schema,model} = require('mongoose');

const OpinionSchema = Schema ({
  
    opinion:{
        type:String,
        required:true
    },
    calificacion:{
        type:Number,
        required:true
    },
    estado:{
        type:Boolean,
        required:true,
        default:false
    }

})

const MaestroSchema = Schema ({
    nombre:{
        type:String,
        required:true
    },
    materia:{
        type:String,
        required:true
    },
    opiniones:[OpinionSchema]

})

MaestroSchema.method('toJSON', function() {
    const {__v,_id,...object} = this.toObject();
    object.uid = _id;
    return object;
})

OpinionSchema.method('toJSON', function() {
    const {__v,_id,...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports=model('Maestro',MaestroSchema);
