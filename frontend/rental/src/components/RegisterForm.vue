<template>
  <div class="background">
    <h2>REGISTRATION</h2>
    <div class="registration-form">
      <img src="../assets/line1.png" id="left" />
      <form v-on:submit.prevent="submitForm">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="user.username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="user.password"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="user.name" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="user.lastName" required />
        </div>
        <div class="form-group">
          <label for="role">User role:</label>
          <select id="role" v-model="user.userRole" required>
            <option value="Customer">Customer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <div class="form-group">
          <label for="gender">Gender:</label>
          <select id="gender" v-model="user.gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            v-model="user.dateOfBirth"
            required
          />
        </div>
        <div class="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import UserRole from "../../../../backend/model/user_role";
//const UserRole = require("../../../../backend/model/user_role");

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        name: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        userRole: "",
        rentals: null,
        basket: null,
        rentalObject: null,
        pointsNumber: 5,
        customerType: {},
        rejectedNum: 0,
        blocked: false,

      },
      confirmPassword: "",
    };
  },
  methods: {
    submitForm() {
      if (
        !this.user.username ||
        !this.user.password ||
        !this.user.name ||
        !this.user.lastName ||
        !this.user.gender ||
        !this.user.dateOfBirth ||
        !this.confirmPassword ||
        !this.user.userRole
      ) {
        alert("Please fill in all the required fields.");
        return;
      }

      if (this.user.password !== this.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      axios
        .post("http://localhost:3000/auth/register", this.user)
        .then((response) => {
          const { message } = response.data;
          alert(message);

          this.$router.push("/login");
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    },
    // eslint-disable-next-line no-unused-vars
    redirectToLoginPage() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
h2 {
  color: #c7a767;
  margin: auto;
  margin-bottom: 10px;
}
.background {
  background-color: black;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.registration-form {
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding: 1pc;
  border-radius: 8px;
  font-style: italic;
  font-family: Arial, sans-serif;
}

#left {
  height: 400px;
}

.form-group {
  margin-bottom: 5px;
}

label {
  display: block;
  margin-bottom: 3px;
  color: #deb76a;
  font-style: italic;
  font-size: 16px;
}

select {
  width: 270px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
}
input[type="text"],
input[type="password"],
input[type="date"] {
  width: 250px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
}

button[type="submit"] {
  background-color: #deb76a;
  color: black;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #c7a767;
}

.login-link {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
  color: white;
}
</style>
