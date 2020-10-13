<template>
  <div class="header">
      <div></div>
    <button class="gradient-button">
      <i class="bx bx-plus-circle"></i> Add photo
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.gradient-button {
  background-image: linear-gradient(
    45deg,
    rgba(226, 55, 106, 1) 0%,
    rgba(238, 111, 89, 1) 50%,
    rgba(251, 169, 71, 1) 100%
  );
  color: #ffffff;
  font-weight: 700;
  text-align: center;
  padding: 0.5rem 1.2rem 0.7rem 1.2rem;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.gradient-button:hover {
  color: #f8dfda;
}

.gradient-button i {
  position: relative;
  font-size: 20px;
  top: 3px;
}
</style>
