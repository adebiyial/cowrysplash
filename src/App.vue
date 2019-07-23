<template>
  <div id="app" class="photos-section">
    <Header
      @search-photos="populatePhotoList"
      @is-searching="resolveIsSearchingState"
      @is-done-searching="resolveIsDoneSearchingState"
      @is-new-search="resolveIsNewSearchState"
    />
    <Gallery
      v-bind:photos="photos"
      v-bind:isNewSearch="isNewSearch"
      v-bind:isSearching="isSearching"
      v-bind:isDoneSearching="isDoneSearching"
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
      isNewSearch: true,
      isSearching: false,
      isDoneSearching: false
    };
  },
  methods: {
    populatePhotoList(photoDetails) {
      this.photos = [...photoDetails];
    },
    previewImage(id) {
      this.photo = this.photos.find(photo => photo.id === id);
      this.showModal = true;
    },
    closeImagePreviewModal() {
      this.showModal = false;
    },
    resolveIsSearchingState(isSearching) {
      this.isSearching = isSearching;

      if (isSearching) {
        this.isNewSearch = false;
        this.isDoneSearching = false;
      }
    },
    resolveIsDoneSearchingState(isDoneSearching) {
      this.isDoneSearching = isDoneSearching;

      if (isDoneSearching) {
        this.isSearching = false;
        this.isNewSearch = false;
      }
    },
    resolveIsNewSearchState(isNewSearch) {
      this.isNewSearch = isNewSearch;

      if (isNewSearch) {
        this.isSearching = false;
        this.isDoneSearching = false;
      }
    }
  }
};
</script>

<style>
@import "./styles/_normalize.scss";
@import "./styles/global.scss";
</style>
