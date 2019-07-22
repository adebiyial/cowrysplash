<template>
  <a v-bind:href="photo.imgSrc" class="photo-content content">
    <div class="photo-wrap" data-img="">
      <img
        class="photo normal"
        v-bind:src="photo.imgSrc"
        v-bind:alt="photo.imgDesc"
      />
    </div>
    <div class="author-details">
      <h3 class="author-name">{{ photo.authorName }}</h3>
      <p class="author-location">{{ photo.authorLocation }}</p>
    </div>
  </a>
</template>

<script>
export default {
  props: ["photo"]
};
</script>
