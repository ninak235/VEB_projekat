<template>
  <div class="background">
    <div class="form">
      <div v-if="isClicked">
        <label>Object name:</label>
        <input
          type="text"
          v-model="search.objectName"
          placeholder="Object name"
        />
      </div>

      <div v-if="isClicked">
        <label>From price:</label>
        <input class="thinner" type="text" v-model="search.priceFrom" />
        <label>To price:</label>
        <input class="thinner" type="text" v-model="search.priceTo" />
        <button type="submit" class="search-button" @click="priceSearch">
          <img
            src="../../assets/search-2-128.png"
            alt="Loop Icon"
            class="user-icon"
          />
        </button>
      </div>

      <div class="dates">
        <label>Date from:</label>
        <input type="date" v-model="search.dateFrom" />
        <label>Date to:</label>
        <input type="date" v-model="search.dateTo" />
        <button class="buttonType" @click="selectDates">Select</button>
      </div>
    </div>
    <div v-if="isClicked" class="hole-container">
      <div
        v-for="rentalObject in filteredRentalObjects"
        :key="rentalObject.id"
        class="rental-container"
      >
        <div class="horizontal">
          <div class="grid-item-1">
            <div class="flex-item">
              <img
                :src="require(`../../assets/${rentalObject.logo}`)"
                class="car-logo"
              />

              <h2>{{ rentalObject.name }}</h2>

              <router-link v-bind:to="'/singleObject/' + rentalObject.id">
                <h3 class="details">View details</h3>
              </router-link>
            </div>
          </div>
          <div class="scroll-container">
            <div class="grid-item-2">
              <vehicle-card
                v-for="vehicle in rentalObject.vehicles"
                :key="vehicle.id"
                :vehicle="vehicle"
                :rental-car-id="rentalObject.id"
                :isStarted="isStarted"
                :selected-object-id="selectedObjectId"
                :basket-vehicle="basketVehicle"
              ></vehicle-card>
            </div>
          </div>
        </div>
        <div class="buttons_container">
          <button
            class="startB"
            v-on:click.prevent="startingShoping(rentalObject.id)"
          >
            Start renting in this object
          </button>
          <button class="endB" v-on:click.prevent="endedShoping">
            End shopping
          </button>
        </div>
      </div>
    </div>
    <div class="sentence" v-if="!isClicked">
      <h2>First you need to select dates...</h2>
    </div>
  </div>
</template>
<script>
import VehicleCard from "./VehicleCard2.vue";
import axios from "axios";

