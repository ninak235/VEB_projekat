const path = "./data/rental_objects.json";
const json_utils = require("../utils/json_utils");

function create(object) {
  const rental_objects = json_utils.jsonReader(path);
  object.id = json_utils.generateNextId(rental_objects);
  rental_objects.push(object);
  json_utils.saveDataToFile(rental_objects, path);
  return object;
}

function update(id, updatedObject) {
  const rental_objects = json_utils.jsonReader(path);
  index = rental_objects.findIndex((object) => object.id === id);
  console.log("6");
  rental_objects[index] = updatedObject;
  json_utils.saveDataToFile(rental_objects, path);
}

function remove(id) {
  const rental_objects = json_utils.jsonReader(path);
  index = rental_objects.findIndex((object) => object.id === id);
  rental_objects.pop(index);
  json_utils.saveDataToFile(rental_objects, path);
}

function getAll() {
  return json_utils.jsonReader(path);
}

function getById(id) {
    const rental_objects = json_utils.jsonReader(path);
    index = rental_objects.findIndex((object) => object.id === id);
    return rental_objects[index];
  }

module.exports = { create, update, remove, getAll, getById };
