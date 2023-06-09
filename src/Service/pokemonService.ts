import axios from "axios";
import { resolve } from "path";

const remote = axios.create();
export interface PokemonListResponseType {
    count: number,
    next: string,
    results: {
        name: string,
        url: string,
    }[]
}

export  const fetchPokemons = async () => {
    const defaultUrl= "https://pokeapi.co/api/v2/pokemon";

    const response =  await remote.get<PokemonListResponseType>(defaultUrl);
    return response.data;
}

interface PokemonDetailResponseType {
    id:number,
    weight: number,
    height: number,
    name: string,
    types: {
        type: {
            name: string
        }
    }[],
    sprites: {
        front_default: string,
        other: {
            dream_world: {
                front_default: string
            }
            "official-artwork" : {
                front_default: string,
            }
        }
    },
    stats: {
        base_stat: number,
        stat : {
            name: string
        }
    }[]
}

 export interface PokemonDetailType {
    id:number,
    weight: number,
    height: number,
    name: string,
    types: string[],
    images: {
        frontDefault: string,
        dreamWorldFront: string,
        officialArtworkFront: string,
    },
    baseStats: {
        name: string,
        value: number,
    }[]
}

export const fetchPokemonsDetail = async (name: string):Promise<PokemonDetailType> => {
    const pokemonDetailUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response =  await remote.get<PokemonDetailResponseType>(pokemonDetailUrl);
    const detail = response.data;
    return {
        id: detail.id,
        name: detail.name,
        height: detail.height/10,
        weight: detail.weight / 10,
        types: detail.types.map(item =>item.type.name),
        images: {
            frontDefault: detail.sprites.front_default,
            dreamWorldFront: detail.sprites.other.dream_world.front_default,
            officialArtworkFront: detail.sprites.other["official-artwork"].front_default,    
        },
        baseStats: detail.stats.map(item=>{
            return {
                name: item.stat.name,
                value: item.base_stat,
            }
        }),
    }

}