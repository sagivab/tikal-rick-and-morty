export type CharacterNumber = {
  characters: {
    info: {
      count: number;
    };
  };
};

export type ChartacterEpisodes = {
  episode: { id: string }[];
};

export type ChartactersEpisodes = {
  characters: { results: ChartacterEpisodes[] };
};

export type Character = {
  id: string;
  name: string;
  origin: {
    name: string;
    dimension: string;
  };
  episode: {
    id: string;
  }[];
};

export type Characters = {
  charactersByIds: Character[];
};

export type Locations = {
  locations: {
    results: {
      dimension: string;
    }[];
  };
};

export type BarData = { title: string; value: number };
