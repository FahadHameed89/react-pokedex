/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites, stats } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
      
        {/* Pkmn#. Name | Icon */}
        <Typography variant="h2">
          {`${id}.`} 
          {toFirstCharUppercase(name)}
          <img src={front_default} />
        </Typography>
        {/* Image */}
        <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
        
        <Typography variant="h3">Pokemon Info</Typography>
        <Typography>
          {"Species: "}
          <Typography >{toFirstCharUppercase(species.name)} </Typography>
        </Typography>
        <Typography>Height: {height} </Typography>
        <Typography>Weight: {weight} </Typography>
        <Typography variant="h6"> Type(s):</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={toFirstCharUppercase(name)}> {`${toFirstCharUppercase(name)}`}</Typography>;
        })}

          {stats.map((statInfo) => {
          const { stat } = statInfo;
          const { hp } = statInfo.base_stat;
          return <Typography key={(stat.base_stat)}> {`${(hp)}`}</Typography>;
        })}
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}

      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")}>
          back to pokedex
        </Button>
      )}
    </>
  );
};

export default Pokemon;
