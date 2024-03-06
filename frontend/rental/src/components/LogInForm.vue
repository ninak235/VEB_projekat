<template>
  <div class="back">
    <img src="../assets/line1.png" id="left" />
    <div class="login-card">
      <h2>Login</h2>
      <form v-on:submit.prevent="submitForm">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            v-model="loggedUser.username"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="loggedUser.password"
            required
          />
        </div>
        <div class="form-group">
          <button type="submit">Log in</button>
        </div>
        <div class="login-link">
          <span id="link">You don't have an account? </span>
          <button type="submit" @click="redirectToRegisterPage">
            Register
          </button>
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
      loggedUser: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      axios
        .post("http://localhost:3000/auth/login", this.loggedUser)
        .then((response) => {
          const { message, token, userRole } = response.data;
          alert(message);
          
          localStorage.setItem("token", token);
          localStorage.setItem("userRole", userRole);

          this.$router.push("/userProfile");
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    },
    redirectToRegisterPage() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.back {
  display: flex;
  background-color: black;
  height: 480px;
  justify-content: center;
  align-items: center;
}
.login-card {
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  background-color: transparent;
}

#left {
  height: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #deb76a;
  font-size: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #deb76a;
  font-style: italic;
  font-size: 17px;
}

input[type="text"],
input[type="password"] {
  width: 90%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
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

#link {
  text-decoration: underline;
  color: #deb76a;
  margin-right: 5px;
}

.login-link {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
  color: white;
}
</style>
