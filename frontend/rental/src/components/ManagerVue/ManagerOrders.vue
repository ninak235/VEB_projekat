<template>
  <div class="hole-container">
    <div class="rental-container">
      <div class="grid-item-1">
        <div class="flex-item">
          <img :src="rentalLogo.logo" class="car-logo" />
          
          <h2>{{ carObject.name }}</h2>

          <h3>
            <img src="../../assets/pin.png" alt="Pin Icon" class="img-pin" />
            {{
              carObject.location.address.street +
              ", " +
              carObject.location.address.city
            }}
          </h3>

          <h3>Working hours: {{ carObject.workingTime }}</h3>

          <h3 v-if="carObject.grade">Average grade: {{ carObject.grade }}</h3>

          <h3 :class="statusClass">Status: {{ carObject.objectStatus }}</h3>
        </div>
      </div>

      <div class="grid-item-2">
        <div class="searching">
          <form class="search-inputs">
            <div class="form-input">
              <input type="text" v-model="search.priceFrom" placeholder="Price from" />
              <input type="text" v-model="search.priceTo" placeholder="Price to" />
              <label class="label-color">Date from:</label>
              <input type="date" v-model="search.dateFrom" />
              <label class="label-color">Date to:</label>
              <input type="date" v-model="search.dateTo" />
              
              <button type="button" class="sort-button"  @click="searchForm">
                <img src="../../assets/filterYellow.png" alt="Filter Icon" class="user-icon" />
              </button>
              <button type="button" class="sort-button"  @click="getData">
                <img src="../../assets/reload.png" alt="Filter Icon" class="user-icon"/>
              </button>
            </div>
          </form>
        </div>
        

      <div class="sort">
          <div>
            <select id="sortParamter" v-model="sortingParam">
              <option value="price">Price</option>
              <option value="date">Date</option>
            </select>
          </div>
          <button class="sort-button" @click="sortAsc" >
            <img src="../../assets/upArrow.png"  alt="Sort Icon"  class="user-icon"/>
          </button>
          <button class="sort-button" @click="sortDesc" >
            <img src="../../assets/downArrow.png" alt="Sort Icon" class="user-icon" />
          </button>
      </div>
      <div class="scroll-form" v-for="order in orders" :key="order.id">
        <div class="order-info">
          <h2>Order {{order.uniqueOrderId}}</h2>
          <label class="order-labels">Start time: {{ order.dateTime }}</label>
          <label class="order-labels">Duration: {{ order.durationLease }}</label>
          <label class="order-labels">Price: {{ order.price }}</label>
          <label class="order-labels1">Status: {{ order.orderStatus }}</label>
          <div v-if="order.orderStatus =='Processing'" class="horiz">
          <button type="submit" class="search-button" @click="accept(order)">
          <img
            src="../../assets/ok-128.png"
            alt="Ok Icon"
            class="button-icon"
          />
        </button>
        <button type="submit" class="search-button" @click="decline">
          <img
            src="../../assets/x-mark-3-128.png"
            alt="X Icon"
            class="button-icon"
          />
        </button>
        </div>
        <div v-if="isRejected">
          <input type="text" placeholder="Why?" />
          <button @click="reject(order)" type="submit" class="send">Send</button>
        </div>
        <div v-if="order.orderStatus === 'Taken'">
           <button @click="returned(order)" type="submit" class="ret">Vehicles returned</button>
        </div>
        </div>
        <div v-for="vehicle in order.rentVehicles" :key="vehicle.id">
          <vehicleCard
            :vehicle="vehicle"
            :rental-car-id="parseInt(search.rentalId)"
            :showButtons2="false"
          ></vehicleCard>
        </div>
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
    vehicleCard: VehicleCard,
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
  mounted() {
    this.getData();
  },
  data() {
    return {
      
      vehicleId: 0,
      search: {
        dateFrom: "",
        dateTo: "",
        priceFrom: "",
        priceTo: "",
        rentalId: 0,
      },
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
      isHome: false,
      orders: [],
      sortingParam: "",
      isProcessing: false,
      isRejected: false,
    };
  },
  methods: {
    async getData() {
      const userRole = localStorage.getItem("userRole");
      if (userRole === "Manager") {
        this.isManager = true;
      }
      this.search.rentalId = this.$route.params.id;
      try {
        const response = await axios.get(
          `http://localhost:3000/rentalObjects/${this.search.rentalId}`
        );
        this.carObject = response.data;

        const orderResponse = await axios.get(
          `http://localhost:3000/orders/rentalOrders/${this.search.rentalId}`
        );
        this.orders = orderResponse.data;
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          console.error(error);
        }
      }
    },

    async sortAsc() {
        try {
        const response = await axios.get(
          "http://localhost:3000/orders/sortedAsc",
          {
            params: {
              sortingParam: this.sortingParam,
              rentalId: this.search.rentalId,
            },
          }
        );
        this.orders = response.data;
      } catch (error) {
        console.error(error);
      }
    }, 
    async sortDesc() {
        try {
        const response = await axios.get(
          "http://localhost:3000/orders/sortedDesc",
          {
            params: {
              sortingParam: this.sortingParam,
              rentalId: this.search.rentalId,
            },
          }
        );
        this.orders = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async searchForm() {
        try {
            const response = await axios.get("http://localhost:3000/orders/filteredOrders", {
              params: {
                dateFrom: this.search.dateFrom,
                dateTo: this.search.dateTo,
                priceFrom: this.search.priceFrom,
                priceTo: this.search.priceTo,
                rentalId: this.search.rentalId
        },
      });
      this.orders = response.data;
    } catch (error) {
      console.error(error); 
    }
    },
    async accept(order){
      const confirmation = confirm(
        "Are you sure you want to approve this order?"
      );

      if (confirmation) {
        order.orderStatus = "Approved";
        try{
          await axios.put(`http://localhost:3000/orders/` + order.id, order);
        }
        catch(error){
          console.error(error);
        }
      }
      
    },
    decline(){
      this.isRejected = true;
    },
    async reject(order){
      this.isRejected = false;
      try{
          order.orderStatus = "Rejected";
          await axios
          .put(`http://localhost:3000/orders/` + order.id, order);
        }
        catch(error){
          console.error(error);
        }
    },
    async returned(order){
      try{
          order.orderStatus = "Returned";
          await axios
          .put(`http://localhost:3000/orders/` + order.id, order);
        }
        catch(error){
          console.error(error);
        }
    }

  }
}
</script>

