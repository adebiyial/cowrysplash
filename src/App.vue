<template>
  <div id="app" class="photos-section">
    <Header @search-photos="populatePhotoList" />
    <Gallery v-bind:photos="photos" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Gallery from "./components/Gallery.vue";

export default {
  name: "app",
  components: {
    Header,
    Gallery
  },
  data() {
    return {
      photos: []
    };
  },
  methods: {
    populatePhotoList(photoDetails) {
      this.photos = [...photoDetails];
    }
  }
};
</script>

<style>
@import "./styles/global.scss";
</style>
