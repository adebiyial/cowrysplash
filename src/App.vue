<template>
  <div id="app" class="photos-section">
    <Header @search-photos="populatePhotoList" />
    <Gallery
      v-bind:photos="photos"
      v-bind:newSearch="newSearch"
      @preview-image="previewImage"
    />
    <Modal
      v-if="this.showModal"
      v-bind:photo="photo"
      @close-modal="closeImagePreviewModal"
    />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Gallery from "./components/Gallery.vue";
import Modal from "./components/Modal.vue";

export default {
  name: "app",
  components: {
    Header,
    Gallery,
    Modal
  },
  data() {
    return {
      photos: [],
      showModal: false,
      photo: {},
      newSearch: true
    };
  },
  methods: {
    populatePhotoList(photoDetails) {
      this.photos = [...photoDetails];
      this.newSearch = false;
    },
    previewImage(id) {
      this.photo = this.photos.find(photo => photo.id === id);
      this.showModal = true;
    },
    closeImagePreviewModal() {
      this.showModal = false;
    }
  }
};
</script>

<style>
@import "./styles/global.scss";
@import "./styles/_normalize.scss";
</style>
