const path = "./data/vehicles.json";
const json_utils = require("../utils/json_utils");

function create(vehicle) {
  const vehicles = json_utils.jsonReader(path);
  vehicle.id = json_utils.generateNextId(vehicles);
  vehicles.push(vehicle);
  json_utils.saveDataToFile(vehicles, path);
  return vehicle;
}

function update(id, updatedVehicle) {
    const vehicles = json_utils.jsonReader(path);
    index = vehicles.findIndex((object) => object.id === id);
    vehicles[index].brand = updatedVehicle.brand;
    vehicles[index].model = updatedVehicle.model;
    vehicles[index].price= updatedVehicle.price;
    vehicles[index].vehicleType=updatedVehicle.vehicleType;
    vehicles[index].transmissionType= updatedVehicle.transmissionType;
    vehicles[index].fuelType = updatedVehicle.fuelType;
    vehicles[index].consumption = updatedVehicle.consumption;
    vehicles[index].doorNumber= updatedVehicle.doorNumber;
    vehicles[index].personNumber= updatedVehicle.personNumber;
    vehicles[index].description= updatedVehicle.description;
    vehicles[index].image = updatedVehicle.image;
    vehicles[index].vehicleStatus = updatedVehicle.vehicleStatus;
    json_utils.saveDataToFile(vehicles, path);
    return vehicles[index];
}

function remove(id) {
  const vehicles = json_utils.jsonReader(path);
  const index = vehicles.findIndex((object) => object.id === id);
  if (index !== -1) {
    vehicles.splice(index, 1);
    json_utils.saveDataToFile(vehicles, path);
  }
}


function getAll() {
  return json_utils.jsonReader(path);
}


function getById(id) {
  const vehicles = json_utils.jsonReader(path);
  index = vehicles.findIndex((object) => object.id === id);
  return vehicles[index];
}
module.exports = { create, update, remove, getAll, getById };