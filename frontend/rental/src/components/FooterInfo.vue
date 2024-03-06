<template>
  <nav>
    <img src="../assets/goldLine3.jpg" class="line" />
    <div class="down">
      <h3>All rights reserved® 2023</h3>

      <div class="images">
        <img src="../assets/fb-modified.png" class="icon" />
        <img src="../assets/yt-modified.png" class="icon" />
        <img src="../assets/wa-modified.png" class="icon" />
        <img src="../assets/ig-modified.png" class="icon" />
      </div>
      <button @click="logout" class="user-button">
        <img src="../assets/logout.png" alt="User Icon" class="user-icon" />
        <span class="login-text">Log out</span>
      </button>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
nav {
  display: flex;
  background-color: black;
  height: 120px;
  flex-direction: column;
}
h3 {
  color: #deb76a;
  position: relative;
  left: 30px;
  top: 0px;
}
.line {
  width: 100%;
  height: 40px;
}

.icon {
  width: 40px;
  height: 40px;
}

.user-icon {
  width: 30px;
  height: 30px;
}
.down {
  display: flex;
  justify-content: space-between;
}

.login-text {
  color: black;
  font-size: 16px;
  font-weight: bold;
}

.user-button {
  position: relative;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2c977;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-button:hover {
  background-color: #c7a767;
}

.images {
  display: flex;
  position: relative;
  right: 30px;
  gap: 15px;
}
</style>
