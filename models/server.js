const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    //Inicializacion de nuestro servidor con nuestro puerto
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths={
            maestros:'/api/maestros',
            auth:'/api/auth',
        }
        //Conexion a base de datos
        dbConnection();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    //Meotodo para escuchar el servidor
    listen(){
        this.app.listen(this.port,() => {
            console.log('Servidor escuchando en el puerto '+ this.port || '3000');
        })
    }

    //Rutas del rest api
    routes(){
        this.app.use(this.paths.maestros,require('../routes/maestro-route'));
        this.app.use(this.paths.auth,require('../routes/auth-route'));

    }

    middlewares(){
        //Configuración cors
        this.app.use(cors());

        //Parseo JSON
        this.app.use(express.json());
    }

}

module.exports=Server;