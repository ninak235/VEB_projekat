const locRepo = require("../repo/location_repo");

function getAll() {
  return locRepo.getAll();
}

function getById(id) {
  return locRepo.getById(id);
}

module.exports = {
  getAll,
  getById,
};
