// Importe le composant 'Pokemon' pour afficher chaque évolution sous forme de carte cliquable.
import { Pokemon } from "./Pokemon"; 
// Importe le type de donnée 'PokemonDTO' pour définir la structure de l'objet Pokémon.
import type { PokemonDTO } from "./PokemonDTO";

// Définit les propriétés (props) que ce composant attend de son parent (App.tsx).
interface EvolutionProps {
    // apiEvolutions : Tableau des évolutions (optionnel, indiqué par '?'). 
    // On utilise le type défini dans PokemonDTO.
    apiEvolutions?: PokemonDTO["apiEvolutions"];
    // onEvolutionClick : Fonction à appeler lorsque l'utilisateur clique sur une carte d'évolution.
    // Elle prend l'ID du Pokémon cliqué en argument.
    onEvolutionClick: (pokedexId: number) => void; 
}

// Définition du composant fonctionnel "PokemonEvolution".
export function PokemonEvolution({
    // Récupère les props passées par le composant parent.
    apiEvolutions,
    onEvolutionClick,
}: EvolutionProps) {
    
    // Condition de garde : Si le tableau d'évolutions est vide ou non défini,
    // le composant retourne 'null', ce qui signifie qu'il n'affiche rien.
    if (!apiEvolutions || apiEvolutions.length === 0) {
        return null; 
    }

    // Début du rendu (affichage) du composant.
    return (
        // Conteneur principal pour la section des évolutions.
        <div className="evolution-container">
            {/* Titre de la section. */}
            <h3>Evolution</h3>
            {/* Conteneur pour la liste des cartes d'évolution. */}
            <div className="evolutions">
                {/* La méthode 'map' parcourt chaque élément (évolution) du tableau apiEvolutions. */}
                {apiEvolutions.map((evolution) => {
                    // Construction d'une URL d'image fiable et standard (via PokeAPI/sprites) 
                    // en utilisant l'ID du Pokémon.
                    // Retourne le composant 'Pokemon' pour chaque évolution.
                    return (
                        <Pokemon
                            // key : Clé unique (l'ID du Pokedex) pour aider React à identifier les éléments de la liste.
                            key={evolution.pokedexId}
                            // id, name : Propriétés passées au composant Pokemon.
                            id={evolution.pokedexId}
                            name={evolution.name}
                            // image : L'URL fiable de l'image est passée.
                            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.pokedexId}.png`} 
                            // onClick : Rend la carte cliquable et appelle la fonction 'onEvolutionClick' 
                            // avec l'ID du Pokémon pour mettre à jour les détails dans le composant principal.
                            onClick={() => onEvolutionClick(evolution.pokedexId)}
                        />
                    );
                })}
            </div>
        </div>
    );
}