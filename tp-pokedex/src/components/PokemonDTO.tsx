
export interface PokemonDTO {
  id: number;
  image: string;
  name: string;
  apiTypes: { name: string; image: string }[]; 
  apiEvolutions?: {id:number, name:string, image:string}[];
}


