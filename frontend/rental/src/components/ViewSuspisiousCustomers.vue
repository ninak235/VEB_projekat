<template>
<div class="hole-container">
  
    <h2 class="label">Customers who are suspisious</h2>
    <div class="view-users">
    <div v-for="user in users" :key="user.id" class="user-item">
      <form>
        <div class="horizontal">
            <img
            :src="getUserIcon(user.userIcon)"
            alt="User icon"
            class="img"
          />
          <div class="border-container">
        <div class="form-group">
          <label class="underline" for="userRole">User role:</label>
          <span class="label">{{ user.userRole }}</span>
        </div>
        <div class="form-group">
          <label class="underline" for="username">Username:</label>
          <span class="label">{{ user.username }}</span>
        </div>
        <div class="form-group">
          <label class="underline" for="name">Name:</label>
          <span class="label">{{ user.name }}</span>
        </div>
        <div class="form-group">
          <label class="underline" for="lastName">Last Name:</label>
          <span class="label">{{ user.lastName }}</span>
        </div>
        <div class="form-group">
          <label class="underline" for="dateOfBirth">Date of Birth:</label>
          <span class="label">{{ user.dateOfBirth }}</span>
        </div>
        <div class="form-group">
            <label class="underline" for="pointsNumber">Points number:</label>
            <label class="label">{{ user.pointsNumber }}</label>
          </div>
          <div class="form-group">
            <label class="underline" for="customerType">Customer type:</label>
            <label class="label">{{ user.customerType.nameType }}</label>
          </div>
          <button type="button" class="button-block" @click="blockUser(user)">
                  <img src="../assets/block.png" alt="Sort Icon" class="user-block" />
                </button>
        </div>
         </div>
      </form>
    </div>
   
  </div>
</div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      users: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/users/suspisiousCustomers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
        this.users = response.data; // Assign the fetched data to the `users` property
        } catch (error) {
            console.error(error);
        }
    },
    getUserIcon(userIcon) {
      if (userIcon) {
        return require(`../assets/${userIcon}`);
      } else {
        // Return a default icon if userIcon is not provided
        return null;
      }
    },
    async blockUser(user) {
      user.blocked = true;
      console.log(user.blocked);
      const token = localStorage.getItem("token");
      axios
        .put(`http://localhost:3000/users`, user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          alert("Customer blocked successfully.");
          this.$router.push("/suspisiousCustomers");
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    }

  }
};
</script>

<style scoped>
.hole-container {
  background-color: black;
  padding: 20px;
  color: #f2c977;
  text-decoration: underline;
  text-align: center;
}

.view-users {
  color: black;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border: 2px;
  border-radius: 4px;
  gap: 40px;
  
}

.border-container{
    border: 4px solid #cd853f;
    background-color: #f2c977;
    padding: 10px;
    text-align: left;
}

.user-item {
  margin-bottom: 20px;
}

.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.form-group {
  margin-bottom: 10px;
}

.underline {
  text-decoration: underline;
}

.label {
  font-weight: bold;
}

span {
  margin-left: 5px;
}

.button-block{
  color: transparent;
  background-color: transparent;
  border: none;
  margin-left: 65px;
  cursor: pointer;
}

.button-block:hover{
  background-color: peru;
}
</style>