const objectRepo = require("../repo/basket_repo");

function create(object) {
  return objectRepo.create(object);
}

function remove(object) {
  objectRepo.remove(object);
}

function getByUserId(id) {
  return objectRepo.getAll().find((object) => object.user.id === id);
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

module.exports = {
  create,
  remove,
  getAll,
  getById,
  getByUserId,
  update,
};
