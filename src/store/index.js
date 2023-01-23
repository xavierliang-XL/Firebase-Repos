import { firestore } from "../firebase/index";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { defineStore } from 'pinia'
import axios from 'axios';

import { ref } from 'vue';

export const useStore = defineStore('store', {
  state: () => {
    return {
      movies: [],
      cart: new Map(),
    }
  },
  actions: {
    async populateFirestore() {
      const genres = new Map([[28, "Action"], [10751, "Family"], [36, "History"], [16, "Animation"], [9648, "Mystery"]]);

      genres.forEach(async (value, key) => {
        let data = (await axios.get("https://api.themoviedb.org/3/discover/movie", {
          params: {
            api_key: "23b3a0cee96fcac58b28918686474f75",
            with_genres: key,
            include_adult: false,
          }
        })).data.results;
        data = data.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            original_title: movie.original_title,
            release_date: movie.release_date,
            overview: movie.overview,
            poster: movie.poster_path,
          }
        });
        await setDoc(doc(firestore, "Genre", value), { data });
        console.log(data);
      });
    },

    async getMovies(genre) {
      this.movies = (await getDoc(doc(firestore, "Genre", genre))).data().data;
    },

    addToCart(id, data) {
      this.cart.set(id, data);
    },

    removeFromCart(id) {
      this.cart.delete(id);
    },
    clear() {
      this.cart = new Map();
    }
  }
});

export const isLoggedIn = ref(false);