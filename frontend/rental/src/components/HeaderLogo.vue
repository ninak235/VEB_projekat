<template>
  <nav>
    <button class="user-button" @click="userProfile">
      <img src="../assets/user2.png" alt="User Profile" class="user-icon" />
      <span class="login-text">Profile</span>
    </button>

    <button class="home-button" @click="homePage">
      <img src="../assets/home.png" alt="Home Profile" class="user-icon" />
      <span class="login-text">Home</span>
    </button>
    <img src="../assets/goldLine2.jpg" class="line" />
    <div class="logo-button">
      <img src="../assets/caricon.png" alt="car icon" class="car-icon" />
    </div>
    <h1 class="header">NINA² RENTALS</h1>
    <button @click="redirectToLoginPage" class="login-button">
      <img src="../assets/login.png" alt="User Icon" class="user-icon" />
      <span class="login-text">Log in</span>
    </button>
    <img src="../assets/goldLine2.jpg" class="line" />
  </nav>
</template>

<script>
export default {
  methods: {
    redirectToLoginPage() {
      this.$router.push("/login");
    },
    userProfile() {
      this.$router.push("/userProfile");
    },
    homePage() {
      this.$router.push("/rentalObjects");
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  background-color: black;
  height: 120px;
  justify-content: center;
  align-items: center;
}
.header {
  background-color: black;
  color: #deb76a;
  font-weight: 900;
  font-size: 40px;
}

.user-icon {
  width: 30px;
  height: 30px;
}

.car-icon {
  width: 140px;
  height: 90px;
  margin-right: 10px;
}

.login-text {
  color: black;
  font-size: 16px;
  font-weight: bold;
}

.login-button {
  display: flex;
  position: absolute;
  right: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2c977;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.logo-button {
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #c7a767;
}

.user-button {
  display: flex;
  position: absolute;
  left: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2c977;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.home-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2c977;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.line {
  height: 100px;
}
</style>
