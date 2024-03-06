const { forEach } = require("lodash");
const objectRepo = require("../repo/rental_object_repo");
const orderService = require("./order_service");
const vehicleService = require("./vehicle_service");

function create(object) {
  const newObject = {
    name: object.name,
    vehicles: [],
    workingTime: object.workStart + "h-" + object.workEnd + "h",
    objectStatus: "Working",
    location: object.selectedLocation,
    logo: object.logoPath,
    grade: 10,
    id: 0,
  };
  return objectRepo.create(newObject); 
}

function gradeAdded(id, grade){
   let object = objectRepo.getById(id);
   console.log("object grade:", object.grade);
   console.log("grade:", grade)
   let sum = object.grade * object.gradeNum + grade;
   console.log("sum", sum);
   object.gradeNum += 1;
   object.grade = sum / object.gradeNum;
   update(id, object);
}

function vehicleAdded(id, vehicle){
  let newVehicle = vehicleService.create(vehicle);
  const rentalCar = objectRepo.getById(id);
  rentalCar.vehicles.push(newVehicle);
  update(id, rentalCar);
}

function vehicleUpdated(vehicleId,carId,updatedData){
  let updatedVehicle = vehicleService.update(vehicleId, updatedData);
  const rentalCar = objectRepo.getById(carId);
  let index = -1;

  for (let i = 0; i < rentalCar.vehicles.length; i++) {
    if (rentalCar.vehicles[i].id === vehicleId) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    rentalCar.vehicles[index] = updatedVehicle;
    objectRepo.update(carId, rentalCar);
  }
}

function removeVehicle(vehicleId, carId){
     vehicleService.remove(vehicleId);
     const rentalCar = objectRepo.getById(carId);
     let index = -1;
     for (let i = 0; i < rentalCar.vehicles.length; i++) {
      
       if (rentalCar.vehicles[i].id === vehicleId) {
         index = i;
         break;
       }
     }
     if (index !== -1) {
       rentalCar.vehicles.splice(index, 1);
       objectRepo.update(carId, rentalCar);
     }

}

function remove(object) {
  objectRepo.remove(object);
}

function getAll() {
  return objectRepo.getAll();
}

function getById(id) {
  return objectRepo.getById(id);
}

function update(id, updatedObject) {
  objectRepo.update(id, updatedObject);
}

function getAvailable(dateFrom, dateTo, priceFrom, priceTo) {
  let objects = objectRepo.getAll();
  console.log("before binding");
  const bindedObjects = BindVehicles(objects);
  console.log("after binding");
  const willBeAvailable = orderService.getAvailableVehichles(dateFrom, dateTo);
  console.log("will be: ", willBeAvailable.length);
  const availableObjects = [];

  bindedObjects.forEach((object) => {
    const availableVehcles = [];
    object.vehicles.forEach((vehicle) => {
      if (
        vehicle.vehicleStatus === "Available" &&
        priceCheck(vehicle, priceFrom, priceTo)
      ) {
        availableVehcles.push(vehicle);
      }
    });
    willBeAvailable.forEach((newVehicle) => {
      console.log("price of new vehicle:", newVehicle.price);
      console.log("new veh object", newVehicle.object, "object id", object.id);
      if (
        newVehicle.object == object.id &&
        priceCheck(newVehicle, priceFrom, priceTo)
      ) {
        availableVehcles.push(newVehicle);
      }
    });
    if (availableVehcles.length != 0) {
      object.vehicles = availableVehcles;
      availableObjects.push(object);
    }
  });

  return availableObjects;
}

function BindVehicles(availableObjects) {
  console.log("uslo u bind");
  let bindedVehicles = [];
  let bindedObjects = [];
  availableObjects.forEach((object) => {
    object.vehicles.forEach((vehicle) => {
      bindedVehicles.push(
        vehicleService
          .getAll()
          .find((newVehicle) => newVehicle.id === vehicle.id)
      );
    });
    object.vehicles = bindedVehicles;
    bindedVehicles = [];
    bindedObjects.push(object);
  });
  return bindedObjects;
}

