const { forEach } = require("lodash");
const userRepo = require("../repo/user_repo");
const customerTypeService = require("../service/customerType_service");


function create(user) {
  const id = userRepo.create(user);
  return id;
}

function addOrder(order) {
  const user = getById(order.buyer.id);
  let vehicleIds = [];
  order.rentVehicles.forEach((veh) => {
    vehicleIds.push({ id: veh.id} );
  })
  let rental = {
    id: order.id,
    rentVehicles: vehicleIds,
    rentalObjectId: order.rentalObjectId,
    orderStatus: order.orderStatus,
  };
  user.pointsNumber += (order.price / 1000) * 133;
  console.log("points: ", user.pointsNumber);
  user.customerType = customerTypeService.getTypeByPoints(user.pointsNumber);
  user.rentals.push(rental);
  userRepo.update(user.id, user);

}

function removeOrder(order){
   const user = getById(order.buyer.id);
   console.log("user name: ", user.name);
   let index = user.rentals.findIndex(obj => obj.id === order.id);
   user.rentals[index].orderStatus = order.orderStatus;
  if(user.pointsNumber - order.price/1000*133*4 >= 0){
    user.pointsNumber -= order.price/1000*133*4;
  }
  else{
    user.pointsNumber = 0;
  }
  user.customerType = customerTypeService.getTypeByPoints(user.pointsNumber);
  user.rejectedNum ++;
  userRepo.update(user.id, user);
}

function getSuspisiousCustomers(){
  const users = userRepo.getAll();
  const suspisious = [];

  users.forEach((user) => {
    if(user.rejectedNum > 5 && user.userRole === "Customer"){
      suspisious.push(user);
    }
  });
  console.log(suspisious.length);
  return suspisious;
}

function remove(id) {
  userRepo.remove(id);
}

function getAll() {
  return userRepo.getAll();
}

function getAvailableManagers() {
  const users = userRepo.getAll();
  const availableManagers = [];
  users.forEach((user) => {
    if (user.userRole === "Manager" && user.rentalObject === null) {
      availableManagers.push(user);
    }
  });
  return availableManagers;
}

function getAllCustomers() {
  const customers = [];
  const users = userRepo.getAll();
  users.forEach((user) => {
    if(user.userRole === "Customer")
    {
      customers.push(user);
    }
  });
  return customers;
}

function getCustomersByManagerId(id) {
  const userCustomers = getAllCustomers();
  const userManager = userRepo.getById(id);
  const customersManager = [];
  userCustomers.forEach((user) => {
    user.rentals.forEach((rentObj) => {
      if(rentObj.id === userManager.rentalObject.id){
        customersManager.push(user);
      }
    });
    
  });
  console.log(customersManager.length);
  return customersManager;
}

function getById(id) {
  return userRepo.getById(id);
}

function getByUsername(username) {
  return userRepo.getByUsername(username);
}

function update(id, updatedUser) {
  userRepo.update(id, updatedUser);
}

function getUserObjectsId(userId){
  const user = getById(userId);
  let idS = [];
  user.rentals.forEach((order) => {
    idS.push(order.id);
  })
  return idS;
}

function getFilteredObjects(userRole, nameType) {
  const users = userRepo.getAll();
  let filteredUsers = [];
  users.forEach((obj) => {
    let hasMatchingUsers = false;

    if((userRepo==="" || obj.userRole === userRole) && 
       (nameType==="" || obj.customerType.nameType===nameType))
       {
        hasMatchingUsers = true;
       }

       if (hasMatchingUsers) {
        filteredUsers.push(obj);
      }

  });

  return filteredUsers;
}

function getSortedAsc(sortingParam) {
  const objects = userRepo.getAll();
  console.log(sortingParam);
  if (sortingParam === "name") {
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
  } else if (sortingParam === "lastName") {
    objects.sort((a, b) => {
      const lastNameA = a.lastName.toLowerCase();
      const lastNameB = b.lastName.toLowerCase();

      if (lastNameA < lastNameB) {
        return -1;
      } else if (lastNameA > lastNameB) {
        return 1;
      } else {
        return 0;
      }
    });

    return objects;
  } else if (sortingParam === "userName"){
    objects.sort((a, b) => {
      const userNameA = a.username.toLowerCase();
      const userNameB = b.username.toLowerCase();

      if (userNameA < userNameB) {
        return -1;
      } else if (userNameA > userNameB) {
        return 1;
      } else {
        return 0;
      }
    });

    return objects;
  } else {
    objects.sort((a, b) => a.pointsNumber - b.pointsNumber);
    return objects;
  }
}

function getSortedDesc(sortingParam) {
  const objects = userRepo.getAll();
  if (sortingParam === "name") {
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
  } else if (sortingParam === "lastName") {
    objects.sort((a, b) => {
      const lastNameA = a.lastName.toLowerCase();
      const lastNameB = b.lastName.toLowerCase();

      if (lastNameA > lastNameB) {
        return -1;
      } else if (lastNameA < lastNameB) {
        return 1;
      } else {
        return 0;
      }
    });

    return objects;
  } else if (sortingParam === "userName"){
    objects.sort((a, b) => {
      const userNameA = a.username.toLowerCase();
      const userNameB = b.username.toLowerCase();

      if (userNameA > userNameB) {
        return -1;
      } else if (userNameA < userNameB) {
        return 1;
      } else {
        return 0;
      }
    });

    return objects;
  } else {
    objects.sort((a, b) => b.pointsNumber - a.pointsNumber);
    return objects;
  }
}

module.exports = {
  create,
  remove,
  getAll,
  getById,
  getByUsername,
  addOrder,
  removeOrder,
  update,
  getAvailableManagers,
  getUserObjectsId,
  getCustomersByManagerId,
  getFilteredObjects,
  getSortedAsc,
  getSortedDesc,
  getSuspisiousCustomers,
};
