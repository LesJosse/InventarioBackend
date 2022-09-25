const validateInventory = (req) => {
  const validations = [];
  if (!req.body.serial) {
    validations.push("El serial requerido");
  }

  if (!req.body.model) {
    validations.push("El modelo requerido");
  }

  if (!req.body.description) {
    validations.push("La descripcion es requerida");
  }

  if (!req.body.photoComputer) {
    validations.push("La foto es requerido");
  }

  if (!req.body.color) {
    validations.push("El color es requerido");
  }

  if (!req.body.datePurchase) {
    validations.push("La fecha de compra es requerida");
  }

  if (!req.body.price) {
    validations.push("El precio es requerido");
  }

  if (!req.body.userCharge) {
    validations.push("El usuario es requerido");
  }

  if (!req.body.brand) {
    validations.push("La marca es requerida");
  }

  if (!req.body.computerStatus) {
    validations.push("El estado de equipo es requerido");
  }

  if (!req.body.computerType) {
    validations.push("El tipo de eequipo es requerido");
  }
  return validations;
};

module.exports = {
    validateInventory,
}
