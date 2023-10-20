<template>
  <div class="main">
    <router-view class="content" />
  </div>
</template>

<script>

import axios from 'axios';

const myApi = axios.create({
  withCredentials: true,
});
export default {
  name: 'HomeView',
  components: {
  },
  data: () => {
    return {
      myApi,
    };
  },
  async created() {
  },
  methods: {

  },
};
</script>

<style module>
#app {
  font-family: Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
</style>

