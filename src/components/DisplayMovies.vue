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

// everytime genre changes
// await store.populateFirestore();
</script>

<template>
  <input type="search" v-model="criteria" @keydown.enter="search(0)" class="search" placeholder="Search" />
  <select v-model="genre" @change="getGenres()">
    <option value="Action">Action</option>
    <option value="Family">Family</option>
    <option value="History">History</option>
    <option value="Animation">Animation</option>
    <option value="Mystery">Mystery</option>
  </select>
  <template v-if="searchResults.length">
    <div class="navigation">
      <button v-show="page > 1" @click="search(-1)" class="prev">Prev</button>
      <h1>{{ `Page ${page} of ${totalPages}` }}</h1>
      <button v-show="page < totalPages" @click="search(1)" class="next">Next</button>
    </div>
  </template>
  <div class="movies">
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
  </div>
</template>

<style scoped>
select {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  width: 10%;
  height: 25px;
  color: white;
  background-color: black;
  margin-left: 10px;
  font-weight: 400;
  text-align: center;
}

.search {
  border: 2px solid black;
  border-radius: 10px;
  height: 25px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.movies {
  background-color: darkred;
  border-radius: 20px;
  padding: 10px;
  height: 100%;
  margin-bottom: 50px;
  color: white;
  font-family: 'Courier New', Courier, monospace;
}

.purchase-container {
  box-sizing: border-box;
  max-width: max-content;
  display: grid;
  margin-left: 2vw;
  margin-top: 1vw;
  gap: 2vw;
  column-gap: 2vw;
  grid-template-columns: auto auto auto;
}

.purchase-container>img {
  height: 90.5%;
  width: 99%;
  margin: auto;
  border-radius: 10px;
  border: 5px solid black;
}

.prev,
.next {
  width: 100px;
  height: 30px;
  background: linear-gradient(to right, red, darkred);
  border: 1px solid red;
  border-radius: 5px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 20px;
}

.navigation {
  background-color: black;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  color: white;
  text-align: center;
}

.prev {
  float: left;
}

.next {
  float: right;
  transform: translateY(-200%);
}

.prev:hover,
.next:hover {
  color: white;
}
</style>