// Importe le composant 'Pokemon' qui est utilisé pour afficher chaque carte individuelle de la liste.
import { Pokemon } from "./Pokemon";
// Importe le type 'PokemonDTO' pour s'assurer que les données manipulées sont bien des objets Pokémon.
import type { PokemonDTO } from "./PokemonDTO";

// Définition du composant fonctionnel "PokemonList".
export function PokemonList({
  // Récupère deux propriétés (props) du composant parent (App.tsx) : la liste et la fonction de clic.
  pokemons,
  onPokemonClick
}: {
  // pokemons : Le tableau contenant tous les objets Pokémon à afficher (la liste complète).
  pokemons: PokemonDTO[];
  // onPokemonClick : La fonction qui sera appelée quand un Pokémon sera cliqué.
  // Elle prend en argument l'objet PokemonDTO complet de l'élément cliqué.
  onPokemonClick: (pokemon: PokemonDTO) => void;
}) {
  // Début du rendu HTML (JSX).
  return (
    // Le conteneur principal de la liste. Cette classe est utilisée pour le style CSS.
    <div className="pokemon-list">
      {/* Utilise la méthode 'map' pour parcourir le tableau 'pokemons'. */}
      {/* Pour chaque élément 'poke' dans le tableau, on crée un composant 'Pokemon'. */}
      {pokemons.map((poke) => (
        <Pokemon
          // key : Clé unique (l'ID du Pokedex) indispensable pour que React gère efficacement la liste.
          key={poke.pokedexId}
          // id, name, image : On transmet les propriétés spécifiques du Pokémon actuel au composant enfant <Pokemon>.
          id={poke.pokedexId}
          name={poke.name}
          image={poke.image}
          // onClick : La fonction de clic est transmise. Quand la carte est cliquée,
          // elle appelle 'onPokemonClick' du parent et lui passe l'objet 'poke' complet.
          onClick={() => onPokemonClick(poke)}
        />
      ))}
    </div>
  );
}