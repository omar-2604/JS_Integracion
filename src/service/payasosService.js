// src/payasoService.js
const db = require("../repository/payasosRepository");

async function registerPayaso(name, email ,arma) {
  if (!name || !email) {
    throw new Error("El nombre y el email son obligatorios");
  }

  // 1. Verificamos en la base de datos si el email ya existe
  const existingPayaso = await db.findPayasoByEmail(email);
  const existingPayasoByName = await db.findPayasoByName(name);

  if (existingPayaso) {
    throw new Error("El payaso ya está registrado con ese email");
  }else if(existingPayasoByName){
    throw new Error("El payaso ya está registrado con ese nombre");
  }

  // 2. Si no existe, lo guardamos en la base de datos
  const newPayaso = await db.savePayaso({ name, email , arma});

  return newPayaso;
}
async function getAllPayasos() {
  return await db.findAllPayasos();
}
async function getPayasoById(id) {
  const payaso = await db.findPayasoById(id);
  
  if (!payaso) {
    throw new Error(`No se encontró el payaso con el ID: ${id}`);
  }
  
  return payaso;
}
async function updatePayaso(id, data) {
  const exists = await db.findPayasoById(id);
  if (!exists) throw new Error("Payaso no encontrado");
  return await db.updatePayaso(id, data);
}

async function deletePayaso(id) {
  const exists = await db.findPayasoById(id);
  if (!exists) throw new Error("Payaso no encontrado");
  return await db.deletePayaso(id);
}

module.exports = { 
  registerPayaso, 
  getAllPayasos, 
  getPayasoById,
  deletePayaso,
  updatePayaso
};