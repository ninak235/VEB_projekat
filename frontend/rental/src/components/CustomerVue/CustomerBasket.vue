<template>
  <div class="background">
    <div class="vertical">
      <div class="scroll-container">
        <div class="grid-item-2">
          <vehicle-card
            v-for="vehicle in vehicles"
            :key="vehicle.id"
            :vehicle="vehicle"
            :isBasket="isBasket"
            @car-added="added"
            @car-deleted="removed"
            :delete-from-basket="deleteFromBasket"
          >
          </vehicle-card>
        </div>
      </div>
    </div>
     <div v-if="totalSum2 != 0" class="centerIt">
      <div>
      <label class="textSum2">old price: </label>
      <label class="valueSum">{{ totalSum }}</label>
      </div>
      <div>
        <label class="textSum">with discount: </label>
        <label class="valueSum2">{{ totalSum2 }}</label>
      </div>
      <div>
        <button type="submit" class="rentButton" @click="rentCars">RENT</button>
       </div>
    </div>
  <div v-else>
    <label class="textSum">Total sum: </label>
    <label class="valueSum2">{{ totalSum }}</label>
    <div>
        <button type="submit" class="rentButton" @click="rentCars">RENT</button>
    </div>
  </div>
  </div>
</template>

<script>
import VehicleCard from "./VehicleCard2.vue";
import axios from "axios";

export default {
  data() {
    return {
      vehicles: [],
      basket: [],
      isBasket: true,
      totalSum: 0,
      totalSum2: 0,
      order: {
        uniqueOrderId: "",
        rentVehicles: [],
        rentalObject: null,
        dateTime: "",
        durationLease: 0,
        price: 0,
        buyer: null,
        orderStatus: "",
      },
      user: null,
    };
  },
  components: {
    "vehicle-card": VehicleCard,
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const token = localStorage.getItem("token");
        const response1 = await axios.get("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response1.data;
        const response = await axios.get(
          "http://localhost:3000/baskets/" + this.user.id
        );
        this.basket = response.data;
        this.vehicles = this.basket.vehicles.map((vehicle) => ({
          ...vehicle,
          quantity: 1, // Initialize the quantity to 0
        }));
        this.totalSum = parseInt(this.basket.price);
        if(this.user.customerType.nameType !== null){
          this.totalSum2 = (100-this.user.customerType.discount)/100 * parseInt(this.basket.price);
        }

      } catch (error) {
        console.log("Oops");
      }
    },
    async added(vehicle) {
      const addedVehicle = this.vehicles.find((obj) => obj.id === vehicle.id);
      addedVehicle.quantity++;
      this.totalSum += parseInt(vehicle.price);
      if(this.user.customerType.nameType !== null){
          this.totalSum2 = (100-this.user.customerType.discount)/100 * parseInt(this.totalSum);
      }

    },
    async removed(vehicle) {
      const removedVehicle = this.vehicles.find((obj) => obj.id === vehicle.id);
      if (removedVehicle.quantity - 1 > 0) {
        removedVehicle.quantity--;
        this.totalSum -= parseInt(vehicle.price);
        if(this.user.customerType.nameType !== null){
          this.totalSum2 = (100-this.user.customerType.discount)/100 * parseInt(this.totalSum);
        }
      } else {
        alert("You can't have less of 1 vehicle");
      }
    },
    async rentCars() {
      this.order.uniqueOrderId = this.generateRandomString();
      this.order.rentVehicles = this.vehicles;
      this.order.rentalObjectId = parseInt(this.vehicles[0].object);
      this.order.dateTime = this.basket.dateTime;
      this.order.durationLease = this.basket.datesNum;
       if(this.totalSum2 != 0){
        this.order.price = this.totalSum2;
      }
      else{
        this.order.price = this.totalSum;
      }

      this.order.buyer = this.basket.user;
      this.order.orderStatus = "Processing";
      
      axios
        .post("http://localhost:3000/orders", this.order)
        .then((response) => {
          const { message } = response.data;
          alert(message);

          this.$router.push("/userOrders");
        })
        .catch((error) => {
          alert(error.response.data.error);
        });

      axios
        .delete("http://localhost:3000/baskets/" + this.basket.id)
        .catch((error) => {
          alert(error.response.data.error);
        })

    },
    generateRandomString() {
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";

      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset.charAt(randomIndex);
      }
      return result;
    },
    deleteFromBasket(vehicle) {
      const confirmation = confirm(
        "Are you sure you want to remove the vehicle from the basket?"
      );

      if (confirmation) {
        this.vehicles = this.vehicles.filter((veh) => veh.id !== vehicle.id);
        this.totalSum -= vehicle.price * vehicle.quantity;
      }
    },
  },
};
</script>

<style scoped>
.background {
  background-color: black;
  min-height: 480px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.textSum {
  text-decoration: underline;
  font-weight: bold;
  font-size: 20px;
}

.textSum2 {
  font-size: 18px;
}

.valueSum {
  font-weight: bold;
  font-size: 22px;
  text-decoration: 2px red line-through;
}

.valueSum2{
  font-weight: bold;
  font-size: 22px;
}

.rentButton {
  background-color: #edc37a;
  border: transparent;
  margin-top: 30px;
  margin-left: 13px;
  height: 40px;
  width: 100px;
  font-weight: bold;
  font-size: 16px;
}

.rentButton:hover {
  background-color: #cd853f;
}

label {
  color: #f2c977;
  font-size: 18px;
}

.grid-item-2 .vehicle-card {
  padding: 20px;
  border: 6px solid #cd853f;
  background-color: #edc37a;
  border-radius: 10px;
  min-width: 50px;
  max-width: 320px;
  max-height: 200px;
  flex-shrink: 0;
}

.centerIt{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scroll-container {
  margin-left: 30px;
}
</style>
