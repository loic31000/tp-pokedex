// On importe les outils de base de React :
// 'useEffect' sert à exécuter du code après le rendu (par exemple, pour charger des données).
// 'useState' sert à stocker des données qui, si elles changent, mettront à jour l'affichage du composant.
import { useEffect, useState } from "react";
// On importe les différents composants de l'interface utilisateur.
import { PokemonList } from "./PokemonList"; // Le composant qui affiche la liste des Pokémons.
import { PokemonDetail } from "./PokemonDetail"; // Le composant qui affiche les détails d'un Pokémon.
import type { PokemonDTO } from "./PokemonDTO"; // Le type TypeScript qui décrit la structure des données d'un Pokémon.
import { SearchBar } from "./SearchBar"; // Le composant qui permet de rechercher un Pokémon.
import { PokemonEvolution } from "./PokemonEvolution"; // Le composant qui affiche les évolutions.
// On importe le fichier CSS spécifique à ce composant pour la mise en forme.
import "./App.css";

// --- Définition de l'état initial ---
// Ceci est un objet Pokémon par défaut. Il est utilisé comme valeur de départ 
// ou pour afficher un message de "Chargement..." avant que les vraies données n'arrivent.
const defaultPokemon: PokemonDTO = {
    pokedexId: 0, // ID à 0 signifie qu'il n'est pas encore chargé.
    image: "Chargement...png", // Image par défaut (peut être une image de chargement).
    name: "Chargement...", // Nom affiché pendant le chargement.
    apiTypes: [], // Tableau vide pour les types.
    apiEvolutions: [], // Tableau vide pour les évolutions.
};

// Définition du composant principal "App". 
// C'est le composant racine qui gère toute la logique et les états de l'application.
export default function App() {
  // --- Déclaration des États (States) ---
  // Un état pour stocker la liste complète des Pokémons (utilisée par PokemonList).
  const [pokemons, setPokemons] = useState<PokemonDTO[]>([]);
  // Un état pour stocker les données d'évolution du Pokémon actuellement affiché (utilisé par PokemonEvolution).
  const [evolutionsData, setEvolutionsData] = useState<PokemonDTO["apiEvolutions"]>([]);
  // L'état le plus important : le Pokémon actuellement sélectionné et affiché dans le détail.
  const [pokemon, setPokemon] = useState<PokemonDTO>(defaultPokemon);

  // --- 1. Chargement initial des données (useEffect) ---
  // Le 'useEffect' est appelé une seule fois au démarrage de l'application (grâce au tableau vide [] à la fin).
  useEffect(() => {
    // Utilisation de 'fetch' pour récupérer les 100 premiers Pokémons depuis l'API.
    fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/100")
      .then((res) => {
        // Vérifie si la réponse HTTP est OK (statut 200).
        if (!res.ok) {
          throw new Error("Error fetching initial list");
        }
        // Convertit la réponse en format JSON.
        return res.json();
      })
      .then((pokemons) => {
        // Met à jour l'état 'pokemons' avec la liste récupérée.
        setPokemons(pokemons);
        // Si la liste n'est pas vide,
        if (pokemons.length > 0) {
          // On définit le premier Pokémon de la liste comme Pokémon par défaut à afficher.
          setPokemon(pokemons[0]); 
        }
      })
      // Gère les erreurs de connexion ou d'API.
      .catch((error) => console.error("Erreur API:", error));
  }, []); // Le tableau vide [] signifie que cet effet ne s'exécute qu'une fois au montage.

  // --- 2. Chargement des données d'évolution (useEffect) ---
  // Cet effet s'exécute chaque fois que le 'pokemon.pokedexId' change (quand on sélectionne un nouveau Pokémon).
  useEffect(() => {
    // On s'assure qu'on ne fait pas de requête pour le Pokémon par défaut (ID 0).
    if (pokemon.pokedexId > 0) {
      // On fait une nouvelle requête pour obtenir les détails complets du Pokémon sélectionné (y compris les évolutions).
      fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemon.pokedexId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erreur évolutions");
          }
          return res.json();
        })
        .then((data: PokemonDTO) => {
          // Met à jour l'état 'evolutionsData' avec les données d'évolution.
          setEvolutionsData(data.apiEvolutions || []);
        })
        .catch((error) => {
          console.error("Erreur évolutions:", error);
          setEvolutionsData([]); // Vide les évolutions en cas d'erreur.
        });
    }
  }, [pokemon.pokedexId]); // Cet effet dépend de l'ID du Pokémon ; il se relance à chaque changement d'ID.

  // --- Fonctions de gestion d'événements (Callbacks) ---

  // Cette fonction est passée aux composants de la liste.
  // Elle est appelée quand l'utilisateur clique sur un Pokémon dans la liste.
  const handlePokemonClick = (selectedPokemon: PokemonDTO) => {
    // Met à jour l'état 'pokemon', ce qui déclenche le re-rendu et le chargement des évolutions (useEffect 2).
    setPokemon(selectedPokemon);
  };
  
  // Cette fonction est passée au composant des évolutions.
  // Elle est appelée quand l'utilisateur clique sur un Pokémon dans la section 'Évolutions'.
  const handleEvolutionClick = (pokedexId: number) => {
    // Trouve le Pokémon complet dans la liste initiale 'pokemons' en utilisant son ID.
    const selectedPokemon = pokemons.find(p => p.pokedexId === pokedexId);
    // Si on le trouve, on le sélectionne.
    if (selectedPokemon) {
        setPokemon(selectedPokemon);
    }
  };

  // Cette fonction est passée au composant SearchBar.
  // Elle est appelée quand la recherche dans la barre est réussie et retourne un Pokémon.
  const handleSearch = (searchedPokemon: PokemonDTO) => {
    // Met à jour l'état pour afficher les détails du Pokémon trouvé par la recherche.
    setPokemon(searchedPokemon);
  };

  // --- Rendu (Affichage) du composant ---
  return (
    // La balise principale qui enveloppe toute l'application.
    <div className="App">
      {/* Colonne de gauche (La liste) */}
      <div className="Pokemon-App">
        {/* Le composant de la liste reçoit la liste des pokemons et la fonction à appeler au clic. */}
        <PokemonList 
          pokemons={pokemons} 
          onPokemonClick={handlePokemonClick} 
        />
      </div>
      
      {/* Colonne de droite (Détails et recherche) */}
      <div className="Pokemon-Detail">
        {/* La barre de recherche reçoit la fonction à appeler quand un Pokémon est trouvé. */}
        <SearchBar onSearch={handleSearch} /> 
        
        {/* Conteneur pour les détails et les évolutions */}
        <div className="detail-evolution-container">
          {/* Affiche les détails du Pokémon actuel. On lui passe les infos depuis l'état 'pokemon'. */}
          <PokemonDetail
            pokedexId={pokemon.pokedexId}
            image={pokemon.image}
            name={pokemon.name}
            apiTypes={pokemon.apiTypes}
          />
          {/* Affiche la section des évolutions. */}
          <PokemonEvolution
            // Lui passe les données d'évolution chargées par l'useEffect 2.
            apiEvolutions={evolutionsData}
            // Lui passe la fonction pour gérer le clic sur une évolution.
            onEvolutionClick={handleEvolutionClick} 
          />
        </div>
      </div>
    </div>
  );
}