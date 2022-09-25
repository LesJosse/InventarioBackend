const validateBrand = (req) => {
    const validations = [];
    if (!req.body.name) {
      validations.push("El nombre de la marca requerido");
    }
  
    if (!req.body.status) {
      validations.push("El estado de la marca es requerido");
    }
  
    
    return validations;
  };
  
  module.exports = {
      validateBrand,
  }