<script setup lang="ts">
// Importante: No definimos props aquí porque este es el componente padre
import ShoppingCartItem from "./components/ShoppingCart.vue"; // Lo ideal sería llamarlo CartItem
import PokemonInfo from "./components/PokemonInfo.vue";
import { useProducts } from "./composable/useProducts.ts";

const { products, handleIncrementQuantity, handleDecrementQuantity } = useProducts();
</script>

<template>
    <div class="cart-container">
        <h1>My shopping cart</h1>

        <p v-if="products.length === 0">Your cart is empty</p>

        <ShoppingCartItem
            v-for="product in products"
            :key="product.id"
            :name="product.name"
            :quantity="product.quantity"
            @increment="handleIncrementQuantity(product.id)"
            @decrement="handleDecrementQuantity(product.id)"
        />
    </div>

    <hr />

    <Suspense>
        <template #default>
            <PokemonInfo />
        </template>
        <template #fallback>
            <p>Loading Pokemon Data...</p>
        </template>
    </Suspense>
</template>

<style scoped>
.cart-container {
    margin-bottom: 2rem;
    padding: 20px;
    border-bottom: 1px solid #ccc;
}
</style>