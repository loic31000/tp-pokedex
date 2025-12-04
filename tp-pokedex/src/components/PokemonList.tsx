import { Pokemon } from "./Pokemon";
import type { PokemonDTO } from "./PokemonDTO";

export function PokemonList({
  pokemons,
  onPokemonClick
}: {
  pokemons: PokemonDTO[];
  onPokemonClick: (pokemon: PokemonDTO) => void;
}) {
  return (
    <div className="pokemon-list">
      {pokemons.map((poke) => (
        <Pokemon
          key={poke.id}
          id={poke.id}
          name={poke.name}
          image={poke.image}
          onClick={() => onPokemonClick(poke)}
        />
      ))}
    </div>
  );
}
