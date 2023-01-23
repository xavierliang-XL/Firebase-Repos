<script setup>
import axios from "axios";
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import { useStore } from "../store/index.js";

const store = useStore();
const genre = ref(28);
const criteria = ref("");
const searchResults = ref([]);
const page = ref(1);
const totalPages = ref(0);
const showModal = ref(false);
const selectedId = ref(0);

const openModal = (value) => {
  showModal.value = true;
  selectedId.value = value;
};

const closeModal = () => {
  showModal.value = false;
};

const getGenres = async () => {
  searchResults.value = [];
  criteria.value = "";
  await store.getMovies(genre.value);
};

const search = async (direction) => {
  page.value += direction;

  let data = (
    await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: "23b3a0cee96fcac58b28918686474f75",
        query: criteria.value,
        include_adult: false,
        page: page.value,
      },
    })
  ).data;

  totalPages.value = data.total_pages;

  searchResults.value = data.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      release_date: movie.release_date,
      overview: movie.overview,
      poster: movie.poster_path,
    };
  });
};

// SHOULD ONLY BE RUN ONCE!!!!
// await store.populateFirestore();
</script>

<template>
  <input type="search" v-model="criteria" @keydown.enter="search(0)" />
  <select v-model="genre" @change="getGenres()">
    <option value="Action">Action</option>
    <option value="Family">Family</option>
    <option value="Science Fiction">Science Fiction</option>
    <option value="Adventure">Adventure</option>
    <option value="Fantasy">Fantasy</option>
  </select>
  <template v-if="searchResults.length">
    <div class="navigation">
      <button v-show="page > 1" @click="search(-1)">Prev</button>
      <h1>{{ `Page ${page} of ${totalPages}` }}</h1>
      <button v-show="page < totalPages" @click="search(1)">Next</button>
    </div>
  </template>
  <div class="purchase-container">
    <template v-if="searchResults.length">
      <img v-for="movie in searchResults" :id="movie.id" @click="openModal(movie)"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" />
    </template>
    <template v-else>
      <img v-for="movie in store.movies" :id="movie.id" @click="openModal(movie)"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" />
    </template>
    <Modal v-if="showModal" @toggleModal="closeModal()" :value="selectedId" />
  </div>
</template>

<style scoped>
.movies {
  background-color: darkred;
  border-radius: 20px;
  padding: 10px;
  height: 100%;
  margin-bottom: 50px;
  color: white;
  font-family: 'Courier New', Courier, monospace;
}

.container {
  box-sizing: border-box;
  max-width: max-content;
  display: grid;
  margin-left: 2vw;
  margin-top: 1vw;
  gap: 2vw;
  column-gap: 2vw;
  grid-template-columns: auto auto auto;
}

.movies>img {
  height: 90.5%;
  width: 99%;
  margin: auto;
  border: 5px solid black;
}
</style>