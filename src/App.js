import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from the PokeAPI
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => {
        const fetchPokemonData = async () => {
          const promises = response.data.results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return res.data;
          });
          const results = await Promise.all(promises);
          setPokemonList(results);
        };
        fetchPokemonData();
      })
      .catch((error) => console.log('Error fetching Pokémon:', error));
  }, []);

  // Filter Pokémon by search term
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="pokemon-container">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
