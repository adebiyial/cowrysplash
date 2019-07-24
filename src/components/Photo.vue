<template>
  <a class="photo-content" :href="photo.photoSrcLarge" @click="previewImage">
    <div class="photo-wrap">
      <picture>
        <source :srcset="photo.photoSrcLarge" media="(min-width: 700px)" />
        <source :srcset="photo.photoSrcSmall" media="(max-width: 700px)" />
        <img
          class="photo normal"
          :src="photo.photoSrcSmall"
          :alt="photo.photoDesc"
          :data-photoId="photo.id"
        />
      </picture>
    </div>
    <div class="author-details">
      <h2 class="author-name">{{ photo.authorName }}</h2>
      <p class="photo-location">{{ photo.photoLocation }}</p>
    </div>
  </a>
</template>

<script>
export default {
  props: ["photo", "isImgInDom"],
  methods: {
    previewImage(e) {
      // The browser tries to handle the image preview. Stop it!
      e.preventDefault();

      this.$emit("preview-image", this.photo.id);
    }
  }
};
</script>
