import styled from "@emotion/styled";
import {useEffect} from "react";
import {useIntersectionObserver} from "react-intersection-observer-hook";
import {useNavigate} from "react-router-dom";
import PokeNameChip from "../Common/PokeNameChip";
import PokeMarkChip from "../Common/PokeMarkChip";
import {PokeImageSkeleton} from "../Common/PokeImageSkeleton";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../Store";
import {fetchPokemonDetail} from "../Store/pokemonDetailSlice";

interface PokeCardProps {
  resource: string
  name: string
}

const PokeCard = (props:PokeCardProps) => {
  const navigate = useNavigate();
  const imageType = useSelector((state: RootState) => state.imageType.type);
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;
  const pokemonDetails = useSelector((state: RootState) => state.pokemonDetail.pokemonDetails);
  const pokemon = pokemonDetails[props.name]
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(!isVisible) {
      return;
    }

    dispatch(fetchPokemonDetail(props.name))
  }, [dispatch, props.name, isVisible])

  const handleClick = () => {
    navigate(`/pokemon/${pokemon?.name}`)
  }

  if(!pokemon) {
    return (
      <Container ref={ref} color={'#32CD32'}>
        <Header>
          <PokeNameChip name={'포켓몬'} id={0} numberColor={'#32CD32'} />
        </Header>
        <Body>
          <PokeImageSkeleton/>
        </Body>
        <Footer>
          <PokeMarkChip/>
        </Footer>
      </Container>
    )
  }

  return (
    <Container ref={ref} onClick={handleClick} color={pokemon.color}>
      <Header>
        <PokeNameChip name={pokemon.koreanName} numberColor={pokemon.color} id={pokemon.id}/>
      </Header>
      <Body>
        <Image src={pokemon.images[imageType]} alt={pokemon.koreanName}/>
      </Body>
      <Footer>
        <PokeMarkChip/>
      </Footer>
    </Container>
  );
}

const Container = styled.li<{ color: string }>`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;
  padding: 6px;
  border: 1px solid #C0C0C0;
  box-shadow: 1px 1px 3px 1px #C0C0C0;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform:scale(1.1);
  }
  
  &:active {
    background-color: ${props => props.color};
    opacity: 0.8;
    transition: background-color 0s;
  }
`

const Header = styled.section`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`

const Body = styled.section`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`

const Image = styled.img`
  width: 180px;
  height: 180px;
`

const Footer = styled.section`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`

export default PokeCard
