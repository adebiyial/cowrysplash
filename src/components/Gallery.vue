<template>
  <ul class="photos-list" ref="{this.gridRef}">
    <div class="container">
      <li class="photos" v-for="photo in photos" v-bind:key="photo.id">
        <Photo v-bind:photo="photo" />
      </li>
    </div>
  </ul>
</template>

<script>
import { uuid } from "../utils/fx";
import Photo from "./Photo";

export default {
  name: "Gallery",
  props: ["photos"],
  components: {
    Photo
  }
};
</script>
