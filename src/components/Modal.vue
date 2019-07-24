<template>
  <div
    class="modal-root"
    v-bind:id="this.show && 'show'"
    @click="$emit('close-modal')"
  >
    <div class="modal">
      <div class="modal-img-container">
        <button
          class="close-modal-btn"
          title="close modal"
          @click="$emit('close-modal')"
        ></button>
        <div
          class="full-image-wrap"
          v-bind:style="styleObj"
          @click="$emit('close-modal')"
        ></div>
        <div class="modal-photo-details">
          <span class="author-name">{{ authorName }}</span>
          <span class="photo-location">{{ photoLocation }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["photo"],
  data() {
    return {
      styleObj: {
        backgroundImage: `url(${this.photo.photoSrcLarge})`
      },
      authorName: this.photo.authorName,
      photoLocation: this.photo.photoLocation,
      show: true
    };
  }
};
</script>

<style scoped lang="scss">
@import "../styles/modal.scss";
</style>
