const path = "./data/locations.json";
const json_utils = require("../utils/json_utils");

function getAll() {
  return json_utils.jsonReader(path);
}

function getById(id) {
  const locations = json_utils.jsonReader(path);
  index = locations.findIndex((location) => location.id === id);

  return locations[index];
}

module.exports = { getAll, getById };
