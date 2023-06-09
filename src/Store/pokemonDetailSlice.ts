import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {fetchPokemonDetailAPI, PokemonDetailType} from '../Service/pokemonService'
import {RootState} from "./index";

// First, create the thunk
export const fetchPokemonDetail = createAsyncThunk(
  'pokemon/fetchPokemonDetail',
  async (name:string) => {
    const response = await fetchPokemonDetailAPI(name)
    //console.log(response)
    return response
  },
  // https://redux-toolkit.js.org/api/createAsyncThunk#canceling-before-execution
  {
    condition: (name, { getState, extra }) => {
      const { pokemonDetail } = getState() as RootState
      const data = pokemonDetail.pokemonDetails[name]

      if(data) {
        return false
      }
    },
  }
)

interface PokemonDetailsState {
  pokemonDetails: Record<string, PokemonDetailType>
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
  pokemonDetails: {},
  loading: 'idle',
} as PokemonDetailsState

// Then, handle actions in your reducers:
const pokemonDetailSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPokemonDetail.fulfilled, (state, action) => {
      state.pokemonDetails = {
        ...state.pokemonDetails,
        [action.payload.name]: action.payload
      }
    })
  },
})

export const pokemonDetailReducer = pokemonDetailSlice.reducer
