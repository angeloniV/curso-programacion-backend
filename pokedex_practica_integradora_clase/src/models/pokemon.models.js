import mongoose from "mongoose";

const pokemonCollection = 'pokemons';

const schemaPokemon = new mongoose.Schema({
    name: String,
    type: String,
    photo: String,
    id: Number
});

const modelPokemon = mongoose.model(pokemonCollection, schemaPokemon);

export default modelPokemon;
