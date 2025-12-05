// Définition du composant fonctionnel "Pokemon". 
// Il reçoit des données (props) pour s'afficher et une fonction pour être cliquable.
export function Pokemon({
  // 'id' : le numéro Pokedex du Pokémon (par exemple, 25 pour Pikachu).
  id, 
  // 'name' : le nom du Pokémon.
  name, 
  // 'image' : l'URL de l'image du Pokémon.
  image, 
  // 'onClick' : la fonction à exécuter quand on clique sur le composant (passée par le composant parent, ex: PokemonList).
  onClick
}: {
  // Définition des types TypeScript pour s'assurer que les données reçues sont correctes.
  id: number;
  name: string;
  image: string;
  // La fonction de clic ne prend pas d'argument et ne retourne rien.
  onClick: () => void;
}) {
  // Le 'return' définit ce qui sera affiché à l'écran (le rendu JSX).
  return (
    // La balise principale : un div avec la classe "pokemon-card".
    // L'attribut 'onClick={onClick}' rend toute la carte cliquable et exécute la fonction 'onClick' fournie.
    <div className="pokemon-card" onClick={onClick}>
      {/* Affiche le numéro du Pokémon (N°1, N°2, etc.). */}
      <p>{id}</p>
      {/* Affiche le nom du Pokémon en tant que titre principal. */}
      <h1>{name}</h1>
      {/* Affiche l'image. 'src' est l'URL de l'image, 'alt' est le texte alternatif pour l'accessibilité. */}
      <img src={image} alt={name} />
    </div>
  );
}