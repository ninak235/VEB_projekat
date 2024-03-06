const { forEach } = require("lodash");
const objectRepo = require("../repo/order_repo");
const userService = require("../service/user_service");
const vehicleService = require("../service/vehicle_service");

function create(object) {
  const newObject = {
    uniqueOrderId: object.uniqueOrderId,
    rentalObjectId: object.rentalObjectId,
    rentVehicles: object.rentVehicles,
    dateTime: object.dateTime,
    durationLease: object.durationLease,
    price: object.price,
    buyer: {
      id: object.buyer.id,
      name: object.buyer.name,
      lastName: object.buyer.lastName,
    },
    orderStatus: object.orderStatus,
    isRated: false,
  };
  createdObject = objectRepo.create(newObject);
  console.log("i dalje sve ok");
  userService.addOrder(createdObject);
  return createdObject;
}

function remove(id) {
  const order = getById(id);
  order.orderStatus = "Cancelled";
  //objectRepo.remove(id);
  update(id, order);
  userService.removeOrder(order);
  //vehicleService.makeVehiclesAvailable(order.rentVehicles);
 
}

function getAll() {
  orders = objectRepo.getAll();
  const currentDate = getToday();
  console.log(currentDate);
  orders.forEach((order) => {
    console.log(order.dateTime);
    if(order.dateTime === currentDate){
      order.orderStatus = "Taken";
      update(order.id, order);
      index = orders.findIndex((ord) => ord.id === order.id);
      orders[index] = order;
    }
  })
  return orders;
}

function getToday(){
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(today.getDate()).padStart(2, '0');

  const currentDate = `${year}-${month}-${day}`;
  return currentDate;
}

function getById(id) {
  return objectRepo.getById(id);
}

function getByUser(id){
  console.log("caaaooo");
  const objects = objectRepo.getAll();
  let userObjects = [];
  const userObjIds = userService.getUserObjectsId(id);
  console.log(userObjIds.length);
  objects.forEach((object) => {
    if(object.orderStatus != "Cancelled"){
      userObjIds.forEach((id) => {
        console.log("id: ", id, "object id:", object.id);
          if(id === object.id){
            userObjects.push(object);
          }
      })
    }
  })
  return BindVehicles(userObjects);
}

function update(id, updatedObject) {
  if(updatedObject.orderStatus === "Approved"){ 
    vehicleService.rentVehicles(updatedObject.rentVehicles);
  }
  if(updatedObject.orderStatus === "Returned"){
    vehicleService.makeVehiclesAvailable(updatedObject.rentVehicles);
  }
  objectRepo.update(id, updatedObject);
}


function getAvailableVehichles(dateFrom, dateTo) {
  const orders = BindVehicles(objectRepo.getAll());
  const availableVehcles = [];
  const from = new Date(dateFrom);
  const to = new Date(dateTo);
  orders.forEach((order) => {
    const beginning = new Date(order.dateTime);
    const orderLastDay = addDaysToDate(beginning, order.durationLease);
    console.log("begging: ", beginning, "order last day:", orderLastDay);
    if (orderLastDay < from || beginning > to) {
      console.log("true for ", order.uniqueOrderId);
      availableVehcles.push(...order.rentVehicles);
    }
  });
  return availableVehcles;
}


function addDaysToDate(date, days) {
  const newDate = new Date(date.getTime());
  newDate.setDate(date.getDate() + days);
  return newDate;
}

function getOrdersByRentalId(id) {
  const orders = getAll();
  let rentalOrders = [];
  orders.forEach((ord) => {
    if(ord.rentalObjectId === id){
      rentalOrders.push(ord);
    }
  });
  return BindVehicles(rentalOrders);
}

function BindVehicles(managerOrders) {
  let bindedVehicles = [];
  managerOrders.forEach((order) => {
    order.rentVehicles.forEach((vehicle) => {
      let newVehicle = vehicleService.getAll().find((veh) => veh.id === vehicle.id);
      bindedVehicles.push(newVehicle);
    });
    index = managerOrders.findIndex((ord) => ord.id === order.id);
    managerOrders[index].rentVehicles = bindedVehicles;
    bindedVehicles = [];
  });
  return managerOrders;
}

function getFilteredOrders(id, dateFrom, dateTo, priceFrom, priceTo) {
  const orders = getOrdersByRentalId(id);
  let ordersByDate = [];
  const from = new Date(dateFrom);
  const to = new Date(dateTo);
  orders.forEach((order) => {
    const [day, month, year] = order.dateTime.split('/');
    const beginning = new Date(`${year}-${month}-${day}`);
    const orderLastDay = addDaysToDate(beginning, order.durationLease);
    if ((beginning >= from && orderLastDay <= to) || (beginning >=from && to==="") || (from ==="" && orderLastDay<= to) || (from==="" && to==="")) {
      ordersByDate.push(order);
    }
  });
  
  let ordersPrice = [];
  ordersByDate.forEach((ord) =>{
    if(priceOrderCheck(ord, priceFrom, priceTo))
    {
      ordersPrice.push(ord);
    }
  });
  
  return BindVehicles(ordersPrice);
}

function priceOrderCheck(order, priceFrom, priceTo) {
  if (
    (priceFrom === "" || order.price >= parseInt(priceFrom)) &&
    (priceTo === "" || order.price <= parseInt(priceTo))
  ) {
    return true;
  }
  return false;
}

function getSortedAsc(sortingParam, rentalId) {
  const objects = getOrdersByRentalId(parseInt(rentalId));
  if (sortingParam === "price") {
    objects.sort((a, b) => a.price - b.price);
    return objects;
  } else {
    objects.sort((a, b) => {
      if (a.dateTime < b.dateTime) return -1;
      if (a.dateTime > b.dateTime) return 1;
      return 0;
    });
    return objects;
  }
}

function getSortedDesc(sortingParam, rentalId) {
  const objects = getOrdersByRentalId(parseInt(rentalId));
  if (sortingParam === "price") {
    objects.sort((a, b) => b.price - a.price);
    return objects;
  } else {
    objects.sort((a, b) => {
      if (a.dateTime > b.dateTime) return -1;
      if (a.dateTime < b.dateTime) return 1;
      return 0;
    });
    return objects;
  }
}

module.exports = {
  create,
  remove,
  getAll,
  getById,
  getByUser,
  update,
  getAvailableVehichles,
  getOrdersByRentalId,
  getFilteredOrders,
  getSortedAsc,
  getSortedDesc,
};
