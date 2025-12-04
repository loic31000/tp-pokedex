// On importe le type TypeScript qui décrit la structure des données d'un Pokémon.
import type { PokemonDTO } from "./PokemonDTO";

// Définition du composant fonctionnel "PokemonDetail".
// Il reçoit directement les propriétés du Pokémon (pokedexId, name, image, apiTypes)
// car il est en charge de l'affichage complet des détails.
export function PokemonDetail({pokedexId, name, image, apiTypes}: PokemonDTO) {
    // Condition de garde : si 'apiTypes' n'est pas encore défini (ce qui arrive au tout début
    // quand le 'defaultPokemon' est utilisé), on affiche un message de chargement.
    if (!apiTypes) return <div className="pokemon-detail">Chargement...</div>;

    // Le 'return' définit ce qui sera affiché à l'écran.
    return (
        // La balise principale qui contient tous les détails.
        <div className="pokemon-detail">
            {/* Affiche le numéro du Pokémon. */}
            <p>n°{pokedexId}</p>
            {/* Affiche l'image principale du Pokémon. */}
            <img src={image} alt={name}/>
            {/* Affiche le nom du Pokémon en grand titre. */}
            <h1>{name}</h1>
            {/* Titre pour la section des types. */}
            <h2>Types</h2>
            {/* Conteneur pour afficher les icônes des types. */}
            <div className="types">
                {/* On utilise la méthode 'map' pour parcourir le tableau 'apiTypes'. */}
                {/* Un Pokémon peut avoir un ou deux types (ex: Feu, ou Eau/Sol). */}
                {apiTypes.map((type) => (
                    // Pour chaque type trouvé, on affiche son icône.
                    // 'key={type.name}' est essentiel dans les listes React pour l'identification.
                    <img key={type.name} src={type.image} alt={type.name} />
                ))}
            </div>
        </div>
    );
}