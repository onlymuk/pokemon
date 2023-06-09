import axios from 'axios';
import {POKEMON_IMAGE_TYPE} from "../Constant";

const remote = axios.create();

export interface PokemonListResponse {
  count: number,
  next: string,
  results: {
    name: string,
    url: string
  }[]
}

export const fetchPokemonsAPI = async (nextUrl?:string) => {
  const result = await remote.get<PokemonListResponse>(nextUrl ? nextUrl : 'https://pokeapi.co/api/v2/pokemon', {
    params: {
      limit: 20
    }
  })
  return result.data;
}

export interface PokemonDetailType {
  id: number
  name: string
  koreanName: string
  height: number // 미터
  weight: number // Kg
  color: string
  type: string[]
  images: {
    frontDefault: string
    officialArtworkFront: string
    dreamWorldFront: string
  },
  baseStats: {
    name: string
    value: number
  }[]
}

interface PokemonDetailResponseType {
  id: number,
  height: number,
  weight: number,
  name: string,
  types: {
    slot: 1,
    type: {
      name: string
      url: string
    }
  }[],
  sprites: {
    front_default: string,
    other: {
      'official-artwork': {
        front_default: string,
      },
      dream_world: {
        front_default: string
      }
    }
  },
  stats: {
    base_stat: number,
    stat: {
      name: string
    }
  }[]
}

interface PokemonSpeciesResponseType {
  color: {
    name: string
    url: string
  },
  names: {
    name: string
    language: {
      name: string
      url: string
    }
  }[]
}

export const fetchPokemonDetailAPI = async (name:string):Promise<PokemonDetailType> => {
  const response = await remote.get<PokemonDetailResponseType>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const result = await remote.get<PokemonSpeciesResponseType>(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
  const { data } = response;
  const data2 = result.data;

  return {
    id: data.id,
    name: data.name,
    height: data.height / 10, // 미터 단위로 변경
    weight: data.weight / 10, // Kg으로 변경
    koreanName: result.data.names.find((name) => name.language.name === 'ko')?.name ?? data.name,
    type: data.types.map(item => item.type.name),
    color: data2.color.name,
    baseStats: data.stats.map(item => ({ name: item.stat.name, value: item.base_stat })),
    images: {
      [POKEMON_IMAGE_TYPE.FRONT_DEFAULT]: data.sprites.front_default,
      [POKEMON_IMAGE_TYPE.OFFICIAL_ARTWORK]: data.sprites.other['official-artwork'].front_default,
      [POKEMON_IMAGE_TYPE.DREAM_WORLD]: data.sprites.other.dream_world.front_default
    }
  }
}
