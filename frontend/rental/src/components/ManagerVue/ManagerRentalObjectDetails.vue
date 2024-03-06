<template>
  <div class="hole-container">
    <div class="rental-container">
      <div class="grid-item-1">
        <button class="notif">
          <img src="../../assets/bell.png" alt="bell" class="bellIcon"/>
        </button>
        <div class="flex-item">
          <img :src="rentalLogo.logo" class="car-logo" />
          
          <h2>{{ carObject.name }}</h2>

          <h3>
            <img src="../../assets/pin.png" alt="Pin Icon"  class="img-pin" />
            {{
              carObject.location.address.street +
              ", " +
              carObject.location.address.city
            }}
          </h3>

          <h3>Working hours: {{ carObject.workingTime }}</h3>

          

          <h3 v-if="carObject.grade">Average grade: {{ carObject.grade }}</h3>

          <h3 :class="statusClass">Status: {{ carObject.objectStatus }}</h3>

          <img src="../../assets/add1.png" alt="Pin Icon"  class="img-add" />
          <button class="buttons"
            type="submit" v-if="isHome"
            v-on:click="addVehicle(carObject.id)"
          >
            Add vehicle
          </button>
        </div>
      </div>

      <div class="grid-item-2">
        <vehicleCard
          v-for="vehicle in objectVehicles"
          :key="vehicle.id"
          :vehicle="vehicle"
          :rental-car-id="parseInt(id)"
          :change-vehicle="changeVehicle"
          :delete-vehicle="deleteVehicle"
          :showButtons2="true"
        ></vehicleCard>
        </div>
    </div>
  </div>
</template>

<script>
import VehicleCard from "../VehicleCard.vue";
import axios from "axios";

export default {
  components: {
    vehicleCard: VehicleCard,
  },

  data() {
    return {
      id: this.$route.params.id,
      vehicleId: 0,
      carObject: {
        name: "",
        workingTime: "",
        objectStatus: "",
        location:{
            address: {
                street: "",
                city: "",
            }
        },
        logo: "",
        grade: "",
        vehicles: [],
      },
      objectVehicles: [],
      isHome: true,
    };
  },
  computed: {
    statusClass() {
      return ['status', this.carObject.objectStatus === 'Opened' ? 'Opened' : 'Closed'];
    },
    rentalLogo() {
      return {
        ...this.carObject,
        logo:
          this.carObject.logo && require(`../../assets/${this.carObject.logo}`),
      };
    }
  },
  methods: {
    async getData() {
      const userRole = localStorage.getItem("userRole");
    if(userRole === "Manager"){
      this.isManager=true;
    }
    axios
      .get(`http://localhost:3000/rentalObjects/${this.id}`)
      .then((response) => {
        this.carObject = response.data;
        console.log("car objecat", this.carObject.name);
        this.objectVehicles = this.carObject.vehicles;
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred while fetching user data");
      });
  },
    addVehicle(id) {
      console.log(this.carObject.objectStatus);
      this.$router.push({ path: "/vehicles/" + id });
    },
    changeVehicle(vehicleId, id) {
      this.$router.push({ path: "/updateVehicle/" + vehicleId + "/" + id });
    },
    deleteVehicle(vehicleId, id) {
    axios
      .delete(`http://localhost:3000/rentalObjects/vehicle/${vehicleId}/${id}`)
      .then((response) => {
        const { message } = response.data;
        alert(message);

        axios
        
          .get(`http://localhost:3000/rentalObjects/${this.id}`)
          .then((response) => {
            this.carObject = response.data;
            console.log("car objecat", this.carObject.name);
            this.objectVehicles= this.carObject.vehicles;
          })
          .catch((error) => {
            console.error(error);
            window.alert("An error occurred while fetching user data");
          });
        this.$router.push({path: '/managerRental/' + this.id}) // Remove the deleted vehicle from carObject.vehicles
        
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.error);
      });
    }
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.hole-container {
  display: flex;
  flex-direction: column;

  max-width: 1878px;
  background-color: black;
  max-height: 2000px;
}

.rental-container {
  display: flex;
  flex-direction: row;
  gap: 50px;
  margin-top: 20px;
  margin-right: 40px;
  padding-left: 50px;
  
}

.grid-item-1  {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 1000px;
  padding: 30px;
  background-color: rgb(237, 195, 122);
  border-radius: 10px;
}

.grid-item-2 {
  align-self: center;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  max-height: 100%;
  max-width: 1300px;
}

.notif{
  background-color: transparent;
}

.bellIcon{
  width: 40px;
  height: 40px;
}

.label-color {
    color: #edc37a;
    font-size: 20px;
    margin-top: 7px;
}

.grid-item-2 .vehicle-card {
  padding: 20px;
  border: 6px solid #cd853f;
  background-color: #edc37a;
  border-radius: 10px;
  max-width: 460px;
}




.img-add {
  width: 50px;
}
.grid-item-1 h2 {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: black; /* Change text color back to blue */
  transition: color 0.3s; 
}


.car-logo {
  width: 200px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
  margin: auto;
}

.grid-item-1 h3 {
  margin-bottom: 5px;
  text-align: center;
}

.status {
  font-weight: bold;
  text-align: center;
}

.Opened {
  color: green;
}

.Closed {
  color: red;
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
  background-color:  peru;
  border: none;
  cursor: pointer;
  text-align: center;
}
</style>