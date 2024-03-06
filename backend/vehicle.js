class Vehicle{
    constructor(id, brand, price, vehicleType, object, transmissionType, fuelType, consumption,
                doorNumber, personNumber, description, image, vehicleStatus){
                this.id = id;
                this.brand = brand;
                this.price = price;
                this.vehicleType = vehicleType;
                this.object = object;
                this.transmissionType = transmissionType;
                this.fuelType = fuelType;
                this.consumption = consumption;
                this.doorNumber = doorNumber;
                this.personNumber = personNumber;
                this.description = description;
                this.image = image;
                this.vehicleStatus = vehicleStatus;
    }
}

module.exports = Vehicle;