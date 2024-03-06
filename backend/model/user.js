class User {
  constructor(
    id,
    username,
    password,
    name,
    lastName,
    gender,
    dateOfBirth,
    userRole,
    rentals,
    basket,
    rentalObject,
    pointsNumber,
    customerType,
    userIcon,
    blocked,
   rejectedNum
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.userRole = userRole;
    this.rentals = rentals;
    this.basket = basket;
    this.rentalObject = rentalObject;
    this.pointsNumber = pointsNumber;
    this.customerType = customerType;
    this.userIcon = userIcon;
    this.blocked = blocked;
    this.rejectedNum= rejectedNum;
  }
}

module.exports = User;
