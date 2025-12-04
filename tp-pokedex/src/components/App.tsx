import { useEffect, useState } from "react";
import { PokemonList } from "./PokemonList";
import { PokemonDetail } from "./PokemonDetail";
import type { PokemonDTO } from "./PokemonDTO";
import { SearchBar } from "./SearchBar";
import { PokemonEvolution } from "./PokemonEvolution";
import "./App.css";


export default function App() {
  const [pokemons, setPokemons] = useState<PokemonDTO[]>([]);
  const [evolutionsData, setEvolutionsData] = useState<PokemonDTO["apiEvolutions"]>([]);
  const [pokemon, setPokemon] = useState<PokemonDTO>({
    id: 0,
    image: "",
    name: "",
    apiTypes: [],
    apiEvolutions: [],
  });

  useEffect(() => {
    fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/100")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error");
        }
        return res.json();
      })
      .then((pokemons) => {
        setPokemons(pokemons);
        if (pokemons.length > 0) {
          setPokemon(pokemons[0]);
        }
      })
      .catch((error) => console.error("Erreur API:", error));
  }, []);

  useEffect(() => {
    if (pokemon.id > 0) {
      fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemon.id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erreur évolutions");
          }
          return res.json();
        })
        .then((data: PokemonDTO) => {
          setEvolutionsData(data.apiEvolutions || []);
        })
        .catch((error) => {
          console.error("Erreur évolutions:", error);
          setEvolutionsData([]);
        });
    }
  }, [pokemon.id]);

  const handlePokemonClick = (selectedPokemon: PokemonDTO) => {
    setPokemon(selectedPokemon);
  };

  return (
    <div className="App">
      <div className="Pokemon-App">
        <PokemonList 
          pokemons={pokemons} 
          onPokemonClick={handlePokemonClick} 
        />
      </div>
      <div className="Pokemon-Detail">
        <SearchBar />
        <div className="detail-evolution-container">
          <PokemonDetail
            id={pokemon.id}
            image={pokemon.image}
            name={pokemon.name}
            apiTypes={pokemon.apiTypes}
          />
          <PokemonEvolution
            pokedexid={pokemon.id}
            name={pokemon.name}
            apiEvolutions={evolutionsData}
          />
        </div>
      </div>
    </div>
  );
}