export default {
  data() {
    return {
      search: {
        objectName: "",
        dateFrom: "",
        dateTo: "",
        priceFrom: "",
        priceTo: "",
      },
      isClicked: false,
      rentalObjects: [],
      vehicles: [],
      isStarted: false,
      selectedObjectId: 0,
      selectedVehicles: [],
      basket: {},
      sum: 0,
    };
  },
  components: {
    "vehicle-card": VehicleCard,
  },
  computed: {
    filteredRentalObjects: function () {
      return this.rentalObjects.filter((object) => {
        return object.name
          .toLowerCase()
          .match(this.search.objectName.toLowerCase());
      });
    },
  },
  mounted() {},
  methods: {
    async getData() {
      try {
        console.log(this.search.dateFrom);
        const response = await axios.get(
          "http://localhost:3000/rentalObjects/available",
          { params: this.search }
        );
        this.rentalObjects = response.data;
        console.log(this.rentalObjects[0].vehicles[0].fuelType);
      } catch (error) {
        console.log("Oops");
      }
    },
    async selectDates() {
      if (this.search.dateFrom && this.search.dateTo) {
        this.isClicked = true;
        this.getData();
      } else {
        alert("Select dates first!");
        return;
      }
    },
    async priceSearch() {
      try {
        const response = await axios.get(
          "http://localhost:3000/rentalObjects/available",
          { params: this.search }
        );
        this.rentalObjects = response.data;
      } catch (error) {
        console.log("Oops");
      }
    },
    async startingShoping(rentalObjectId) {
      this.getData();
      this.isStarted = true;
      this.selectedVehicles = [];
      this.selectedObjectId = rentalObjectId;
    },
    async basketVehicle(vehicleId, rentalCarId) {
      try {
        const response = await axios.get(
          "http://localhost:3000/vehicles/" + vehicleId
        );
        const vehicle = response.data;
        this.selectedVehicles.push(vehicle);
        alert(
          "Vehicle " + vehicle.brand + " " + vehicle.model + " added to basket"
        );
        const object = this.filteredRentalObjects.find(
          (obj) => obj.id === rentalCarId
        );
        object.vehicles = object.vehicles.filter(
          (veh) => veh.id !== vehicle.id
        );
        const index = this.filteredRentalObjects.findIndex(
          (obj) => obj.id === object.id
        );
        this.filteredRentalObjects[index].vehicles = object.vehicles;
      } catch (error) {
        console.log("Failed");
      }
    },
    async endedShoping() {
      this.basket.vehicles = this.selectedVehicles;
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      this.basket.user = user;
      this.selectedVehicles.forEach((vehicle) => {
        this.sum += parseInt(vehicle.price);
      });
      this.basket.price = this.sum;
      this.basket.dateTime = this.search.dateFrom;

      const date1 = new Date(this.search.dateFrom);
      const date2 = new Date(this.search.dateTo);

      const timeDifference = date2.getTime() - date1.getTime();
      this.basket.datesNum = Math.ceil(timeDifference / (1000 * 3600 * 24));
    
      axios
        .post("http://localhost:3000/baskets", this.basket)
        .then((response) => {
          const { message } = response.data;
          alert(message);

          this.$router.push("/basket");
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
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
  flex-direction: column;
  justify-content: space-between;
}

.form {
  margin-left: 5px;
}

label {
  color: #f2c977;
  font-size: 18px;
}

.sentence {
  color: #f2c977;
  margin: auto;
}

.thinner {
  width: 50px;
}

.dates {
  position: absolute;
  right: 15px;
}

.buttonType {
  margin-left: 10px;
  background-color: #f2c977;
  width: 80px;
}

.buttonType:hover {
  background-color: #c7a767;
}

.hole-container {
  display: flex;
  flex-direction: column;
  gap: 50px;
  background-color: black;
  max-height: 100%;
  margin-top: 50px;
}

.rental-container {
  display: flex;
  flex-direction: column;
}

.horizontal {
  height: 320px;
  display: flex;
  flex-direction: row;
  gap: 10px;

  margin-right: 40px;
  padding-left: 50px;
}

.buttons_container {
  display: flex;
  justify-content: center;
}

.startB {
  background-color: #edc37a;
  width: 120px;
  height: 60px;
  font-size: 16px;
  margin-right: 10px;
}

.startB:hover {
  background-color: #cd853f;
}

.endB {
  background-color: #edc37a;
  width: 120px;
  height: 60px;
  font-size: 16px;
}

.endB:hover {
  background-color: #cd853f;
}

.grid-item-1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 140px;
  min-width: 140px;
  padding: 30px;
  background-color: rgb(237, 195, 122);
  border-radius: 10px;
  height: 200px;
}

.grid-item-2 {
  align-self: center;
  display: flex;
  flex-direction: row;
  gap: 10px;
  scroll-behavior: auto;
  height: 280px;
  flex-wrap: nowrap;
}

.user-icon {
  height: 25px;
}

.search-button {
  background-color: transparent;
  border: transparent;
}

.search-button:hover {
  background-color: darkgrey;
}

.scroll-container {
  margin-bottom: 30px;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: thin; /* Promenite na "thin" za tanji scroll bar */
  scrollbar-color: #f2c977 #edc37a; /* Promenite boje scroll bara */
}

.scroll-container::-webkit-scrollbar {
  width: 8px; /* Promenite na željenu debljinu scroll bara */
}

.scroll-container::-webkit-scrollbar-track {
  background-color: #edc37a; /* Promenite boju pozadine scroll bara */
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #cd853f; /* Promenite boju thumb-a (pokazivača) scroll bara */
}

.grid-item-2 .vehicle-card {
  padding: 20px;
  border: 6px solid #cd853f;
  background-color: #edc37a;
  border-radius: 10px;
  min-width: 380px;
  max-width: 380px;
  flex-shrink: 0;
}

.grid-item-1 h2 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  text-decoration: underline;
  color: peru;
}

.car-logo {
  width: 150px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
  margin: auto;
}

.grid-item-1 h3 {
  margin-bottom: 0px;
  text-align: center;
  font-size: 10px;
  text-decoration: underline;
}

.grid-item-1 .flex-item .details {
  font-size: 12px;
}

.buttons:hover {
  background-color: black;
}

.flex-item .img-pin {
  margin-bottom: 0px;
  width: 30px;
  max-width: 7%;
}

.buttons {
  margin-top: 20px;
  margin-right: 20px;
  padding: 12px 16px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: peru;
  border: none;
  cursor: pointer;
  text-align: center;
}
</style>
