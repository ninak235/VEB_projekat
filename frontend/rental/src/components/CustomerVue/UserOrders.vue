<template>
  <div class="hole-container">
    <div
      v-for="order in orders"
      :key="order.id"
      class="rental-container"
    >
     <div class="order-info">
          <h2>Order {{order.uniqueOrderId}}</h2>
          <label class="order-labels">Start time: {{ order.dateTime }}</label>
          <label class="order-labels">Duration: {{ order.durationLease }}</label>
          <label class="order-labels">Price: {{ order.price }}</label>
          <label class="order-labels1">Status: {{ order.orderStatus }}</label>
          <button
           type="submit"
          class="cancel-button"
           @click="cancelOrder(order.id)"
           v-if="order.orderStatus === 'Processing'"
      >
        <img src="../../assets/cancel-128.png" alt="Icon" class="cancel-icon" />
        <h3>Add object</h3>
      </button>
       <button v-if="order.orderStatus === 'Returned' && !order.isRated" class="cancel-button" type="submit" @click="openPopup">
      <img src="../../assets/comments-128.png" alt="Icon" class="cancel-icon" />
    </button>
    
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup">
        <h3>Leave a Comment</h3>
        <textarea v-model="txtComment" rows="5" placeholder="Enter your comment" class="textarea"></textarea>
        
        <h2>Grade</h2>
        <div>
          <label v-for="grade in grades" :key="grade">
            <input type="radio" v-model="selectedGrade" :value="grade" /> {{ grade }}
          </label>
        </div>
        
        <div class="center">
          <button @click="submitComment(order)" class="comButton">Submit</button>
          <button @click="closePopup" class="comButton">Cancel</button>
        </div>
      </div>
    </div>
        </div>
      <div class="combine-container">
      <div class="scroll-container">
        <div class="grid-item-2">
          <vehicle-card
            v-for="vehicle in order.rentVehicles"
            :key="vehicle.id"
            :vehicle="vehicle"
            :show-buttons="false"
            :show-buttons1="true"
          ></vehicle-card>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import VehicleCard from "./VehicleCard2.vue";
import axios from "axios";

export default {
  components: {
    "vehicle-card": VehicleCard,
  },
  computed: {
    statusClass() {
      return [
        "status",
        this.rentalObject.objectStatus === "Opened" ? "Opened" : "Closed",
      ];
    },
  },
  data() {
    return {
      orders: [],
      rentalObjects: [],
      vehicles: [],
      showPopup: false,
      txtComment: '',
      grades: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      selectedGrade: null, 
      user: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data;
      } catch (error) {
        console.log("Oops");
      }
      try{
        const response2 = await axios.get("http://localhost:3000/orders/userOrders/" + this.user.id);
        this.orders = response2.data;
      }
      catch(error){
        console.error(error);
      }
    },
    async cancelOrder(id){
      axios
        .delete("http://localhost:3000/orders/" + id)
        .catch((error) => {
          alert(error.response.data.error);
        })

      this.getData();
    },
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
      this.txtComment = '';
      this.selectedGrade = null;
    },
    async submitComment(order) {
       try {
        let comment = {
          customer : {
            id: this.user.id,
            username: this.user.username,
            userIcon: this.user.userIcon,
          },
          rentalObjectId : order.rentalObjectId,
          textCom : this.txtComment,
          grade : this.selectedGrade,
          managerApproved: false,
        }
        axios.post("http://localhost:3000/comments", comment);
       }
       catch(error){
          console.error(error);
       }

       try {
          await axios.put("http://localhost:3000/rentalObjects/addedGrade/" + order.rentalObjectId,  {
              grade: this.selectedGrade, 
          });
       }
       catch(error){
          console.error(error);
       }
       order.isRated = true;
       try{
          await axios.put("http://localhost:3000/orders/" + order.id, order);
          this.getData();
       }
       catch(error){
        console.error(error);
       }
      this.closePopup();
    }
  },
};
</script>

<style scoped>
.hole-container {
  display: flex;
  flex-direction: column;
  background-color: black;
  min-height: 480px;
}


.order-info{
  color: rgb(237, 195, 122);
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 200px;

}

.order-info h2 {
  text-align: center;
}

label{
  font-size: 16px;
}

.rental-container {
  height: 480px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  margin-right: 40px;
  padding-left: 50px;
  margin-bottom: -170px;
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
  max-width: 1210px;
  overflow-x: auto;
  margin-bottom: 190px;
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
  min-width: 320px;
  max-width: 450px;
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

.cancel-button{
  background-color: transparent;
  border-color: transparent;
  width: 50px;
  height: 50px;
  margin: auto;
}

.cancel-button:hover{
  background-color: lightgrey;
}

.cancel-icon{
  width: 40px;
  height: 40px;
}

.comButton{
  background-color: #cd853f;
  border-color: #cd853f;
  font-size: 15px;
  margin-right: 5px;
  color: white;
}

.comButton:hover{
  background-color: lightgray;
}

.center{
  margin-top:8px;
  display: flex;
  justify-content: center;
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

.textarea{
  width: 350px;
  font-size: 16px;
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

/* Add any additional styling as needed */
</style>