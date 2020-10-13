<template>
  <div>
    <h1>Stories</h1>
    <div class="stories">
      <Story />
      <Story />
      <Story />
      <Story />
    </div>
    <h1>Feed</h1>
    <div class="feed">
      <Post
        :key="item.id"
        v-for="item in data"
        :img="item.img"
        :name="item.name"
        :liked="item.liked"
      />
    </div>
  </div>
</template>

<script>
import Post from "../components/Post";
import Story from "../components/Story";

export default {
  components: {
    Post,
    Story
  },
  data: () => ({
    active: "feed",
    data: [
      {
        id: 1,
        name: "Dom.Hill",
        img: require("../assets/feed1.jpg"),
        liked: true,
      },
      {
        id: 2,
        name: "Dom.Hill",
        img: require("../assets/feed1.jpg"),
        liked: true,
      },
      {
        id: 3,
        name: "Dom.Hill",
        img: require("../assets/feed2.jpg"),
        liked: true,
      },
      {
        id: 4,
        name: "Dom.Hill",
        img: require("../assets/feed2.jpg"),
        liked: true,
      },
      {
        id: 5,
        name: "Dom.Hill",
        img: require("../assets/feed1.jpg"),
        liked: false,
      },
      {
        id: 6,
        name: "Dom.Hill",
        img: require("../assets/feed2.jpg"),
        liked: true,
      },
      {
        id: 7,
        name: "Dom.Hill",
        img: require("../assets/feed2.jpg"),
        liked: true,
      },
      {
        id: 8,
        name: "Dom.Hill",
        img: require("../assets/feed1.jpg"),
        liked: true,
      },
      {
        id: 9,
        name: "Dom.Hill",
        img: require("../assets/feed2.jpg"),
        liked: true,
      },
    ],
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stories {
  display: flex;
  overflow-x: auto;
  padding: 1rem 0;
}

.feed {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
