<template>
  <div class="hole-container">
    <div
      v-for="rentalObject in rentalObjects"
      :key="rentalObject.id"
      class="rental-container"
    >
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
            :show-buttons="false"
            :show-buttons1="true"
          ></vehicle-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VehicleCard from "../VehicleCard.vue";
import axios from "axios";

export default {
  components: {
    "vehicle-card": VehicleCard,
  },

  data() {
    return {
      rentalObjects: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/rentalObjects/available"
        );
        this.rentalObjects = response.data;
      } catch (error) {
        console.log("Oops");
      }
    },
  },
};
</script>

<style scoped>
.hole-container {
  display: flex;
  flex-direction: column;
  background-color: black;
  max-height: 100%;
}

.rental-container {
  height: 480px;
  display: flex;
  flex-direction: row;
  gap: 50px;
  margin-top: 20px;
  margin-right: 40px;
  padding-left: 50px;
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

.scroll-container {
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

/* Add any additional styling as needed */
</style>
