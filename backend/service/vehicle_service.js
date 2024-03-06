const vehicleRepo = require("../repo/vehicle_repo");

function create(vehicle) {
  const savedVehicle = vehicleRepo.create(vehicle);
  return savedVehicle;
}

function remove(id) {
  vehicleRepo.remove(id);
  return id;
}
function getAll() {
  return vehicleRepo.getAll();
}

function rentVehicles(vehicles){
  vehicles.forEach((vehicle) => {
    vehicle.vehicleStatus = "Rented";
    update(vehicle.id, vehicle);
  })
}

function makeVehiclesAvailable(vehicles){
  vehicles.forEach((vehicle) =>{
    vehicle.vehicleStatus = "Available";
    update(vehicle.id, vehicle);
  })
}

function getById(id) {
  return vehicleRepo.getById(id);
}

function update(id, updatedVehicle) {
  const savedVehicle = vehicleRepo.update(id, updatedVehicle);
  return savedVehicle;
}
module.exports = { create, getAll, getById, update, remove, rentVehicles, makeVehiclesAvailable };