type PaginatedResult = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type AllCharacters = {
  info: PaginatedResult;
  results: Character[];
};

export type LocationType = {
  info: PaginatedResult;
  results: {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
  }[];
};

export type BarData = { title: string; value: number };
