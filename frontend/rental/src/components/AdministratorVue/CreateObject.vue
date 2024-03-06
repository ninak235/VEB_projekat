<template>
  <div class="backgorund">
    <h1>Create rental object</h1>
    <div class="horizontal">
      <div class="create-form">
        <form>
          <h2>First step: fill fields</h2>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="object.name" required />

          <label for="location">Location:</label>
          <select id="location" v-model="object.selectedLocation" required>
            <option
              v-for="location in locations"
              :value="location"
              :key="location.id"
            >
              {{ location.address.street + ", " + location.address.city }}
            </option>
          </select>
          <label>Logo:</label>
          <input
            type="file"
            name="logoFile"
            id="logoFile"
            accept="image/*"
            @change="handleFileUpload"
            class="custom-file-input"
          />
          <label for="work">Work start and end time:</label>
          <div id="working">
            <input
              type="text"
              id="work"
              v-model="object.workStart"
              placeholder="08:00"
              required
            />
            <input
              type="text"
              id="work"
              v-model="object.workEnd"
              placeholder="22:00"
              required
            />
          </div>
        </form>
      </div>
      <div>
        <button type="submit" @click="submitForm">
          <img src="../../assets/next.png" class="icon" />
          <h2>NEXT</h2>
        </button>
      </div>
      <div>
        <div v-if="hasManager && clicked">
          <h2>Second step: choose manager</h2>
          <div class="wraps">
            <OneManager
              v-for="manager in managers"
              :key="manager.id"
              :manager="manager"
              @manager-selected="selectManager"
              :class="{ selected: selectedManager === manager }"
            />
          </div>
          <button id="chooseButton" type="submit" @click="chooseManager">
            Choose
          </button>
        </div>
        <div v-else-if="!hasManager && clicked">
          <h2>Second step: create manager</h2>
          <ManagerRegistration
            :newManager="newManager"
            @manager-created="createManager"
          />
        </div>
        <div v-else-if="!clicked">
          <p>After this, you will choose a manager for created object</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OneManager from "./OneManager.vue";
import ManagerRegistration from "./ManagerRegistration.vue";
import axios from "axios";

export default {
  components: {
    OneManager,
    ManagerRegistration,
  },
  data() {
    return {
      hasManager: false,
      clicked: false,
      object: {
        name: "",
        workStart: "",
        workEnd: "",
        selectedLocation: "",
        logoPath: "",
      },
      locations: [],
      managers: [],
      selectedManager: null,
      newManager: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    selectManager(manager) {
      this.selectedManager = manager;
    },
    selectImage(image) {
      this.selectedImage = image;
    },
    async getData() {
      try {
        const response = await axios.get("http://localhost:3000/locations");
        this.locations = response.data;
      } catch (error) {
        if (error.response.status === 401) {
          console.error(error);
        }
      }
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/users/availableManagers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.managers = response.data;
        if (this.managers.length != 0) {
          this.hasManager = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    handleFileUpload(e) {
      const file = e.target.files[0];
      this.object.logoPath = file.name;
    },
    submitForm() {
      if (
        !this.object.name ||
        !this.object.selectedLocation ||
        !this.object.logoPath ||
        !this.object.workStart ||
        !this.object.workEnd
      ) {
        alert("Please fill in all the required fields.");
        return;
      }
      const regex = /^(?:[01]\d|2[0-4]):[0-5]\d$/;
      if (
        !regex.test(this.object.workStart) ||
        !regex.test(this.object.workEnd)
      ) {
        console.log("not good");
        alert("Please fill work and start time like it's asked");
        return false;
      }

      this.clicked = true;
      axios
        .post("http://localhost:3000/rentalObjects", this.object)
        .then((response)=>{
          this.object = response.data;
        }
        )
        .catch((error) => {
          alert(error.response.data.error);
        });
    },
    chooseManager() {
      this.selectedManager.rentalObject = this.object;
      const token = localStorage.getItem("token");
      axios
        .put("http://localhost:3000/users/menagerUpdate", this.selectedManager, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          alert("Rental object successfully added!");
          this.$router.push("/rentalObjects");
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    },
    createManager(manager) {
      console.log(manager.name);
      this.newManager = manager;
      this.newManager.rentalObject = this.object;
      axios
        .post("http://localhost:3000/auth/register", this.newManager)
        .then(() => {
          alert("Rental object successfully added!");
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
      
      this.$router.push("/rentalObjects");
    },
  },
};
</script>

<style scoped>
.create-form {
  width: 300px;
  height: 410px;
  padding: 20px;
  border-radius: 10px;
  background-color: transparent;
}

h2 {
  color: #deb76a;
  text-align: center;
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

select {
  width: 90%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
}
input[type="text"] {
  width: 85%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
}

button[type="submit"] {
  background-color: transparent;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.icon {
  width: 100px;
}

button[type="submit"]:hover {
  background-color: #cbcbc8;
}

#working {
  display: flex;
}

#work {
  margin-right: 20px;
}

.horizontal {
  width: 95%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.backgorund {
  background-color: black;
  height: 100%;
  display: flex;
  flex-direction: column;
}

h1 {
  color: #deb76a;
  margin: auto;
  text-decoration: underline;
}
.selected {
  background-color: rgb(72, 69, 62);
  /* Add any other styles to highlight the selected card */
}

#logoFile {
  margin-bottom: 15px;
  color: #deb76a;
  cursor: pointer;
}

#chooseButton {
  background-color: #deb76a;
  color: black;
  width: 150px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

p {
  color: #deb76a;
  width: 200px;
  text-align: center;
  font-size: 30px;
}

.wraps {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
</style>
