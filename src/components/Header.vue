<template>
  <header class="app-header">
    <div class="container">
      <h1 v-if="this.loadingState.isSearching">
        Searching for
        <span className="search-query">"{{ this.searchQuery }}"</span>
      </h1>
      <h1 v-else-if="this.loadingState.isDoneSearching">
        Search results for
        <span className="search-query">"{{ this.searchQuery }}"</span>
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

export default {
  name: "Header",
  data() {
    return {
      searchQuery: "African",
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
      // There can be three states
      // 1. Not Done Loading -> Yet to search for photo
      // 2. Loading -> Searching for photo
      // 3. Done Loading -> Done searching for photo

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

        // Env client_id!
        const client_id =
          "2e376f012d25b34b131d22e0a5e62d08e6248fcb77acbb7c351373e8ba34a6b5";
        const numberOfPhotos = 7;
        const baseUrl = "https://api.unsplash.com/photos/search";

        const endpoint = `${baseUrl}?query=${this.searchQuery.trim()}&per_page=${numberOfPhotos}&client_id=${client_id}`;

        const { data: photos } = await axios.get(endpoint);

        if (photos) {
          const slimmedPhotos = photos.map(photo => {
            // Extract only necessary data
            const { name: authorName, location: authorLocation } = photo.user;
            const { regular: imgSrc } = photo.urls;
            const { alt_description: imgDesc, id } = photo;

            return { authorName, authorLocation, imgSrc, imgDesc, id };
          });

          this.photoDetails = [...slimmedPhotos];

          this.$emit("search-photos", this.photoDetails);

          this.loading = false;
          this.resolveLoadingState();
        }
      } catch (error) {
        console.log(error);
        alert(`Error fetching photos ${this.searchQuery}`);
      }
    }
  }
};
</script>
