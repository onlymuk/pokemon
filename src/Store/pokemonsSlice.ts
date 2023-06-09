import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {fetchPokemonsAPI, PokemonListResponse} from '../Service/pokemonService'

// First, create the thunk
export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (nextUrl?: string) => {
    const response = await fetchPokemonsAPI(nextUrl)
    //console.log(response)
    return response
  }
)

interface PokemonsState {
  pokemons: PokemonListResponse
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
  pokemons: {
    count: 0,
    next: '',
    results: []
  },
  loading: 'idle',
} as PokemonsState

// Then, handle actions in your reducers:
const pokemonsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      if(state.pokemons.results.length > 0) {
        state.pokemons = {
          ...action.payload,
          results: [...state.pokemons.results, ...action.payload.results]
        }
      } else {
        state.pokemons = action.payload
      }

      state.loading = 'succeeded'

      // Add user to the state array
      // state.pokemons.push(action.payload)
    })
  },
})

export const pokemonsReducer = pokemonsSlice.reducer
