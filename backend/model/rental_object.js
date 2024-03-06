class RentalObject {
  constructor(
    id,
    name,
    vehicles,
    workingTime,
    objectStatus,
    locationName,
    logo,
    grade
  ) {
    this.id = id;
    this.name = name;
    this.vehicles = [];
    this.workingTime = workingTime;
    this.objectStatus = objectStatus;
    this.locationName = locationName;
    this.logo = logo;
    this.grade = grade;
  }
}

module.exports = RentalObject;
