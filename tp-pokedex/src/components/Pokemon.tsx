export function Pokemon({
  id, 
  name, 
  image, 
  onClick
}: {
  id: number;
  name: string;
  image: string;
  onClick: () => void;
}) {
  return (
    <div className="pokemon-card" onClick={onClick}>
      <p>{id}</p>
      <h1>{name}</h1>
      <img src={image} alt={name} />
    </div>
  );
}
