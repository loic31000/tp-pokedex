export function PokemonEvolution({
  pokedexid,
  name,
  apiEvolutions,
}: {
  pokedexid: number;
  name: string;
  apiEvolutions?: { id: number; name: string; image: string }[]; 
}) {
  return (
 <div className="evolutions">
        {apiEvolutions?.map((evolution) => (
          <img
  
            key={evolution.id} 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
            alt={evolution.name} 
            
          />
        ))}
      </div>
  );
}


