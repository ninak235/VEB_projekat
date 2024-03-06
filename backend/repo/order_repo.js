const path = "./data/orders.json";
const json_utils = require("../utils/json_utils");

function create(object) {
  const orders = json_utils.jsonReader(path);
  object.id = json_utils.generateNextId(orders);
  orders.push(object);
  json_utils.saveDataToFile(orders, path);
  return object;
}

function update(id, updatedObject) {
  const orders = json_utils.jsonReader(path);
  index = orders.findIndex((object) => object.id === id);
  orders[index] = updatedObject;
  json_utils.saveDataToFile(orders, path);
}

function remove(id) {
  const orders = json_utils.jsonReader(path);
  index = orders.findIndex((object) => object.id === id);
  orders.pop(index);
  json_utils.saveDataToFile(orders, path);
}

function getAll() {
  return json_utils.jsonReader(path);
}

function getById(id) {
    const orders = json_utils.jsonReader(path);
    index = orders.findIndex((object) => object.id === id);
    return orders[index];
  }

module.exports = { create, update, remove, getAll, getById };