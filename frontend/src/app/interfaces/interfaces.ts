export interface ITree {
  id: number,
  tree_number: number;
  x: number;
  y: number;
  species: string;
  age: number;
  average_trunk_diameter: number;
  trunk_height: number;
  trunk_volume: number;
  average_crown_diameter: number;
  crown_length: number;
  category: string;
}

export interface ITreeGraph {
  x: number;
  y: number;
}
