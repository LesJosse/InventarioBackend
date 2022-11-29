const mongoose = require("mongoose");
//Un modulo que se encarga de gestionar la conexión a la bd
const getConnection = async () => {
  try {
    const url =
      "mongodb://admin_Jose:1234pass@ac-gobqxlm-shard-00-00.web0nrd.mongodb.net:27017,ac-gobqxlm-shard-00-01.web0nrd.mongodb.net:27017,ac-gobqxlm-shard-00-02.web0nrd.mongodb.net:27017/inventarios-app?ssl=true&replicaSet=atlas-p0vq1z-shard-0&authSource=admin&retryWrites=true&w=majority";
    await mongoose.connect(url);
    //si todo funciona bien, se imprime
    console.log("Conexión exitosa");
  } catch (err) {
    //si hay error, se imprime
    console.log(err);
  }
};
//importamos la funcion asyncrona de la conexion y las demás
module.exports ={
    getConnection,

}