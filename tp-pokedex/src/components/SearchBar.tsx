// Importe les outils de base de React : 'useState' pour gérer la donnée de l'input.
import React, { useState } from 'react';
// Importe le type 'PokemonDTO' pour s'assurer que le Pokémon retourné est bien structuré.
import type { PokemonDTO } from "./PokemonDTO";

// Définition du composant "SearchBar". Il reçoit une seule propriété, 'onSearch'.
export function SearchBar({ onSearch }: { 
    // onSearch : la fonction fournie par le parent (App.tsx) pour mettre à jour le Pokémon affiché.
    onSearch: (pokemon: PokemonDTO) => void 
}) {
    // État (state) local pour stocker ce que l'utilisateur tape dans la barre de recherche.
    const [searchTerm, setSearchTerm] = useState('');

    // Fonction appelée chaque fois que le contenu du champ de texte change.
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Récupère la nouvelle valeur tapée par l'utilisateur.
        const value = event.target.value;
        // Met à jour l'état local 'searchTerm' avec cette nouvelle valeur.
        setSearchTerm(value);
        
        // Vérifie si la barre de recherche est vide.
        if (value.trim() === "") {
            // Si elle est vide, on arrête le processus de recherche pour ne pas faire de requête inutile.
            return;
        }

        // --- Préparation de la requête API ---
        // Met la première lettre en majuscule et le reste en minuscule.
        // Exemple : "pikachu" devient "Pikachu", ce qui est requis par l'API de Pokebuild.
        const formattedSearch = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

        // --- Effectuer la requête HTTP ---
        // Fait une requête à l'API en utilisant le nom formaté.
        fetch(`https://pokebuildapi.fr/api/v1/pokemon/${formattedSearch}`)
            .then(res => {
                // Vérifie si la réponse HTTP est OK (statut 200).
                if (!res.ok) {
                    // Si ce n'est pas OK, on lance une erreur (par exemple, si le nom n'existe pas).
                    throw new Error(`Pokémon ${formattedSearch} non trouvé.`);
                }
                // Convertit la réponse en objet JavaScript (JSON).
                return res.json();
            })
            .then((pokemonData: PokemonDTO) => {
                // Si la requête réussit, on appelle la fonction 'onSearch' du parent.
                // Cela mettra à jour l'état du Pokémon affiché dans App.tsx.
                onSearch(pokemonData);
            })
            .catch(error => {
                // Gère les erreurs (connexion, Pokémon non trouvé, etc.) et les affiche dans la console.
                console.error("Erreur de recherche:", error.message);
                // On pourrait ajouter ici un message visible à l'utilisateur (ex: "Pokémon inconnu").
            });
    };

    // --- Rendu (Affichage) du composant ---
    return (
        // Conteneur pour la barre de recherche.
        <div className="search-bar-container">
            {/* Le champ de saisie (input). */}
            <img src="search-icon.png" alt="🔍" />
            <input 
                type="text"
                // value : L'input est contrôlé par l'état React 'searchTerm'.
                value={searchTerm}
                // onChange : Appelle notre fonction 'handleInputChange' à chaque frappe de touche.
                onChange={handleInputChange}
                // Placeholder : Texte affiché quand le champ est vide.
                placeholder="Rechercher un Pokémon par nom ou ID..."
                // Classe CSS pour le style.
                className="search-input"
            />
        </div>
    );
}