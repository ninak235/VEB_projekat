class Order {
  constructor(
    id,
    uniqueOrderId,
    rentVehicles,
    rentalObject,
    dateTime,
    durationLease,
    price,
    buyer,
    orderStatus
  ) {
    this.id = id;
    this.uniqueOrderId = uniqueOrderId;
    this.rentVehicles = rentVehicles;
    this.rentalObject = rentalObject;
    this.dateTime = dateTime;
    this.durationLease = durationLease;
    this.price = price;
    this.buyer = buyer;
    this.orderStatus = orderStatus;
  }
}

module.exports = Order;