<style scoped>
.hole-container {
  display: flex;
  flex-direction: column;
  background-color: black;
  max-width: 1500px;
  max-height: 100%;
}

.rental-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
  margin-right: 40px;
  padding-left: 50px;
}

.grid-item-1  {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;
  background-color: rgb(237, 195, 122);
  border-radius: 10px;
}

.grid-item-2 {
  align-self: center;
  display: flex;
  flex-direction: column;
  max-width: 950px;
  
}

.order-info{
  color: rgb(237, 195, 122);
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.order-info h2 {
  text-align: center;
}

.status-button {
  margin-top: 20px;
  width: 150px;
  margin-left: 40px;
  height: 30px;
  background-color: rgb(237, 195, 122);
  border: none;
}

.status-button:hover {
  background-color: #cd853f;
}

.scroll-form {
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-top: 5px;
  max-width: 1100px;
  overflow-x: auto;
  scrollbar-width: thin; 
  scrollbar-color: #f2c977 #edc37a; 
}

.scroll-form::-webkit-scrollbar {
  width: 8px; 
}

.scroll-form::-webkit-scrollbar-track {
  background-color: #edc37a; 
}

.scroll-form::-webkit-scrollbar-thumb {
  background-color: #cd853f; 
}

.searching {
  margin-bottom: 20px;
  margin-top: 20px;
  margin-right: 450px;
  min-width: 3000px;
}

.search-inputs {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 5px;
  height: 35px;
  margin-right: 40px;
  max-width: 100px;
}

.form-input{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 5px;
  height: 35px;
  margin-right: 40px;
}

.label-color {
    color: #edc37a;
    font-size: 20px;
    margin-top: 7px;
    min-width: 88px;
}

.grid-item-2 .vehicle-card {
  padding: 10px;
  border: 6px solid #cd853f;
  background-color: #edc37a;
  border-radius: 5px;
  width: 420px;
}

.send{
  background-color: #cd853f;
  border-color: #cd853f;
  font-weight: bold;
  margin-left: 15px;
}
.send:hover{
  background-color: whitesmoke;
}

.ret{
  background-color: #cd853f;
  border-color: #cd853f;
  font-weight: bold;
  position: relative;
  left: 45px;
}

.ret:hover{
  background-color: whitesmoke;
}

.sort {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 5px;
  width: 40px;
  height: 40px;
  background-color: transparent;
  color: black;
}

.sort-button {
  background-color: transparent;
  border: none;
  border-radius: 5px;
}

.sort-button1:hover {
  background-color: lightgray;
}

.sort-button:hover {
  background-color: lightgray;
}

#sortParamter {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 120px;
  height: 35px;
  gap: 10px;
}

.img-add {
  width: 50px;
}

.search-button{
  width : 50px;
  height: 50px;
  background-color: transparent;
  border: transparent;
}
.grid-item-1 h2 {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: black; /* Change text color back to blue */
  transition: color 0.3s; 
}

.order-labels{
  color: rgb(237, 195, 122);
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-width: 220px;
  font-size: 20px;
}

.order-labels1{
  color: #cd853f;
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-width: 220px;
  font-size: 20px;
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

.button-icon{
  height: 40px;
  width: 40px;
}

.button-icon:hover{
  background-color: lightsteelblue;
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
.user-icon {
  width: 30px;
  height: 30px;
  background-color: transparent;
}
</style>

