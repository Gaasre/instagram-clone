<template>
  <div class="navbar">
    <img class="logo" src="@/assets/instagram.png" />
    <div class="profil">
      <img src="@/assets/profil1.jpeg" class="profil__picture" />
      <h3>Kate Lingard</h3>
      <p>@katy69</p>
    </div>
    <div class="stats">
      <div class="stat">
        <p class="number">46</p>
        <p class="label">Posts</p>
      </div>
      <div class="stat">
        <p class="number">2.8k</p>
        <p class="label">Followers</p>
      </div>
      <div class="stat">
        <p class="number">536</p>
        <p class="label">Following</p>
      </div>
    </div>
    <div class="menu">
      <ul>
        <li :class="{ selected: active === 'feed' }"><i class="bx bxs-dashboard"></i> Feed</li>
        <li :class="{ selected: active === 'explore' }"><i class="bx bx-search"></i> Explore</li>
        <li :class="{ selected: active === 'direct' }"><i class="bx bx-send"></i> Direct</li>
      </ul>
    </div>
    <div class="extra">
      <div class="inner"><i class="bx bx-log-out"></i> Logout</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: String,
  }
};
</script>

<style scoped>
.navbar .extra {
  position: absolute;
  bottom: 10px;
  padding: 2rem 0;
  width: 100%;
  border-top: 1px solid #ededed;
}

.extra .inner {
  font-weight: 600;
  color: #363636;
  cursor: pointer;
  transition: all 400ms ease;
  padding-left: 2rem;
}

.extra .inner:hover {
  color: #eb8fac;
}

.inner i {
  margin-right: 1rem;
  font-size: 24px;
  position: relative;
  top: 5px;
}

.menu li {
  padding: 0.8rem 0;
  font-weight: 600;
  color: #363636;
  cursor: pointer;
  transition: all 400ms ease;
}

.menu li:hover {
  color: #eb8fac;
}

.menu li i {
  margin-right: 1rem;
  font-size: 24px;
  position: relative;
  top: 5px;
}

.menu li.selected {
  font-weight: 700;
  color: #e75d89;
  border-right: 3px solid #e75d89;
}

.menu {
  margin-top: 1.5rem;
  padding-left: 2rem;
}

.menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.navbar {
  position: relative;
  background-color: #f9f9f9;
  max-width: 350px;
  width: 350px;
  height: 100%;
  min-height: 100vh;
  transition: all 300ms ease-in-out;
}

.navbar .logo {
  margin: 2rem;
  width: 120px;
}

.profil {
  text-align: center;
  margin: 1rem 0;
}

img.profil__picture {
  height: 100px;
  width: 100px;
  padding: 6px;
  border: 2px solid #e64565;
  border-radius: 80px;
  margin-bottom: 1rem;
  transition: all 600ms ease-in-out;
  cursor: pointer;
}

img.profil__picture:hover {
  border-color: #f28e68;
}

.profil h3 {
  margin: 0;
  font-weight: 700;
}

.profil p {
  margin: 0.5rem 0;
  color: #aeaeae;
}

.stats {
  display: flex;
  justify-content: center;
}

.stat {
  padding: 1rem 1.4rem;
}

.stat .number {
  font-weight: 600;
  margin: 6px 0;
  font-size: 16px;
}

.stat .label {
  color: #b3b3b3;
  margin: 0;
  font-size: 14px;
}

.stats .stat:not(:last-child) {
  border-right: 1px solid #ededed;
}

@media screen and (max-width: 690px) {
  .navbar {
    display: none;
  }
}
</style>
