<template>
  <div class="background">
    <div class="title-profile">
      <h1 v-if="isManager">MANAGER {{ user.name }} profile</h1>
      <h1 v-if="isCustomer">CUSTOMER {{ user.name }} profile</h1>
      <h1 v-if="isAdmin">ADMIN {{ user.name }} profile</h1>
      <button class="updateButton" @click="updateProfile">
        <img src="../assets/pen.png" class="icon" alt="edit" />
      </button>
      <div class="horizontal">
        <img
          :src="userWithIcon.icon"
          alt="User icon"
          class="img"
        />
        <form>
          <div class="form-group">
            <label class="underline" for="username">Username: </label>
            <label class="bold-label">{{ user.username }}</label>
          </div>
          <div class="form-group">
            <label class="underline" for="name">Name: </label>
            <label class="bold-label"> {{ user.name }}</label>
          </div>
          <div class="form-group">
            <label class="underline" for="lastName">Last Name:</label>
            <label class="bold-label"> {{ user.lastName }}</label>
          </div>
          <div class="form-group">
            <label class="underline" for="dateOfBirth">Date of Birth:</label>
            <label class="bold-label">{{ user.dateOfBirth }}</label>
          </div>
          <div v-if="isCustomer" class="form-group">
            <label class="underline" for="pointsNumber">Points number:</label>
            <label class="bold-label">{{ user.pointsNumber }}</label>
          </div>
          <div v-if="isCustomer" class="form-group">
            <label class="underline" for="customerType">Customer type:</label>
            <label class="bold-label">{{ user.customerType.nameType }}</label>
          </div>
        </form>
      </div>
      <button v-if="isManager" name="My renal" class="register-button" @click="myRental">
        View my rental
      </button>
      <button v-if="isManager" name="My renal" class="register-button2" @click="myCustomers">
        Customers who ordered from my rental
      </button>
      <button v-if="isCustomer" class="addButton">
        <img src="../assets/add3.png" class="icon" alt="edit" />
      </button>
      <button v-if="isCustomer" class="register-button" @click="viewMyOrders">View my orders</button>

      <div v-if="isAdmin" class="buttons">
      <button class="addButton" @click="createObject">
        <img src="../assets/add3.png" class="icon" alt="edit" />
      </button>
      <button class="register-button" @click="createManager">
        Manager registration
      </button>
      <button class="register-button1" @click="viewUsers">
        View all registered users
      </button>
      <button class="register-button3" @click="viewSuspisiousUsers">
        View all suspisious customers
      </button>
      </div>
    </div>
  </div>
</template>

<script>
//import RentCar from './RentCar.vue';
import axios from "axios";

export default {
  data() {
    return {
      user: {
        type: Object,
      },
      isAdmin: "",
      isManager:"",
      isCustomer: "",
      isHome: true,
      name: "UserProfile",
      props: ["user"],
    };
   
  },
  computed: {
    userWithIcon() {
      return {
        ...this.user,
        icon:
          this.user.userIcon && require(`../assets/${this.user.userIcon}`),
      };
    },
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
      const userRole = localStorage.getItem("userRole");
      if (userRole === "Administrator") {
        this.isAdmin = true;
      }
      if (userRole === "Customer") {
        this.isCustomer = true;
      }
      if(userRole === "Manager"){
        this.isManager = true;
      }
      } catch (error) {
        if (error.response.status === 401) {
          this.$router.push("/login");
        }
        console.error(error);
      }
    },
    updateProfile() {
      this.$router.push("/updateProfile");
    },
    myRental() {
      this.$router.push("/managerRental/" + this.user.rentalObject.id);
    },
    viewMyOrders() {
      this.$router.push("/userOrders");
    },
    createObject() {
      this.$router.push("/createObject");
    },
    createManager() {
      this.$router.push("/managerRegistration");
    },
    viewUsers() {
      this.$router.push("/viewUsers");
    },
    myCustomers() {
      this.$router.push("/viewCustomers/" + this.user.id);
    },
    viewSuspisiousUsers(){
      this.$router.push("/suspisiousCustomers");
    }
  },
};
</script>

<style scoped>
.background {
  background-color: black;
  height: 590px;
}

.img {
  height: 150px;
}

.icon {
  height: 40px;
  width: 40px;
}

.updateButton {
  position: absolute;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
}

.updateButton:hover {
  background-color: grey;
}
.addButton {
  margin: auto;
  border: none;
  cursor: pointer;
  height: 70px;
  background-color: transparent;
}

.addButton:hover {
  background-color: grey;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #deb76a;
  font-style: italic;
  font-size: 17px;
}

.title-profile {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  font-style: italic;
  font-family: Arial, sans-serif;
}

.underline {
  text-decoration: underline;
}

.horizontal {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  color: #deb76a;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.button-container {
  display: flex;
}

.button-container button {
  flex: 1;
  margin-right: 10px;
}

.orderButton {
  background-color: #deb76a;
  height: 50px;
  width: 100px;
  cursor: pointer;
}

.orderButton:hover {
  background-color: grey;
}

.buttos {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 50px;
}

.register-button {
  background-color: #deb76a;
  border: none;
  color: black;
  cursor: pointer;
  width: 100px;
  height: 33px;
  margin-left: 20px;
}

.register-button:hover {
  background-color: grey;
}

.register-button3 {
  background-color: #deb76a;
  border: none;
  color: black;
  cursor: pointer;
  width: 130px;
  height: 33px;
  margin-left: 120px;
}

.register-button3:hover {
  background-color: grey;
}

.register-button1{
  background-color: #deb76a;
  border: none;
  color: black;
  cursor: pointer;
  width: 110px;
  height: 33px;
  margin-left: 20px;
}

.register-button1:hover {
  background-color: grey;
}

.register-button2{
  background-color: #deb76a;
  border: none;
  color: black;
  cursor: pointer;
  width: 150px;
  height: 45px;
  margin-left: 20px;
  margin-top: 40px;
}

.register-button2:hover {
  background-color: grey;
}

.bold-label{
  font-weight: bold;
}
</style>