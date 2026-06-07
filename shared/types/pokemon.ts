export type PokemonListItem = {
  name: string;
  url: string;
}

export type PokemonApiAbility = {
  ability: {
    name: string;
  }
}

export type PokemonApiSprites = {
  back_default: string;
  front_default: string;
  other: {
    showdown:{
      front_default: string;
    };
  }
}

export type PokemonApiTypeSlot = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

// for initial API response
export type PokemonPageData = {
  count: number;
  next: string;
  previous: string;
  results: PokemonListItem[];
};

export type PokemonApiStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  }
}

// to map API response
export type PokemonApiResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: PokemonApiAbility[];
  sprites: PokemonApiSprites;
  types: PokemonApiTypeSlot[];
  stats: PokemonApiStat[];
};

export type PokemonProfileStat = {
  value: number;
  name: string;
}


// list item for landing page
export interface PokemonDetails {
  name: string;
  id: number;
  displayName: string;
  thumbnail: string;
  types: string[];
}

// for profile page
export interface PokemonProfile extends PokemonDetails  {
  sprites: PokemonApiSprites;
  abilities: PokemonApiAbility[];
  base_experience: number;
  stats: PokemonProfileStat[];
}

