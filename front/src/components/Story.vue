<template>
  <div class="image-container">
    <img src="@/assets/feed1.jpg" />
    <div class="overlay">
      <i class="bx bx-play"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: String,
    name: String,
  },
};
</script>

<style scoped>
.image-container {
  border-radius: 80px;
  height: 80px;
  width: 80px;
  min-width: 80px;
  position: relative;
  cursor: pointer;
  padding: 6px;
  border: 2px solid #e64565;
  margin: 0 .7rem;
}
.overlay {
  border-radius: 80px;
  background: #000;
  transition: 0.5s ease;
  opacity: 0;
  padding: 6px;
  width: calc(100% - 24px);
  height: calc(100% - 24px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffffff;
  font-size: 2rem;
}

.overlay i {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
}

.overlay:hover {
  opacity: 0.5;
}

img {
  width: 100%;
  border-radius: 80px;
  height: 100%;
  display: block;
}
</style>
