//importamos expres que nos sirve para crear un servidor web
const express = require("express");
const { getConnection } = require("./db/mongo");
require('dotenv').config(); 
const cors = require("cors");
const app = express();
const port = process.env.PORT;


//Implementamos cors para que las peticiones puedan ser consumidas desde un servidor diferente
app.use(cors())

getConnection();
//Parseo JSON
app.use(express.json());

//realizamos la peticion creando las distintas rutas
app.use("/usuario", require("./router/usuario"));
app.use("/estado-equipo", require("./router/estadoEquipo"));
app.use("/marca", require("./router/marca"));
app.use("/tipo-equipo", require("./router/tipoEquipo"));
app.use("/inventario", require("./router/inventario"));

app.listen(port, () => {
  console.log(`Ejemplo de app ejecutandose en el puerto ${port}`);
});
