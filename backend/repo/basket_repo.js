const path = "./data/baskets.json";
const json_utils = require("../utils/json_utils");

function create(object) {
  const baskets = json_utils.jsonReader(path);
  object.id = json_utils.generateNextId(baskets);

  baskets.push(object);
  json_utils.saveDataToFile(baskets, path);
}

function update(id, updatedObject) {
  const baskets = json_utils.jsonReader(path);
  index = baskets.findIndex((object) => object.id === id);
  baskets[index] = updatedObject;
  json_utils.saveDataToFile(baskets, path);
}

function remove(id) {
  const baskets = json_utils.jsonReader(path);
  index = baskets.findIndex((object) => object.id === id);
  baskets.pop(index);
  json_utils.saveDataToFile(baskets, path);
}

function getAll() {
  return json_utils.jsonReader(path);
}

function getById(id) {
  const baskets = json_utils.jsonReader(path);
  index = baskets.findIndex((object) => object.id === id);
  return baskets[index];
}

module.exports = { create, update, remove, getAll, getById };
