<template>
  <div>
    <header-logo></header-logo>
    <router-view></router-view>
    <footer-info></footer-info>
  </div>
</template>

<script>
import headerLogo from "./components/HeaderLogo.vue";
import footerInfo from "./components/FooterInfo.vue";
export default {
  components: {
    "header-logo": headerLogo,
    "footer-info": footerInfo,
  },
  data() {
    return {};
  },
};
</script>
