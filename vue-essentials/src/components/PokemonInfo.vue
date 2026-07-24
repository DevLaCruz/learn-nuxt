<script setup lang="ts">
import { ref, watch } from "vue";
import { useFetch } from "../composable/useFetch.ts";
import type { PokeapiPokemonResponse } from "../interfaces/pokeapi-pokemon.response.ts";

interface Pokemon {
    id: number;
    name: string;
    image: string;
}

const pokemon = ref<Pokemon | null>(null);
const pokemonId = ref(1); // Empezamos en 1

// Usamos el composable pasando la URL como función (getter)
const { data, hasError, isLoading } = useFetch<PokeapiPokemonResponse>(
    () => `https://pokeapi.co/api/v2/pokemon/${pokemonId.value}`
);

// Mapeamos los datos cuando 'data' cambia (el watch está en el composable)
watch(data, (newPokemon) => {
  if (!newPokemon) return;
  pokemon.value = {
    id: newPokemon.id,
    name: newPokemon.name,
    image: newPokemon.sprites.front_default,
  };
});

// Funciones para los botones
const nextPokemon = () => pokemonId.value++;
const prevPokemon = () => {
  if (pokemonId.value > 1) pokemonId.value--;
};
</script>

<template>
    <section v-if="isLoading" class="loading">
        <p>Cargando Pokémon...</p>
    </section>

    <section v-else-if="hasError">
        <p>Error al obtener los datos del Pokémon.</p>
        <button @click="pokemonId = 1">Volver al inicio</button>
    </section>

    <section v-else-if="pokemon" class="pokemon-card">
        <h2>#{{ pokemon.id }} {{ pokemon.name }}</h2>
        <img :src="pokemon.image" :alt="pokemon.name" />

        <div class="controls">
            <button 
                :disabled="pokemonId <= 1" 
                @click="prevPokemon"
                class="btn"
            >
                Anterior
            </button>

            <button 
                @click="nextPokemon"
                class="btn"
            >
                Siguiente
            </button>
        </div>

        <h3>Visualizando ID: {{ pokemonId }}</h3>
    </section>
</template>

<style scoped>
.pokemon-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

img {
    width: 150px;
    height: 150px;
}

.controls {
    display: flex;
    gap: 20px;
}

.btn {
    padding: 10px 25px;
    cursor: pointer;
    font-weight: bold;
    border-radius: 5px;
    border: 1px solid #646cff;
    background-color: #646cff;
    color: white;
    transition: opacity 0.3s;
}

.btn:hover:not(:disabled) {
    background-color: #535bf2;
}

/* Estilo para el botón deshabilitado */
.btn:disabled {
    background-color: #ccc;
    border-color: #999;
    cursor: not-allowed;
    opacity: 0.6;
}

.loading {
    text-align: center;
    padding: 20px;
}
</style>