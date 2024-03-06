<template>
    <div class="backround-container">
      
        <div class="hole-container">
          <img src="../../assets/line1.png" id="left" />
            
            <form v-on:submit.prevent="changeVehicle">
              <h2 id="title">Change vehicle</h2>
                <label for="brand">Brand: </label>
                <input type="text" id="brand" v-model="form.brand" required>

                <label for="model">Model: </label>
                <input type="text" id="model" v-model="form.model" required>

                <label for="price">Price: </label>
                <input type="number" id="price" v-model="form.price" required>

                <label for="ttype">Transmission type: </label>
                <select id="ttype" v-model="form.transmissionType" required>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                </select>

                <label for="type">Type: </label>
                <select id="type" v-model="form.vehicleType" required>
                    <option value="Car">Car</option>
                    <option value="Van">Van</option>
                    <option value="MobileHome">Mobile home</option>
                </select>

                <label for="fuel">Fuel type: </label>
                <select id="fuel" v-model="form.fuelType" required>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Eletric">Electric</option>
                </select>

                <label for="consumption">Consumption: </label>
                <input type="number" id="consumption" v-model="form.consumption" required>

                <label for="doors">Number of doors: </label>
                <input type="number" id="doors" v-model="form.doorNumber" required>

                <label for="capacity">Capacity: </label>
                <input type="number" id="capacity" v-model="form.personNumber" required>
            
                <label for="image">Change image: </label>
                <div class="image-input">
                  <input type="file" name="logoFile" id="logoFile" accept="image/*"
                    @change="handleFileUpload"
                    class="custom-file-input">
                </div>

                <label for="description">Description: </label>
                <textarea id="description" v-model="form.description"></textarea>

                <button type="submit">Change vehicle</button>

            </form>
  
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default{
    data() {
        return {
            vehicleId: this.$route.params.idV,
            rentalCarId: this.$route.params.idC,
            form: {
                brand: "",
                model: "",
                price: 0,
                vehicleType: "",
                object: null,
                transmissionType: "",
                fuelType: "",
                consumption: "",
                doorNumber: 0,
                personNumber: 0,
                description: "",
                image: "",
                vehicleStatus: "Available"
            }
        }
    },
    methods:{
        async getData() {
        try {
            const response = await axios.get("http://localhost:3000/vehicles/"+ this.vehicleId);
            const vehicleData = response.data;
            this.form.brand = vehicleData.brand;
            this.form.model = vehicleData.model;
            this.form.price = vehicleData.price;
            this.form.vehicleType = vehicleData.vehicleType;
            this.form.object = vehicleData.object;
            this.form.transmissionType = vehicleData.transmissionType;
            this.form.fuelType = vehicleData.fuelType;
            this.form.consumption = vehicleData.consumption;
            this.form.doorNumber = vehicleData.doorNumber;
            this.form.personNumber = vehicleData.personNumber;
            this.form.description = vehicleData.description;
            this.form.image = vehicleData.image;
            this.form.vehicleStatus = vehicleData.vehicleStatus;
        } catch (error) {
            if (error.response.status === 401) {
            this.$router.push("/managerRentals/" + this.rentalCarId);
            }
            console.error(error);
        }
    },
    changeVehicle() {
       if (
          !this.form.brand ||
          !this.form.model ||
          !this.form.price ||
          !this.form.vehicleType ||
          !this.form.transmissionType ||
          !this.form.fuelType ||
          !this.form.consumption ||
          !this.form.doorNumber ||
          !this.form.personNumber ||
          !this.form.description ||
          !this.form.image ||
          !this.form.vehicleStatus
        ) {
          alert("Please fill in all the required fields.");
          return;
        }
      axios
        .put(`http://localhost:3000/rentalObjects/vehicleUpdated/${this.vehicleId}/${this.rentalCarId}`, this.form)
        
        .then(() => {
          alert("Vehicle updated successfully.");
          this.$router.push("/managerRental/" + this.rentalCarId);
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    },
    handleFileUpload(e) {
      const file = e.target.files[0];
      this.form.image = file.name;
    },
    },
    mounted(){
        this.getData();
    }
};
</script>

<style scoped>
.backround-container{
  background-color: black;
}


.hole-container {
  display: flex;
  gap:15px;
  max-width: 350px;
  margin: 0 auto;
  background-color: black;
  padding: 20px;
  border-radius: 8px;
  font-style: italic;
  font-family: Arial, sans-serif;
}

#left {
  height: 400px;
  width: 3000px;
  margin-top: 250px;
}

h2#title {
  color: #f2c977;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  text-decoration: underline;
}



label {
  display: block;
  margin-bottom: 5px;
  color: #f2c977;
}

input[type="text"],
input[type="number"],
textarea,
select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 15px;
}

form {
  margin-top: 20px;
}

button[type="submit"] {
  background-color: #f2c977;
  color: black;
  font-size: 17px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 60px;
}

button[type="submit"]:hover {
  background-color: peru;
}

textarea {
  resize: vertical;
  height: 100px;
}

.image-input {
  display: flex;
  align-items: center;
}

.button-image {
  background-color: #ff4081;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.button-image:hover {
  background-color: #e91e63;
}

.image-input input[type="text"] {
  flex-grow: 1;
}

.login-link {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
  color: white;
}
</style>