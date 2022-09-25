const validateUser = (req) => {
    const validations = [];
    if (!req.body.name) {
      validations.push("El nombre requerido");
    }
  
    if (!req.body.email) {
      validations.push("El email requerido");
    }
  
    if (!req.body.status) {
      validations.push("El estado es requerid");
    }
  
    
    return validations;
  };
  
  module.exports = {
      validateUser,
  }