// Définit une interface TypeScript. Une interface est comme un "contrat" ou un "moule" 
// qui décrit exactement à quoi doit ressembler un objet "PokemonDTO".
// Cela aide à éviter les erreurs car le code sait quelles propriétés existent.
export interface PokemonDTO {
  // pokedexId : Le numéro d'identification unique du Pokémon. Doit être un nombre.
  pokedexId: number;
  // image : L'URL (adresse) de l'image principale du Pokémon. Doit être une chaîne de caractères (string).
  image: string;
  // name : Le nom du Pokémon (ex: "Pikachu"). Doit être une chaîne de caractères.
  name: string;
  // apiTypes : Un tableau (liste) des types du Pokémon (ex: Électrik, Eau/Vol).
  // Chaque élément du tableau est un objet avec un 'name' (nom du type) et une 'image' (URL de l'icône du type).
  apiTypes: { name: string; image: string }[]; 
  // apiEvolutions : Un tableau des évolutions possibles du Pokémon. Le '?' indique que c'est optionnel, 
  // car certains Pokémons n'ont pas d'évolution.
  // Chaque évolution est un objet avec son ID, son nom et l'URL de son image.
  apiEvolutions?: {pokedexId:number, name:string, image:string}[];
}


