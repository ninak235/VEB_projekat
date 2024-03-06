<template>
  <div class="vehicle-card">
    <div class="grid-item-2-1">
      <h2 class="title">{{ vehicle.brand }} {{ vehicle.model }}</h2>
    </div>

    <div class="grid-item-3">
      <div>
        <img
          :src="require(`../../assets/${vehicle.image}`)"
          class="img-vehicle"
        />
        <button
          class="buttonBasket"
          type="submit"
          v-if="isStarted && rentalCarId === selectedObjectId"
          v-on:click.prevent="basketVehicle(vehicle.id, rentalCarId)"
        >
          <span class="icon">🛒</span>
        </button>
        <button
          class="binButton"
          type="submit"
          v-if="isBasket"
          v-on:click.prevent="deleteFromBasket(vehicle)"
        >
          <img src="../../assets/delete.png" alt="delete" class="binIcon" />
        </button>
      </div>
      <div class="grid-item-4">
        <div class="grid-item-2-2">
          <div class="label-info">
            <label class="labels2">Price:</label>
            <p class="paragraph2">{{ vehicle.price }}</p>
          </div>
          <div class="label-info">
            <label class="labels">Transmission:</label>
            <p class="paragraph">{{ vehicle.transmissionType }}</p>
          </div>
          <div class="label-info">
            <label class="labels">Vehicle type:</label>
            <p class="paragraph">{{ vehicle.vehicleType }}</p>
          </div>
          <div class="label-info">
            <label class="labels">Fuel type:</label>
            <p class="paragraph1">{{ vehicle.fuelType }}</p>
          </div>
        </div>
      </div>
      <div v-if="isBasket" class="num">
        <label>{{ vehicle.quantity }}</label>
      </div>
    </div>
    <div class="under" v-if="isBasket">
      <button class="addButton" @click="plus">
        <img src="../../assets/plus-4-128.png" alt="Plus" class="img" />
      </button>
      <button class="deleteButton" @click="minus">
        <img src="../../assets/minus-4-128.png" alt="Plus" class="img" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "VehicleCard",
  props: {
    vehicle: Object,
    rentalCarId: Number,
    basketVehicle: Function,
    deleteFromBasket: Function,
    isStarted: Boolean,
    selectedObjectId: Number,
    fromBasket: Boolean,
    isBasket: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async plus() {
      this.$emit("car-added", this.vehicle);
    },
    async minus() {
      this.$emit("car-deleted", this.vehicle);
    },
  },
};
</script>

<style scoped>
.vehicle-card {
  margin-bottom: 20px;
  max-width: 100px;
}

.grid-item-2-2 {
  text-align: right;
}

.grid-item-3 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.addButton {
  position: relative;
  left: 360px;
  bottom: 160px;
  background-color: transparent;
  border: transparent;
}

.addButton:hover {
  background-color: lightslategray;
}

.deleteButton:hover {
  background-color: lightslategray;
}

.deleteButton {
  position: relative;
  left: 327px;
  bottom: 120px;
  background-color: transparent;
  border: transparent;
}

.grid-item-2-1 {
  display: flex;
  margin-bottom: 2px;
}

.img-vehicle {
  height: 120px;
}

.buttonBasket {
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 50px;
  width: 50px;
  margin: auto;
}

.buttonBasket:hover {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.labels {
  font-weight: bold;
  font-size: 20px;
}

.labels2 {
  font-weight: bold;
  font-size: 20px;
  color: red;
}

.paragraph2 {
  margin: 0;
  font-size: 20px;
  color: red;
}

.title {
  margin: auto;
  font-size: 30px;
}

.paragraph,
.paragraph1 {
  margin: 0;
  font-size: 20px;
}

.icon {
  font-size: 30px;
}

.img {
  height: 25px;
  width: 25px;
}

.binIcon{
  height: 40px;
  width: 40px;
}

.binButton{
  height: 50px;
  width: 50px;
  background-color: transparent;
  border-color: transparent;
}

.binButton:hover{
  background-color: gainsboro;
}

.num {
  color: red;
  position: relative;
  left: 120px;
  top: 60px;
  font-size: 20px;
  font-weight: bold;
}
</style>
