<template>
  <a class="photo-content" v-bind:href="photo.photoSrcLarge">
    <div class="photo-wrap">
      <picture>
        <source
          v-bind:srcset="photo.photoSrcLarge"
          media="(min-width: 700px)"
        />
        <source
          v-bind:srcset="photo.photoSrcSmall"
          media="(max-width: 700px)"
        />
        <img
          class="photo normal"
          @click="previewImage"
          v-bind:src="photo.photoSrcSmall"
          v-bind:alt="photo.photoDesc"
          v-bind:data-photoId="photo.id"
        />
      </picture>
    </div>
    <div class="author-details">
      <h3 class="author-name">{{ photo.authorName }}</h3>
      <p class="photo-location">{{ photo.photoLocation }}</p>
    </div>
  </a>
</template>

<script>
export default {
  props: ["photo"],
  mounted() {
    // const c = document.querySelector(".photos-list .container");
    // console.log(window.getComputedStyle());
  },
  methods: {
    previewImage(e) {
      // The browser tries to handle the image preview. Stop it!
      e.preventDefault();

      this.$emit("preview-image", this.photo.id);
    }
  }
};
</script>
