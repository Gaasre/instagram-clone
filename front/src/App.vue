<template>
  <div class="container">
    <Sidebar :active="active" />
    <div class="body">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default {
  components: {
    Sidebar,
    Header
  }
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css";
@import "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap";

body {
  margin: 0;
  font-family: "Open Sans", sans-serif;
}

.container {
  display: flex;
  max-height: 100vh;
  height: 100%;
}

.body {
  padding: 1rem 4rem;
  overflow-y: auto;
  max-height: 100vh;
}
</style>
