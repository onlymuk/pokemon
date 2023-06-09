import styled from "@emotion/styled";
import PokeNameChip from "../Common/PokeNameChip";
import PokeMarkChip from "../Common/PokeMarkChip";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  PokemonDetailType,
  fetchPokemonsDetail,
} from "../Service/pokemonService";

interface PokeCardProps {
  name: string;
}

const TempImgUrl =
  "https://mblogthumb-phinf.pstatic.net/20160722_90/cool911016_1469169937457pEG2Q_JPEG/150519_%C7%C7%C4%AB%C3%F2%C6%E4%C0%CC%C6%DB%C5%E4%C0%CC_%B5%B5%BE%C8_004.jpg?type=w800";
const PokeCard = (props: PokeCardProps) => {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null);

  const handleClick = () => {
    navigate(`/pokemon/${props.name}`);
  };

  useEffect(() => {
    (async () => {
      const detail = await fetchPokemonsDetail(props.name);
      setPokemon(detail);
    })();
  }, [props.name]);

  if (!pokemon) {
    return null;
  }
  return (
    <Item onClick={handleClick}>
      <Header>
        <PokeNameChip name={pokemon.name} id={pokemon.id} />
      </Header>
      <Body>
        <Image src={pokemon.images.dreamWorldFront} alt={pokemon.name} />
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Item>
  );
};

const Item = styled.li`
  border: 1px solid #c0c0c0;
  padding: 8px;
  width: 250px;
  height: 300px;
  box-shadow: 1px 1px 3px 1px #c0c0c0;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;

  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    background-color: yellow;
    opacity: 0.8;
    transition: background-color 0s;
  }
`;

const Header = styled.section`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`;

const Body = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
  flex: 1 1 auto;
`;
const Footer = styled.section`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`;
const Image = styled.img`
  width: 180px;
  height: 180px;
`;
export default PokeCard;
