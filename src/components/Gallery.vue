<template>
  <ul class="photos-list">
    <div class="new-search" v-if="isNewSearch">
      <h1>: (</h1>
      <h1>You have not searched for any photos.</h1>
      <p>Photos you search for will appear here. Go ahead, give it a shot.</p>
    </div>
    <div class="new-search" v-else-if="isSearching">
      <h1>searching...</h1>
    </div>
    <div v-else class="container">
      <li class="photos" v-for="photo in photos" v-bind:key="photo.id">
        <Photo
          v-bind:photo="photo"
          @preview-image="$emit('preview-image', photo.id)"
        />
      </li>
    </div>
  </ul>
</template>

<script>
import Photo from "./Photo";

export default {
  name: "Gallery",
  props: ["photos", "isNewSearch", "isSearching", "isDoneSearching"],
  components: {
    Photo
  }
};
</script>
