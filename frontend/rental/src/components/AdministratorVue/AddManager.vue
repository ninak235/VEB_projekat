<template>
  <div class="manager">
    <div class="header">
      <h1>Menagers</h1>
    </div>
    <div class="manager-list">
      <OneManager
        v-for="manager in managers"
        :key="manager.id"
        :manager="manager"
      />
    </div>
    <div></div>
  </div>
</template>

<script>
import OneManager from "./OneManager.vue";
import axios from "axios";

export default {
  components: {
    OneManager,
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      managers: [],
    };
  },

  methods: {
    async getData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/availableManagers"
        );
        this.managers = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
  border-bottom: 1px solid #ff4081;
}

.header h1 {
  color: #ff4081;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.manager-list {
  padding: 10px;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 500px));
  grid-gap: 1px;
  overflow-y: auto;
  scrollbar-width: thin;
}
</style>
