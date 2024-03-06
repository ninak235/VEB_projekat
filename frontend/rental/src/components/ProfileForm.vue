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
            <label>{{ user.username }}</label>
          </div>
          <div class="form-group">
            <label class="underline" for="name">Name: </label>
            <label> {{ user.name }}</label>
          </div>
          <div class="form-group">
            <label class="underline" for="lastName">Last Name:</label>
            <label> {{ user.lastName }}</label>
          </div>
          <div class="form-group">
            <label class="underline" for="dateOfBirth">Date of Birth:</label>
            <label>{{ user.dateOfBirth }}</label>
          </div>
        </form>
      </div>
      <button v-if="isManager" name="My renal" class="addButton" @click="myRental">
        View my rental
      </button>
      <button v-if="isCustomer" class="addButton">
        <img src="../assets/add3.png" class="icon" alt="edit" />
      </button>
      <button v-if="isCustomer" class="addButton" @click="viewMyOrders">View my orders</button>

      <div v-if="isAdmin" class="buttons">
      <button class="addButton" @click="createObject">
        <img src="../assets/add3.png" class="icon" alt="edit" />
      </button>
      <button class="register-button" @click="createManager">
        Manager registration
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
        required: true,
      },
      isAdmin: "",
      isManager:"",
      isCustomer: "",
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
  },
};
</script>

<style scoped>
.background {
  background-color: black;
  height: 480px;
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
  background-color: #deb76a;
  border: none;
  cursor: pointer;
  color: black;
  height: 40px;
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
  margin-bottom: 60px;
}

.register-button:hover {
  background-color: grey;
}
</style>