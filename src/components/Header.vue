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
              fill="#32325d"
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
import { BaseUrl } from "../utils/fx";

export default {
  name: "Header",
  data() {
    return {
      searchQuery: "",
      photoDetails: [],
      loading: false,
      loadingState: {
        isSearching: false,
        isNewSearch: true,
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
    resolveLoadingState(isSearching, isNewSearch, isDoneSearching) {
      // Are we searching?
      // this.loadingState.isSearching = this.loading === true;

      // Is this a new search?
      // this.loadingState.isNewSearch =
      //   this.photoDetails.length === 0 && !this.loading;

      // Are we done searching?
      // this.loadingState.isDoneSearching =
      //   this.loadingState.isSearching === false ||
      //   this.photoDetails.length !== 0;

      this.loadingState.isSearching = isSearching;
      this.loadingState.isNewSearch = isNewSearch;
      this.loadingState.isDoneSearching = isDoneSearching;

      // When we are searching
      if (this.loadingState.isSearching === true) {
        this.loadingState.isNewSearch = false;
        this.loadingState.isDoneSearching = false;
      }

      if (this.loadingState.isNewSearch === true) {
        this.loadingState.isSearching = false;
        this.loadingState.isDoneSearching = false;
      }

      if (this.loadingState.isDoneSearching === true) {
        this.loadingState.isSearching = false;
        this.loadingState.isNewSearch = false;
      }
    },

    observeImages() {
      console.log(document.images);
      console.log("Observing");
      return false;
    },

    async searchPhotos(e) {
      e.preventDefault();
      try {
        // If the query is empty
        if (this.searchQuery.trim().length === 0) {
          this.searchQuery = "";
          throw new Error("You have made no search. Try again!.");
        }
        // We are now searching
        this.resolveLoadingState(true, false, false);
        this.$emit("is-searching", this.loadingState.isSearching);

        // Env client_id!
        const client_id =
          "2e376f012d25b34b131d22e0a5e62d08e6248fcb77acbb7c351373e8ba34a6b5";
        const numberOfPhotos = 2;
        const endpoint = `?query=${this.searchQuery.trim()}&per_page=${numberOfPhotos}&client_id=${client_id}`;

        const { data: photos } = await BaseUrl.get(endpoint);

        // There's no photo returned from search
        if (!photos || photos.length <= 0) {
          this.resolveLoadingState(false, true, false);
          this.$emit("is-new-search", this.loadingState.isNewSearch);
          const sq = this.searchQuery;
          this.searchQuery = "";
          throw new Error(`Uh-oh! Can't find photos for '${sq}' Try again.`);
        }

        // There's photo returned from search
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

        // We are done searching
        // Call observer here.
        this.resolveLoadingState(false, false, true);
        this.$emit("is-done-searching", this.loadingState.isDoneSearching);
        const imageInDom = this.observeImages();
        if (!imageInDom) {
          this.$emit("is-img-in-dom", imageInDom);
        }
      } catch (error) {
        this.resolveLoadingState(false, true, false);
        this.$emit("is-new-search", this.loadingState.isNewSearch);
        alert(error);
      }
    }
  }
};
</script>
