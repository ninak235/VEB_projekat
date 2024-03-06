<template>
  <div class="one-manager" @click="selectManager">
    <img
      :src="userWithIcon.icon"
      alt="icon"
      class="icon"
    />
    <h3>{{ manager.name + " " + manager.lastName }}</h3>
    <h3 id="green">{{ "Available" }}</h3>
    <h3 id="points">Points: {{ manager.pointsNumber }}</h3>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "OneManager",
  props: {
    manager: {},
  },
  computed: {
    userWithIcon() {
      return {
        ...this.manager,
        icon:
          this.manager.userIcon && require(`../../assets/${this.manager.userIcon}`),
      };
    },
  },
  data() {
    return {};
  },
  methods: {
    selectManager() {
      this.$emit("manager-selected", this.manager);
    },
  },
};
</script>

<style scoped>
.one-manager {
  background-color: #f2c977;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
  height: 80%;
  cursor: pointer;
  width: 150px;
}

.icon {
  height: 60px;
  width: 60px;
}

#green {
  color: green;
}

#points {
  text-align: end;
}

.one-manager:hover {
  background-color: #c7a767; /* Change background color on hover */
}
</style>
