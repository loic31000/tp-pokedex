// Importe 'StrictMode' (Mode Strict) depuis React. C'est un outil qui aide à trouver
// les problèmes potentiels dans l'application pendant le développement.
import { StrictMode } from 'react';
// Importe 'createRoot' depuis la librairie 'react-dom/client'. C'est la nouvelle méthode
// pour démarrer et lier une application React au DOM (HTML).
import { createRoot } from 'react-dom/client';
// Importe le composant principal de votre application (le composant racine) que vous avez construit.
import  App  from './components/App';

// Utilise 'createRoot' pour créer la racine de l'application.
// document.getElementById('root')! : Trouve l'élément HTML (généralement dans index.html) 
// qui a l'ID "root". C'est là que toute votre application React va être insérée.
// Le '!' est utilisé par TypeScript pour affirmer que cet élément existera toujours.
createRoot(document.getElementById('root')!).render(
  // La méthode 'render' dit à React de dessiner le contenu à l'intérieur de la racine créée.
  // Ce contenu est...
  <StrictMode>
    {/* ...votre composant principal <App />. Tout le Pokedex est à l'intérieur de cet élément. */}
    < App/>
  </StrictMode>,
)