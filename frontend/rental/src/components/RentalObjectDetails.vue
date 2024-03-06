<template>
  <div class="hole-container">
    <div class="rental-container">
      <div class="grid-item-1">
        <div class="flex-item">
          <img :src="rentalLogo.logo" class="car-logo" />
          
          <h2>{{ carObject.name }}</h2>

          <h3>
            <img src="../assets/pin.png" alt="Pin Icon"  class="img-pin" />
            {{
              carObject.location.address.street +
              ", " +
              carObject.location.address.city
            }}
          </h3>

          <h3>Working hours: {{ carObject.workingTime }}</h3>

          

          <h3 v-if="carObject.grade">Average grade: {{ carObject.grade }}</h3>

          <h3 :class="statusClass">Status: {{ carObject.objectStatus }}</h3>

        <div class="button-form">
          <button class="buttons1" type="submit" v-if="isAdmin" v-on:click="viewAllComments">
            <img src="../assets/com.png" alt="Pin Icon"  class="img-button" />
          </button>
          <button class="buttons1" type="submit" v-if="isCustomer" v-on:click="viewAcceptedComments">
            <img src="../assets/com.png" alt="Pin Icon"  class="img-button" />
          </button>
        </div>
        </div>
      </div>

      <div v-if="clicked" class="grid-item-3">
        <h2 class="zero-com" v-if="zeroCom">No comments yet...</h2>
        <h2 class="label-com-header" v-else-if="!zeroCom">Comments...</h2>
        <div v-for="comment in comments" :key="comment.id" :comment="comment">
            <p class="label-com">
              <img
            :src="getUserIcon(comment.customer.userIcon)"
            alt="User icon"
            class="img"/>
              {{"@"+comment.customer.username}}</p>
            <p class="label-com">{{comment.textCom}}</p>
            <label class="label-com"><img src="../assets/rate.png" alt="Pin Icon"  class="img-button1" />{{comment.grade}}</label>
            <img src="../assets/like.png" alt="Pin Icon"  class="img-like" />
        </div>
        
      </div>
      <div v-else-if="!clicked" class="grid-item-2">
        <vehicleCard
          v-for="vehicle in objectVehicles"
          :key="vehicle.id"
          :vehicle="vehicle"
          :rental-car-id="parseInt(id)"
          
        ></vehicleCard>
        </div>
    </div>
  </div>
</template>

<script>
import VehicleCard from "./VehicleCard.vue";
import axios from "axios";
import UserRole from '../../../../backend/model/user_role';

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
      isHome: false,
      clicked:false,
      isManager: false,
      isAdmin: false,
      isCustomer: false,
      comments: [],
      zeroCom:false,
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
          this.carObject.logo && require(`../assets/${this.carObject.logo}`),
      };
    }
  },
  mounted() {
    const userRole = localStorage.getItem("userRole");
    if(userRole === UserRole.MANAGER){
      this.isManager=true;
    }
    if(userRole === UserRole.ADMINISTRATOR){
      this.isAdmin=true;
    }
    if(userRole === UserRole.CUSTOMER){
      this.isCustomer=true;
    }
    axios
      .get(`http://localhost:3000/rentalObjects/${this.id}`)
      .then((response) => {
        this.carObject = response.data;
        this.objectVehicles = this.carObject.vehicles;
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred while fetching user data");
      });
  },
  methods:{
    viewAllComments() {
      axios
      .get(`http://localhost:3000/comments/${this.id}`)
      .then((response) => {
        this.comments = response.data;
        this.clicked = true;
        if(this.comments.length ===0){
          this.zeroCom= true;
        }
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred while fetching user data");
      });
    },
    viewAcceptedComments(){
      axios
      .get(`http://localhost:3000/comments/acceptedComments/${this.id}`)
      .then((response) => {
        this.comments = response.data;
        this.clicked = true;
        if(this.comments.length ===0){
          this.zeroCom= true;
        }
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred while fetching user data");
      });
    },
    getUserIcon(userIcon) {
      if (userIcon) {
        return require(`../assets/${userIcon}`);
      } else {
        return null;
      }
    },
  }
};
</script>

<style scoped>
.hole-container {
  display: flex;
  flex-direction: column;
  max-width: 2000px;
  background-color: black;
  max-height: 2000px;
}

.rental-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
  margin-right: 50px;
  padding-left: 50px;
}

.grid-item-1  {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 1100px;
  padding: 30px;
  background-color: rgb(237, 195, 122);
  border-radius: 10px;
  margin-right: 10px;
}

.grid-item-2 {
  align-self: center;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.zero-com{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: #cd853f;
  font-size: 35px;
  font-weight: bold;
  margin-left: 400px;
}

.grid-item-2 .vehicle-card {
  padding: 20px;
  border: 6px solid #cd853f;
  background-color: #edc37a;
  border-radius: 10px;
}

.grid-item-3{
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;
  max-height: 100%;
}

.img-like{
  width: 30px;
  height: 30px;
  margin-left: 900px;
}

.flex-item{
  width: 500px;
}

img{
  width: 40px;
  height: 40px;
}

.label-com{
  color: #edc37a;
  font-size: 20px;
}

.label-com-header{
  color: #cd853f;
  font-size: 30px;
  font-weight: bold;
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

.image-button1{
  width: 24px;
  height: 24px;
}

.buttons:hover {
  background-color: black;
}


.flex-item .img-pin {
  margin-bottom: 0px;
  width: 30px;
  max-width: 7%;
}

.img-pin{
  height: 20px;
  width: 30px;
}

.flex-item{
  width: 250px;
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

.buttons1{
  background-color: transparent;
  border: none;
  margin-top: 20px;
  margin-right: 20px;
  padding: 8px 16px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 4px;
}

.buttons1:hover {
  background-color: black;
}

.button-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
</style>

