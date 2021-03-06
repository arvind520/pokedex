import "./App.css";
import { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { HomePage } from "./pages/HomePage";
import { Route, Switch, useParams } from "react-router-dom";
import { PokeApi } from "./api/pokeApi";

function getPokemonImageFromData(data) {
  const defaultImage =
    "https://static.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png/revision/latest/scale-to-width-down/180?cb=20140520015336";
  const {
    sprites: { other },
  } = data;
  const officialArtwork = other["official-artwork"];
  return officialArtwork['front_default'];
}

function Pokemon(props) {
  const { data } = props;
  if(!data){
    return null;
  }
  return (
    <div style={{ width: "100%", backgroundColor: "lightblue" }}>
      {data.name}
      {data.height}
      <img
        src={getPokemonImageFromData(data)}
        width={300}
        height={300}
        alt={"pokemon image"}
      />
    </div>
  );
}

function PokemonPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(function () {
    PokeApi.getPokemonByName(params.name)
      .then((data) => {
        setIsLoading(false);
        setPokemonData(data);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Network error, try after some time.
      </div>
    );
  }

  return (
    <>
      <h1>More data for {params.name}</h1>
      <Pokemon data={pokemonData} />
    </>
  );
}

function App() {
  return (
    <>
      <Container maxWidth="sm" style={{}}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/pokemon/:name">
            <PokemonPage />
          </Route>
          <Route>
            <h1>No Match for this route.</h1>
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App;
