<script setup>
import { useStore } from "../store/index.js"
const store = useStore();
</script>

<template>
    <div class="cartlist" v-for="movie in Array.from(store.cart.values())">
        <div class="display">
            <div class="name">
                {{ movie.id }}: {{ movie.title }}
            </div>
            <div class="count">
                <button @click="store.removeFromCart(movie.id)">Remove</button>
            </div>
        </div>
    </div>
    <button class="purchase_btn" @click="store.clear()">purchase</button>

</template>

<style scoped>
.cartlist {
    height: 100%;
}

.display {
    color: black;
    font-weight: 300;
    width: 97%;
    margin: 10px;
    background-color: white;
    border: 3px solid darkred;
    padding: 10px;
    display: list-item;
}

.name {
    float: left;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

.count {
    float: right;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 1000;
}

.purchase_btn {
    width: 150px;
    height: 40px;
    margin-top: 20px;
    background: linear-gradient(to right, red, darkred);
    border: 1px solid red;
    border-radius: 5px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: 600;
    font-size: 20px;
    margin-left: 1%;
}

.func_btn {
    width: 30px;
    height: 30px;
    background: linear-gradient(to right, red, darkred);
    border: 1px solid red;
    border-radius: 5px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 20px;
}

.purchase_btn:hover,
.func_btn:hover {
    color: white;
}
</style>