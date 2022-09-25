const validateComputerStatus = (req) => {
    const validations = [];
    if (!req.body.name) {
      validations.push("El nombre del estado de equipo requerido");
    }
  
    if (!req.body.status) {
      validations.push("El estado del equipo es requerido");
    }
  
    
    return validations;
  };
  
  module.exports = {
      validateComputerStatus,
  }