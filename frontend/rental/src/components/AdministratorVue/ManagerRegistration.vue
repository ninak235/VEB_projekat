<template>
<div class="hole-container">
  <div class="registration-form">
    <form v-on:submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="newManager.username"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="newManager.password"
          required
        />
      </div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="newManager.name" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          v-model="newManager.lastName"
          required
        />
      </div>
      <div class="form-group">
        <label for="gender">Gender:</label>
        <select id="gender" v-model="newManager.gender" required>
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
          v-model="newManager.dateOfBirth"
          required
        />
      </div>
      <div class="form-group">
        <button class="button-form" type="submit">Register</button>
      </div>
    </form>
  </div>
  </div>
</template>

<script>

export default {
  name: "ManagerRegistration",
  data() {
    return {
      newManager: {
        username: "",
        password: "",
        name: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        userRole: "Manager",
        rentals: null,
        basket: null,
        rentalObject: null,
        pointsNumber: 5,
        customerType: null,
      },
    };
  },
  methods: {
    submitForm(){
      if (
        !this.newManager.username ||
        !this.newManager.password ||
        !this.newManager.name ||
        !this.newManager.lastName ||
        !this.newManager.gender ||
        !this.newManager.dateOfBirth
      ) {
        alert("Please fill in all the required fields.");
        return;
      }

      this.$emit("manager-created", this.newManager);
      
    },
  },
};
</script>

<style scoped>
.hole-container {
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.registration-form {
  width: 300px;
  padding: 20px;
  padding: 1pc;
  border-radius: 8px;
  font-style: italic;
  font-family: Arial, sans-serif;
  background-color: black;
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
  width: 90%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
}
input[type="text"],
input[type="password"] {
  width: 85%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
}

button[type="submit"] {
  background-color: #deb76a;
  color: white;
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

.form-group .button-form {
  margin-left: 90px;
}
</style>