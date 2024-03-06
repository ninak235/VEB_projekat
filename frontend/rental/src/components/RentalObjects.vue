<template>
  <div class="rent-car">
    <div class="searching">
      <form v-on:submit.prevent="searchForm" class="search-inputs">
        <img src="../assets/loop.png" alt="Search Icon" />
        <input type="text" v-model="searchName" placeholder="Name" />
        <input
          type="text"
          v-model="searchVehichleType"
          placeholder="Vehicle type"
        />
        <input type="text" v-model="searchLocationName" placeholder="City" />
        <input type="text" v-model="searchGrade" placeholder="Grade" />
      </form>
    </div>
    <div class="filterAndSort">
      <button
        v-if="isAdmin"
        type="submit"
        class="add-button"
        @click="createObject"
      >
        <img src="../assets/add3.png" alt="Add Icon" class="add-icon" />
        <h3>Add object</h3>
      </button>
      <button
        v-if="isCustomer"
        type="submit"
        class="add-button"
        @click="rentACar"
      >
        <img src="../assets/buy.png" alt="Add Icon" class="add-icon" />
        <h3>Rent a car</h3>
      </button>
      <button
        v-if="isManager"
        type="submit"
        class="add-button"
        @click="myRental"
      >
        <img src="../assets/buy.png" alt="Add Icon" class="add-icon" />
        <h3>Orders from my rental</h3>
        </button>
      <div class="searching2">
        <form v-on:submit.prevent="filterForm" class="search-inputs">
          <select id="sortParamter1" v-model="filter.transmissionType">
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                </select>

          <select id="sortParamter2" v-model="filter.fuelType">
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                </select>
          <button type="submit" class="sort-button">
            <img
              src="../assets/filterYellow.png"
              alt="Filter Icon"
              class="user-icon"
            />
          </button>
        </form>
          <form v-on:submit.prevent="getData" class="sort-button">
            <button type="submit" class="filter-button">
              <img src="../assets/reload.png" alt="Restart Icon" class="user-icon" />
            </button>
          </form>
        </div>
      <div class="sort">
        <div>
          <select id="sortParamter" v-model="sortingParam" required>
            <option value="grade">Grade</option>
            <option value="location">Location</option>
            <option value="object name">Object name</option>
          </select>
        </div>
      </div>
      <button @click="sortAsc" class="sort-button">
        <img src="../assets/upArrow.png" alt="Sort Icon" class="user-icon" />
      </button>
      <button @click="sortDesc" class="sort-button">
        <img src="../assets/downArrow.png" alt="Sort Icon" class="user-icon" />
      </button>
    </div>
    <div class="car-list">
      <RentCar v-for="car in filteredCars" :key="car.id" :car="car" />
    </div>
  </div>
</template>

<script>
import RentCar from "./RentCar.vue";
const UserRole = require("../../../../backend/model/user_role");
import axios from "axios";

export default {
  components: {
    RentCar,
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      cars: [],

      searchName: "",
      searchVehichleType: "",
      searchLocationName: "",
      searchGrade: "",
      filter: {
        transmissionType: "",
        fuelType: "",
      },
      sortingParam: "",
      isAdmin: false,
      isCustomer: false,
      isManager: false,
      userData: null,
    };
  },
  computed: {
    filteredCars: function () {
      return this.cars.filter((car) => {
        return (
          car.name.toLowerCase().match(this.searchName.toLowerCase()) &&
          car.location.address.city
            .toLowerCase()
            .match(this.searchLocationName.toLowerCase()) &&
          car.grade.toString().match(this.searchGrade) &&
          ((car.vehicles && this.searchVehichleType === "") ||
            car.vehicles.some((vehicle) =>
              vehicle.vehicleType
                .toLowerCase()
                .match(this.searchVehichleType.toLowerCase())
            ))
        );
      });
    },
  },
  methods: {
    async getData() {
      const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      this.userData = response.data;
      const userRole = localStorage.getItem("userRole");
      if (userRole === UserRole.ADMINISTRATOR) {
        this.isAdmin = true;
      }
      if (userRole === UserRole.CUSTOMER) {
        this.isCustomer = true;
      }
      if(userRole === UserRole.MANAGER){
        this.isManager = true;
      }
      try {
        const response = await axios.get(
          "http://localhost:3000/rentalObjects/sortedCars"
        );
        this.cars = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    redirectToLoginPage() {
      this.$router.push("/login");
    },

    async sortAsc() {
      try {
        const response = await axios.get(
          "http://localhost:3000/rentalObjects/sortedAsc",
          {
            params: {
              sortingParam: this.sortingParam,
            },
          }
        );
        this.cars = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async sortDesc() {
      try {
        const response = await axios.get(
          "http://localhost:3000/rentalObjects/sortedDesc",
          {
            params: {
              sortingParam: this.sortingParam,
            },
          }
        );
        this.cars = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async filterForm() {
      try {
        const response = await axios.get(
          "http://localhost:3000/rentalObjects/filter",
          { params: this.filter }
        );
        this.cars = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    createObject() {
      this.$router.push("/createObject");
    },
    rentACar() {
      this.$router.push("/rentingCar");
    },
    myRental() {
        this.$router.push("/managerOrders/" + this.userData.rentalObject.id);
    },
  },
};
</script>
<style scoped>
.rent-car {
  width: 100%;
  display: flex;

  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
  background-color: black;
}

.filterAndSort {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.searching {
  margin-bottom: 20px;
  margin-top: 20px;
  margin-right: 450px;
  margin-right: auto;
}

.searching2 {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.search-inputs {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  height: 35px;
}

h3 {
  color: #f2c977;
}

.login-button {
  display: flex;
  align-content: flex-end;
  background-color: pink;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #ff4081;
}

.sort {
  display: flex;
}
.sort-button {
  display: flex;
  align-content: flex-end;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 40px;
  transition: background-color 0.3s;
}

.sort-button:hover {
  background-color: lightgray;
}

#sortParamter {
  background-color: #f2c977;
  color: black;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 120px;
}

#sortParamter1 {
  background-color: #f2c977;
  color: black;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 120px;
}

#sortParamter2 {
  background-color: #f2c977;
  color: black;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 120px;
}

.user-icon {
  width: 30px;
  height: 30px;
}

.add-icon {
  width: 40px;
  height: 40px;
}

.filter-button {
  display: flex;
  align-content: flex-end;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 40px;
  transition: background-color 0.3s;
}

.sort-button{
  display: flex;
  align-content: flex-end;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 40px;
  transition: background-color 0.3s;
  margin-right: 5px;
}

.sort-button:hover {
  background-color: lightgray;
}

.filter-button:hover {
  background-color: lightgray;
}

.add-button {
  background-color: transparent;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin-right: 20px;
}

.add-button:hover {
  background-color: #c7a767;
}

.login-text {
  color: black;
  font-size: 16px;
  font-weight: bold;
}

.car-list {
  padding: 2rem;
  height: 100%;
  width: 95%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  overflow-y: auto;
}

.car-list::-webkit-scrollbar {
  width: 8px;
}

.car-list::-webkit-scrollbar-thumb {
  background-color: #ff4081;
  border-radius: 4px;
}

.car-list::-webkit-scrollbar-track {
  background-color: #f8f8f8;
  border-radius: 4px;
}

.rent-car-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.rent-car-item:hover {
  transform: translateY(-5px);
}

.rent-car-item .image {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.rent-car-item .image img {
  max-width: 100%;
  height: auto;
}

.rent-car-item .bottom h3 {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #555;
}
</style>