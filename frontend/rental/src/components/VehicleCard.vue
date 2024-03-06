<template>
  <div class="vehicle-card">
    <div class="grid-item-2-1">
      <h2 class="title">{{ vehicle.brand }} {{ vehicle.model }}</h2>
    </div>

    <div class="grid-item-3">
      <div>
        <img
          :src="imageVehicle.image"
          class="img-vehicle"
        />
        <div class="buttons">
      <button class="button1" v-if="showButtons2" type="submit" v-on:click.prevent="changeVehicle(vehicle.id, rentalCarId)">Change vehicle</button>
      <button class="button1" v-if="showButtons2" type="submit" v-on:click.prevent="deleteVehicle(vehicle.id, rentalCarId)">Delete vehicle</button>
      </div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "VehicleCard",
  props: {
    vehicle: Object,
    rentalCarId: Number,
    changeVehicle: Function,
    deleteVehicle: Function,
    basketVehicle: Function,
    showButtons: {
      type: Boolean,
      default: true,
    },
    showButtons1: {
      type: Boolean,
      default: false,
    },
showButtons2: {
      type: Boolean,
      default: false 
   },
  },
  computed: {
    imageVehicle(){
      return {
        ...this.vehicle,
        image:
          this.vehicle.image && require(`../assets/${this.vehicle.image}`),
      };
    },
  }
};
</script>

<style scoped>
.vehicle-card {
  margin-bottom: 20px;
  width: 400px;
}

.grid-item-2-2 {
  text-align: right;
  margin-left: -50px;
}


.grid-item-3 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.grid-item-2-1 {
  display: flex;
  margin-bottom: 2px;
}

.img-vehicle {
  height: 150px;
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

.label-info {
  margin-right: 160px;
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


.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  margin-left: 190px;
  width: 150px;
}
.button1{
  background-color: peru;
  font-size: 15px;
  padding: 8px 16px;
  font-weight: bold;
  color: white;
  border: none;
  cursor: pointer;
  text-align: center;
}

.button1:hover {
  background-color: black;
}
</style>