const path = "./data/users.json";
const json_utils = require("../utils/json_utils");

function create(user) {
  const users = json_utils.jsonReader(path);
  user.id = json_utils.generateNextId(users);
  users.push(user);
  json_utils.saveDataToFile(users, path);
  return user.id;
}

function update(id, updatedUser) {
  const users = json_utils.jsonReader(path);
  index = users.findIndex((user) => user.id === id);
  users[index].username = updatedUser.username;
  users[index].name = updatedUser.name;
  users[index].lastName = updatedUser.lastName;
  users[index].dateOfBirth = updatedUser.dateOfBirth;
  users[index].gender = updatedUser.gender;
  users[index].rentalObject = updatedUser.rentalObject;
  users[index].rentals = updatedUser.rentals;
  users[index].pointsNumber = updatedUser.pointsNumber;
  users[index].customerType = updatedUser.customerType;
  users[index].blocked = updatedUser.blocked;
  users[index].rejectedNum = updatedUser.rejectedNum;
  json_utils.saveDataToFile(users, path);
}

function remove(id) {
  const users = json_utils.jsonReader(path);
  index = users.findIndex((user) => user.id === id);
  users.pop(index);
  json_utils.saveDataToFile(users, path);
}

function getAll() {
  return json_utils.jsonReader(path);
}

function getByUsername(username) {
  const users = json_utils.jsonReader(path);
  index = users.findIndex((user) => user.username === username);

  return users[index];
}

function getById(id) {
  const users = json_utils.jsonReader(path);
  index = users.findIndex((user) => user.id === id);

  return users[index];
}
module.exports = { create, update, remove, getAll, getById, getByUsername };
