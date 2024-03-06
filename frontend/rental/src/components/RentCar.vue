<template>
  <div class="one-rent-car">
    <img :src="rentalLogo.logo" class="img-car" />
    <div class="image">
      <div class="row-div">
        <h3 class="car-name">{{ car.name }}</h3>
      </div>
      <div>
        <h3>
          <img src="../assets/pin.png" alt="Pin Icon"  class="img-pin" />
          {{ car.location.address.street + ", " + car.location.address.city }}
        </h3>
      </div>
    </div>
    <div class="bottom">
      <router-link v-bind:to="'/singleObject/' + car.id">
        <h3 class="details">View details</h3>
      </router-link>
      <h3>Grade: {{ car.grade }}</h3>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "RentCar",
  props: ["car"],
  computed: {
    rentalLogo() {
      return {
        ...this.car,
        logo:
          this.car.logo && require(`../assets/${this.car.logo}`),
      };
    }
  },
};
</script>

<style scoped>
.one-rent-car {
  background-color: rgb(237, 195, 122);
  border: peru solid 5px;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background-color 0.3s;
}

.one-rent-car .image {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  background-color: rgb(237, 195, 122);
  transition: background-color 0.3s;
  width: 100%;
  height: 80%;
}

/* Styling for the car name */
.one-rent-car .image .row-div {
  background-color: #fff;
  border-radius: 8px;
  padding: 4px 8px; /* Decrease the height of the row-div */
  margin-bottom: 1px;
  height: 1cm;
}

.one-rent-car .image h3.car-name {
  /* Update class selector to target the car name specifically */
  font-size: 30px; /* Increase the font size of the car name */
  font-weight: bold;
  margin: 10;
  color: black; /* Change text color back to blue */
  transition: color 0.3s; /* Add transition */
}

/* Styling for the car location */
.one-rent-car .image h3:last-child {
  font-size: 18px;
  margin-top: 5px;
}

/* Styling for the car grade */
.one-rent-car .bottom h3 {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}
.one-rent-car .bottom {
  display: flex;
  justify-content: space-between; /* Add spacing between elements */
  align-items: center;
}

.one-rent-car .details::after {
  content: "";
  position: absolute;
  background-color: gray;
  transition: background-color 0.3s;
}

.one-rent-car .details:hover {
  color: black;
}

.one-rent-car .details:hover::after {
  background-color: black;
}

/* Customizing emojis */
.one-rent-car .image h3:last-child::before,
.one-rent-car .bottom h3::before {
  content: "";
  display: inline-block;
  margin-right: 5px;
}

/* Hover effects */
.one-rent-car:hover {
  background-color: rgb(211, 158, 67);
}

.one-rent-car:hover .image {
  background-color: transparent;
}

.one-rent-car:hover .image h3.car-name {
  color: rgb(211, 158, 67); /* Change text color of the car name on hover */
}

.one-rent-car:hover .image {
  cursor: pointer; /* Change cursor style on hover */
}

.one-rent-car .img-car {
  max-width: 30%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 200px;
}

.rent-car-item .image h3 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  text-align: center;
  background-color: transparent;
}

.one-rent-car .image .img-pin {
  margin-bottom: 0px;
  width: 200px;
  max-width: 5%;
}
</style>
