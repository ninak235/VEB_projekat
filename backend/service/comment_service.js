const objectRepo = require("../repo/comment_repo");
const orderService = require("./order_service");

function create(object) {
  return objectRepo.create(object);
}

function remove(object) {
  objectRepo.remove(object);
}

function getByRentalId(id) {
  const comments = objectRepo.getAll();
  const rentalComments = [];

  comments.forEach((com) => {
    if(com.rentalObjectId ===id){
      rentalComments.push(com);
    }
  });

  return rentalComments;

}

function getAcceptedByRentalId(id){
  const comments = objectRepo.getAll();
  const rentalComments = [];
  comments.forEach((com) => {
        if(com.rentalObjectId ===id && com.managerApproved===true){
          rentalComments.push(com);
        }
      }
  );

  return rentalComments;
    }
function getUnapprovedByObjectId(id){
  console.log("svi: ", objectRepo.getAll().length);

  console.log("broj unapproved: ", objectRepo.getAll().filter((object) => object.rentalObjectId === id && !object.managerApproved).length)
  return objectRepo.getAll().filter((object) => object.rentalObjectId === id && !object.managerApproved);
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
  getByRentalId,
  update,
  getAcceptedByRentalId,
  getUnapprovedByObjectId,
};
