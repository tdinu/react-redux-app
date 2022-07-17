export interface ShowsAPIResponse {
  id: number;
  name: string;
  image: Image;
}

export interface Image {
  medium: string;
  original: string;
}

export interface QueryShowsAPIResponse {
  score: number;
  show: Show;
}

export interface Show extends ShowsAPIResponse {
  // id: number;
  // name: string;
  language: Language;
  genres: string[];
  status: string;
  network: Network | null;
  webChannel: Network | null;
  // image: Image;
}

export enum Language {
  English = 'English',
  Mongolian = 'Mongolian',
}

export interface Network {
  id: number;
  name: string;
  country: Country | null;
  officialSite: null | string;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}
