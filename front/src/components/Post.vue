<template>
  <div class="post-container">
    <div class="post-header">
      <img src="@/assets/profil1.jpeg" />
      <div class="post-info">
        <p class="name">{{ name }}</p>
        <p class="location">New York</p>
      </div>
      <p class="time">15 minutes ago</p>
    </div>
    <div class="image-container">
      <img class="picture" :src="img" />
      <div class="overlay">
        <i
          :class="{ 'bxs-heart': liked, selected: liked, 'bx-heart': !liked }"
          class="bx"
        ></i>
      </div>
    </div>
    <div class="infos">
      <p class="likes">
        <i
          :class="{ 'bxs-heart': liked, selected: liked, 'bx-heart': !liked }"
          class="bx"
        ></i>
        5.2k
      </p>
      <p class="comments"><i class="bx bx-message-rounded"></i> 32</p>
    </div>
    <p class="description">
      <strong>{{ name }} </strong>
      Saw the dark side of the moon to get to you
      <span class="hashtag">#instagram</span>
      <span class="hashtag">#instagramdaily</span>
      <span class="hashtag">#happy</span>
      <span class="hashtag">#vibe</span>
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({
    image: "feed1.jpg",
  }),
  props: {
    liked: Boolean,
    img: String,
    likes: Number,
    comments: Number,
    name: String,
  },
};
</script>

<style scoped>
.hashtag {
  color: #2f5782;
  margin: 0 2px;
  cursor: pointer;
  transition: color 300ms ease-in-out;
}

.hashtag:hover {
  color: #5091d6;
}
.post-info {
  display: flex;
  flex-direction: column;
  flex-grow: 4;
}

.post-header {
  display: flex;
  margin-bottom: 1rem;
}

.post-container {
  margin: 1rem;
  width: 30%;
  transition: all 300ms ease-in-out;
  min-width: 230px;
}
.image-container {
  border-radius: 20px;
  position: relative;
  margin-bottom: 0.7rem;
  cursor: pointer;
}
.overlay {
  border-radius: 20px;
  background: #000;
  transition: 0.5s ease;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffffff;
  font-size: 5rem;
}

.overlay i {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
}

.overlay:hover {
  opacity: 0.7;
}
.picture {
  width: 100%;
  border-radius: 20px;
  height: auto;
  display: block;
}

.infos {
  display: flex;
  justify-content: flex-start;
}

.post-header img {
  width: 35px;
  height: 35px;
  border-radius: 30px;
  padding: 2px;
  border: 2px solid #e64565;
  transition: all 600ms ease-in-out;
  cursor: pointer;
  margin-right: 0.4rem;
}

p.description {
  font-size: 14px;
}

p {
  margin: 4px 0;
  transition: all 300ms ease;
}

post-info {
  flex-grow: 4;
  text-align: left;
}

p.name {
  font-weight: 700;
  margin: 0;
}

p.location {
  font-weight: 500;
  margin: 0;
  color: #aeaeae;
}

p.time {
  color: #aeaeae;
  font-size: 12px;
  text-align: center;
}

p.likes,
p.comments {
  display: inline-block;
  position: relative;
  font-weight: 600;
  margin-left: 1rem;
}

i.selected {
  color: #e64565;
}

@media screen and (max-width: 1401px) {
  p {
    font-size: 14px;
  }

  .post-container {
    margin: 0.5rem;
    width: 45%;
  }
}

@media screen and (max-width: 933px) {
  .post-container {
    margin: 0.5rem;
    width: 95%;
  }
}
</style>
