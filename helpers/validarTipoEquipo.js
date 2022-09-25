const validateComputerType = (req) => {
    const validations = [];
    if (!req.body.name) {
      validations.push("El nombre del tipo de equipo requerido");
    }
  
    if (!req.body.status) {
      validations.push("El tipo del equipo es requerido");
    }
  
    
    return validations;
  };
  
  module.exports = {
      validateComputerType,
  }