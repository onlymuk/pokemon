import PokeCard from "./PokeCard";
import {useEffect } from "react";
import styled from "@emotion/styled";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useSelector} from "react-redux";
import {fetchPokemons} from "../Store/pokemonsSlice";
import { RootState, useAppDispatch} from "../Store";

const PokeCardList = () => {
  const dispatch = useAppDispatch()
  const { pokemons } = useSelector((state: RootState) => state.pokemons)
  const [infiniteRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: true,
    onLoadMore: () => {
      dispatch(fetchPokemons(pokemons.next))
    },
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: false,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 100px 0px',
  });

  useEffect(() => {
    if(pokemons.results.length > 0) {
      return;
    }

    (async () => {
      try {
        await dispatch(fetchPokemons()).unwrap()
      } catch (e) {
        alert('포켓몬 정보를 가져오는데 실패했어요.')
      }
    })()
  }, [dispatch, pokemons])

  return (
    <>
      <List>
        {
          pokemons.results.map((pokemon, idx) => (
            <PokeCard key={`${pokemon.name}_${idx}`} name={pokemon.name} resource={pokemon.url}/>
          ))
        }
      </List>
      <div ref={infiniteRef}>로딩</div>
    </>
  );
}

const List = styled.ul`
  list-style: none;
  margin: 0 0 32px 0;
  padding: 0;
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

export default PokeCardList
