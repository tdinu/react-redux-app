export interface Movies {
  results: Movie[];
}

export interface Movie {
  id: number;
  img: string;
  name: string;
  show?: any;
  image?: any;
}

export interface APIResponse {
  results: Movie[];
}
