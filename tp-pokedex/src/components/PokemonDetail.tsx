import type { PokemonDTO } from "./PokemonDTO";

export function PokemonDetail({id, name, image, apiTypes}: PokemonDTO) {
    if (!apiTypes) return <div className="pokemon-detail">Chargement...</div>;

    return (
        <div className="pokemon-detail">
            <p>n°{id}</p>
            <img src={image} alt={name}/>
            <h1>{name}</h1>
            <h2>Types</h2>
            <div className="types">
                {apiTypes.map((type) => (
                    <img key={type.name} src={type.image} alt={type.name} />
                ))}
            </div>
        </div>
    );
}
