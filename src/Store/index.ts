import { configureStore } from '@reduxjs/toolkit'
import {imageTypeReducer} from "./imageTypeSlice";
import {pokemonsReducer} from "./pokemonsSlice";
import {useDispatch} from "react-redux";
import {pokemonDetailReducer} from "./pokemonDetailSlice";

export const store = configureStore({
  reducer: {
    imageType: imageTypeReducer,
    pokemons: pokemonsReducer,
    pokemonDetail: pokemonDetailReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// If you want to get the Dispatch type from your store,
export const useAppDispatch = () => useDispatch<AppDispatch>()
