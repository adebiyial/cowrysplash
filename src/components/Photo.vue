<template>
  <a
    class="photo-content"
    v-bind:href="photo.photoSrcLarge"
    @click="previewImage"
  >
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
          v-bind:src="photo.photoSrcSmall"
          v-bind:alt="photo.photoDesc"
          v-bind:data-photoId="photo.id"
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
  updated() {
    console.log("UPDATED");
  },
  mounted() {
    // observe
    new IntersectionObserver(
      ([entry]) => {
        console.log(entry);
        // if (entry.intersectionRatio === 1) {
        // console.log(entry.target);
        // console.log(entry.target.querySelector("img").complete);
        // console.log("Anchor now in dom");
        // if (!entry.target.querySelector("img").complete) {
        //   const f = new IntersectionObserver(
        //     ([entry]) => {
        //       console.log(this.$el.querySelector("picture img").complete);
        //     },
        //     {
        //       root: this.$el,
        //       threshold: 1
        //     }
        //   );
        //   f.observe(this.$el.querySelector("picture"));
        //   console.log(f);
        // }
        // }
      },
      {
        root: null,
        threshold: 1
      }
    ).observe(this.$el);
    // on success emit. photo - gallery (if done loading and img in dom)
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
