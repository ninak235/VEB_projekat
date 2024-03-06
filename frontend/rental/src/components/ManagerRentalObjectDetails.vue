<template>
  <div class="hole-container">
    <div class="rental-container">
      <div class="grid-item-1">
        <button class="notif" type="submit" @click="openPopup">
          <img src="../assets/bell.png" alt="bell" class="bellIcon"/>
        </button>
        <div v-if="showPopup" class="popup-overlay">
          <div class="popup">
            <h3 class="label-com-header2">Comments you haven't approved yet</h3>
            <div v-for="comm in unapprovedComms" :key="comm.id" class="comm-item">
                <p class="label-com">
                <img
                  :src="getUserIcon(comm.customer.userIcon)"
                  alt="User icon"
                  class="img"/>
                  {{"@"+comm.customer.username}}</p>
                <p class="label-com2">{{comm.textCom}}</p>
                <label class="label-com2"><img src="../assets/edit.png" alt="Pin Icon"  class="img-button1" />{{comm.grade}}</label>
                <button @click="validate(comm)" class="comButton">Validate</button>
            </div>
          <button @click="closePopup" class="com2Button">Done</button>
          </div>
        </div>
        <div class="flex-item">
          <img :src="rentalLogo.logo" class="car-logo" />
          
          <h2>{{ carObject.name }}</h2>

          <h3>
            <img src="../assets/pin.png" alt="Pin Icon" class="img-pin" />
            {{ carObject.location ? carObject.location.address.street + ", " + carObject.location.address.city : '' }}
          </h3>


          <h3>Working hours: {{ carObject.workingTime }}</h3>

          

          <h3 v-if="carObject.grade">Average grade: {{ carObject.grade }}</h3>

          <h3 :class="statusClass">Status: {{ carObject.objectStatus }}</h3>

          <div class="buttons-from">
          <img src="../assets/add1.png" alt="Pin Icon"  class="img-add" />
          <button class="buttons"
            type="submit" v-if="isHome"
            v-on:click="addVehicle(carObject.id)"
          >
            Add vehicle
          </button>
          <button class="buttons1" type="submit" v-if="isHome" v-on:click="viewComments">
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
          :change-vehicle="changeVehicle"
          :delete-vehicle="deleteVehicle"
          :showButtons2="true"
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
        location: "",
        logo: "",
        grade: "",
        vehicles: [],
      },
      objectVehicles: [],
      isHome: true,
      comments: [],
      clicked:false,
      zeroCom:false,
      showPopup: false,
      unapprovedComms: []
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
  methods: {
    async getData() {
      const userRole = localStorage.getItem("userRole");
      if(userRole === UserRole.MANAGER){
        this.isManager=true;
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
      axios
        .get(`http://localhost:3000/comments/unapproved/${this.id}`)
        .then((response) => {
            this.unapprovedComms = response.data;
        })
        .catch((error) => {
          console.error(error);
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
    },
    viewComments() {
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
     openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
    async validate(comm) {
      comm.managerApproved = true;
      const token = localStorage.getItem("token");
      axios
        .put(`http://localhost:3000/comments/${comm.id}`, comm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          axios
            .get(`http://localhost:3000/comments/unapproved/${this.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
            .then((response) => {
            this.unapprovedComms = response.data;
             })
            .catch((error) => {
             console.error(error);
            });
         })
        .catch((error) => {
          console.error(error);
        });
    },

    getUserIcon(userIcon) {
      if (userIcon) {
        return require(`../assets/${userIcon}`);
      } else {
        return null;
      }
    },
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
  max-width: 600px;
  align-items: center;
  max-width: 1000px;
  padding: 30px;
  background-color: rgb(237, 195, 122);
  border-radius: 10px;
}

.flex-item{
  width: 330px;
}

.grid-item-2 {
  align-self: center;
  display: flex;
  flex-direction: row;
  gap: 15px;
  flex-wrap: wrap;
  max-height: 100%;
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

.buttons-from{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.label-color {
    color: #edc37a;
    font-size: 20px;
    margin-top: 7px;
}
.img-button1{
  width: 24px;
  height: 24px;
}

.grid-item-2 .vehicle-card {
  padding: 20px;
  border: 6px solid #cd853f;
  background-color: #edc37a;
  border-radius: 10px;
  width: 400px;
  
}

notif{
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
  margin-left: 200px;
}

.notif:hover{
  background-color: #cd853f;
}

.bellIcon{
  width: 70px;
  height: 70px;
}

.label-com{
  color: #edc37a;
  font-size: 20px;
}
.notif{
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
  margin-left: 200px;
}

.notif:hover{
  background-color: #cd853f;
}

.bellIcon{
  width: 70px;
  height: 70px;
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

img{
  width: 40px;
  height: 40px;
}

.buttons:hover {
  background-color: black;
}


.img-pin {
  height: 30px;
  width: 30px;
}

.buttons {
  margin-top: 20px;
  margin-right: 20px;
  padding: 8px 16px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color:  peru;
  border: none;
  cursor: pointer;
  text-align: center;
  height: 40px;
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

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}


.label-com2{
  color: #cd853f;
  font-size: 15px;
}

.label-com-header2{
  color: #cd853f;
  font-size: 20px;
  font-weight: bold;
}

img{
  width: 40px;
  height: 40px;
}

.comButton{
  background-color: #cd853f;
  border-color:#cd853f;
  color: white;
  font-size: 14px;
  margin: 7px;
  cursor: pointer;
}

.comButton:hover{
  background-color:rgb(147, 60, 22);
}

.com2Button{
  background-color: lightgray;
  border-color: lightgray;
  font-size: 14px;
  margin-top: 30px;
  cursor: pointer;
}

.com2Button:hover{
  background-color: rgb(84, 81, 81);
  border-color: rgb(84, 81, 81);
}


</style>