function priceCheck(vehicle, priceFrom, priceTo) {
  if (
    (priceFrom === "" || vehicle.price >= parseInt(priceFrom)) &&
    (priceTo === "" || vehicle.price <= parseInt(priceTo))
  ) {
    return true;
  }
  return false;
}

function getSearchedObjects(name, vehichleType, locationName, grade) {
  const objects = objectRepo.getAll();
  let sortedObjects = [];

  objects.forEach((obj) => {
    if (
      (name === "" || obj.name === name) &&
      (vehichleType === "" || obj.vehicleType === vehicleType) &&
      (locationName === "" ||
        obj.locationName.toLowerCase().includes(locationName.toLowerCase())) &&
      (grade === "" || obj.grade === parseFloat(grade))
    ) {
      sortedObjects.push(obj);
    }
  });
  return sortedObjects;
}

function getFilteredObjects(transmissionType, fuelType) {
  const objects = objectRepo.getAll();
  let filteredObjects = [];

  objects.forEach((obj) => {
    let hasMatchingVehicle = false;

    if (obj.vehicles !== null) {
      obj.vehicles.forEach((veh) => {
        if (
          (transmissionType === "" || veh.transmissionType === transmissionType) &&
          (fuelType === "" || veh.fuelType === fuelType)
        ) {
          hasMatchingVehicle = true;
        }
      });
    }

    if (hasMatchingVehicle) {
      filteredObjects.push(obj);
    }
  });

  return filteredObjects;
}

function getSortedAsc(sortingParam) {
  const objects = objectRepo.getAll();
  if (sortingParam === "grade") {
    objects.sort((a, b) => a.grade - b.grade);
    return objects;
  } else if (sortingParam === "location") {
    objects.sort((a, b) => {
      const locationA = a.location.address.city.toLowerCase();
      const locationB = b.location.address.city.toLowerCase();

      if (locationA < locationB) {
        return -1;
      } else if (locationA > locationB) {
        return 1;
      } else {
        return 0;
      }
    });

    return objects;
  } else {
    objects.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });

    return objects;
  }
}

function getSortedDesc(sortingParam) {
  const objects = objectRepo.getAll();
  if (sortingParam === "grade") {
    objects.sort((a, b) => b.grade - a.grade);
    return objects;
  } else if (sortingParam === "location") {
    objects.sort((a, b) => {
      const locationA = a.location.address.city.toLowerCase();
      const locationB = b.location.address.city.toLowerCase();

      if (locationA > locationB) {
        return -1;
      } else if (locationA < locationB) {
        return 1;
      } else {
        return 0;
      }
    });

    return objects;
  } else {
    objects.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA > nameB) {
        return -1;
      } else if (nameA < nameB) {
        return 1;
      } else {
        return 0;
      }
    });

    return objects;
  }
}

function getSortedCars() {
  const cars = objectRepo.getAll();

  const WorkStatus = {
    ON: "Opened",
    OFF: "Closed",
  };

  const sortedCars = cars.sort((a, b) => {
    // Checking if both cars are in the enum as "Working"
    const isAWorking = a.objectStatus === WorkStatus.ON;
    const isBWorking = b.objectStatus === WorkStatus.ON;

    // Sorting logic
    if (isAWorking && !isBWorking) {
      return -1; // a comes before b
    } else if (!isAWorking && isBWorking) {
      return 1; // b comes before a
    } else {
      return 0; // the order remains the same
    }
  });

  return sortedCars;
}



module.exports = {
  create,
  remove,
  getAll,
  getById,
  update,
  getSortedCars,
  getSearchedObjects,
  getFilteredObjects,
  getSortedAsc,
  getSortedDesc,
  getAvailable,
  vehicleAdded,
  vehicleUpdated,
  removeVehicle,
  gradeAdded
};
