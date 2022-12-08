//importamos expres que nos sirve para crear un servidor web
const express = require("express");
const { getConnection } = require("./db/mongo");//Importamos la conexión
require('dotenv').config(); 
const cors = require("cors"); //permite llamados de origenes remotos a la API
const UsuarioRouter = require('./router/usuario');
const autenticarRouter = require('./router/autenticar');
const MarcaRouter = require('./router/marca');
const EstadoRouter = require('./router/estadoEquipo');
const TipoRouter  = require('./router/tipoEquipo');
const InventarioRouter = require('./router/inventario');
const app = express();
const port = process.env.PORT;


//Implementamos cors para que las peticiones puedan ser consumidas desde un servidor diferente
app.use(cors()) 

getConnection();//llamamos la conexión
//Parseo JSON
app.use(express.json());//Manipulamos la api, rutas y rutas

//realizamos la peticion creando las distintas rutas
app.use("/usuario", UsuarioRouter);
app.use('/login', autenticarRouter);
app.use("/estado-equipo", EstadoRouter);
app.use("/marca", MarcaRouter);
app.use("/tipo-equipo", TipoRouter);
app.use("/inventario", InventarioRouter);

//Finalmente levantamos el servidor
app.listen(port, () => {
  console.log(`Ejemplo de app ejecutandose en el puerto ${port}`);
});
 