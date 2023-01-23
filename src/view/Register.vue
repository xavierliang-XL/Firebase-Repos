<script setup>

import { ref } from "vue";
import { auth } from "../firebase/index";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { isLoggedIn } from "../store/index";
import router from "../router";

const username = ref("");
const email = ref("");
const password1 = ref("");
const password2 = ref("");
const registerUserByEmail = async () => {
  if (password1.value !== password2.value) {
    return;
  }
  try {
    await createUserWithEmailAndPassword(auth, email.value, password1.value);
  } catch (error) {

  }
};
const registerUserByGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const user = await signInWithPopup(auth, provider);
  router.push("/Purchase");
  isLoggedIn.value=true;
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <h2>Register by Google</h2>
    <button @click="registerUserByGoogle" class="btn_sub">Google</button>
    <hr />
    <h2>Register by Email</h2>
    <form @submit.prevent="registerUserByEmail()">
      <input v-model="username" type="text" placeholder="username" class="text"/> <br />
      <input v-model="email" type="email" placeholder="email" class="text" /> <br />
      <input v-model="password1" type="password" placeholder="password" class="text"/> <br />
      <input v-model="password2" type="password" placeholder="re-enter password" class="text"/> <br />
      <input type="submit" value="Register" class="btn_sub"/>
    </form>
  </div>
</template>

<style scoped>
.btn_sub {
  width: 150px;
  height: 40px;
  margin-top: 20px;
  background: linear-gradient(to right, red, darkred);
  border: 1px solid red;
  border-radius: 5px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: 600;
  font-size: 20px;
}

.text{
  width: 251px;
  height: 32px;
  border: 1px solid #A6A6A6;
  border-radius: 5px;
  padding-left: 10px;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.btn_sub:hover {
  color: white;
}
</style>