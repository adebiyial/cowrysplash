<template>
  <header class="app-header">
    <div class="container">
      <h1 v-if="this.loadingState.isSearching">
        Searching for
        <span class="search-query">"{{ this.searchQuery }}"</span>
      </h1>
      <h1 v-else-if="this.loadingState.isDoneSearching">
        Search Results for
        <span class="search-query">"{{ this.searchQuery }}"</span>
      </h1>
      <form
        v-else-if="this.loadingState.isNewSearch"
        class="search-form"
        @submit="searchPhotos"
      >
        <div class="search-icon">
          <svg viewBox="0 0 24 24">
            <title>Search for photo</title>
            <path
              fill="#1c0046"
              d="M23.33 20.1l-4.73-4.74a10.06 10.06 0 1 0-3.23 3.23l4.74 4.74a2.29 2.29 0 1 0 3.22-3.23zm-17.48-5.84a5.94 5.94 0 1 1 8.42 0 6 6 0 0 1-8.42 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for photo"
          class="search-field"
          autoFocus
          v-model="searchQuery"
        />
      </form>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import { BaseUrl } from "../utils/fx";

export default {
  name: "Header",
  data() {
    return {
      searchQuery: "",
      photoDetails: [],
      loading: false,
      loadingState: {
        isNewSearch: true,
        isSearching: false,
        isDoneSearching: false
      }
    };
  },
  mounted() {
    if (this.searchQuery.length > 0) {
      this.searchQuery = "";
    }
  },
  methods: {
    resolveLoadingState() {
      // Are we searching?
      this.loadingState.isSearching = this.loading === true;

      // Is this a new search?
      this.loadingState.isNewSearch =
        this.photoDetails.length === 0 && !this.loading;

      // Are we done searching?
      this.loadingState.isDoneSearching =
        this.loadingState.isSearching === false ||
        this.photoDetails.length !== 0;
    },

    async searchPhotos(e) {
      e.preventDefault();
      try {
        this.loading = true;
        this.resolveLoadingState();

        // Env client_id!
        const client_id =
          "2e376f012d25b34b131d22e0a5e62d08e6248fcb77acbb7c351373e8ba34a6b5";
        const numberOfPhotos = 7;

        const endpoint = `?query=${this.searchQuery.trim()}&per_page=${numberOfPhotos}&client_id=${client_id}`;

        const { data: photos } = await BaseUrl.get(endpoint);

        if (!photos || photos.length <= 0) {
          this.loadingState.isSearching = false;
          this.loadingState.isDoneSearching = false;
          this.loadingState.isNewSearch = true;
          this.searchQuery = "";
          throw new Error("Uh-oh! Can't find photos. Try again.");
        }

        const slimmedPhotos = photos.map(photo => {
          // Extract only necessary data
          const { name: authorName, location: photoLocation } = photo.user;
          const { regular: photoSrcLarge, small: photoSrcSmall } = photo.urls;
          const { alt_description: photoDesc, id } = photo;

          return {
            authorName,
            photoLocation,
            photoSrcLarge,
            photoSrcSmall,
            photoDesc,
            id
          };
        });

        this.photoDetails = [...slimmedPhotos];

        this.$emit("search-photos", this.photoDetails);

        this.loading = false;
        // this.$emit("loading-photos", this.loading);
        this.resolveLoadingState();
      } catch (error) {
        this.loadingState.isSearching = false;
        this.loadingState.isDoneSearching = false;
        this.loadingState.isNewSearch = true;
        this.searchQuery = "";
        alert(error);
      }
    }
  }
};
</script>
