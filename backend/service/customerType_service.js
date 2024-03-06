const objectRepo = require("../repo/customerType_repo");

function create(object) {
  return objectRepo.create(object);
}

function remove(object) {
  objectRepo.remove(object);
}

function getAll() {
  const objects = objectRepo.getAll();
  console.log("pre sort", objects.length);
  objects.sort((a, b) => b.requiredPointNumber - a.requiredPointNumber);
  console.log("posle sort", objects.length);
  return objects;
}

function getBronze() {
  return getAll().find((obj) => obj.nameType === "Bronze");
}

function getSilver(){
    return getAll().find((obj) => obj.nameType === "Silver");
}

function getGold(){
    return getAll().find((obj) => obj.nameType === "Gold");
}

function getTypeByPoints(points){
  console.log("points entered");
  const types = getAll();
  for (const type of types) {
    if (points >= type.requiredPointNumber) {
      return type;
    }
  }
  return {};
}

function update(id, updatedObject) {
  objectRepo.update(id, updatedObject);
}

module.exports = {
  create,
  remove,
  getAll,
  update,
  getBronze,
  getGold,
  getSilver,
  getTypeByPoints,
};
