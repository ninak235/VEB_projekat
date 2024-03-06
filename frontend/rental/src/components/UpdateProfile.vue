<template>
  <div class="update-form">
    <div class="main-form">
    <img src="../assets/line1.png" id="left" />
    
    <form  v-on:submit.prevent="submitForm">
      <h2>User Profil Update</h2>
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="user.username" required />
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
        <label for="gender">Gender:</label>
        <select id="gender" v-model="user.gender" required>
          <option value="">Select</option>
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
        <button type="submit">Update</button>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        username: "",
        name: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        userRole: "",
      },
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
        const userData = response.data;
        this.user.username = userData.username;
        this.user.name = userData.name;
        this.user.lastName = userData.lastName;
        this.user.gender = userData.gender;
        this.user.dateOfBirth = userData.dateOfBirth;
        this.user.userRole = userData.userRole;
      } catch (error) {
        if (error.response.status === 401) {
          this.$router.push("/login");
        }
        console.error(error);
      }
    },
    submitForm() {
      if (
        !this.user.username ||
        !this.user.name ||
        !this.user.lastName ||
        !this.user.gender ||
        !this.user.dateOfBirth
      ) {
        alert("Please fill in all the required fields.");
        return;
      }
      const token = localStorage.getItem("token");
      axios
        .put("http://localhost:3000/users", this.user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          alert("User updated successfully.");

            this.$router.push("/userProfile");
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    },
  },
};
</script>

<style scoped>
.update-form {
  background-color: black;
}

.main-form {
  display: flex;
  gap:15px;
  max-width: 350px;
  margin: 0 auto;
  background-color: black;
  padding: 40px;
  border-radius: 8px;
  font-style: italic;
  font-family: Arial, sans-serif;
}

h2 {
  color: #f2c977;
  text-align: center;
  font-style: normal;
  text-decoration: underline;
}

#left {
  height: 360px;
  width: 120px;
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #f2c977;
}

input[type="text"],
input[type="password"],
select {
  width: 90%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button[type="submit"] {
  background-color: #f2c977;
  color: black;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;
  margin-left: 60px;

}

button[type="submit"]:hover {
  background-color: peru;
}

#link {
  text-decoration: underline;
  color: #e91e63;
  margin-right: 1%;
}

.login-link {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
  color: white;
}
</style>
