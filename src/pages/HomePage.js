import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { pokemons } from "../pokemonList";
import {PokemonGallery} from '../components/PokemonGallery';
import {Link} from 'react-router-dom';

function HomePage(){
  const [selection, setSelection] = useState(null);
    return <>
    <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "lightgray",
          }}
        >
          <h1>My PokeDex</h1>
        </div>
        <div style={{ margin: "20px", display: "flex" }}>
          <Autocomplete
            id="combo-box-demo"
            options={pokemons}
            getOptionLabel={(option) => {
              const { name } = option;
              return name[0].toUpperCase() + name.substr(1);
            }}
            style={{ width: 300, flexGrow: 1, marginRight: "20px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Pokemons"
                variant="outlined"
              />
            )}
            onChange={function (event, currentSelection, reason) {
              console.log(currentSelection, reason);
              setSelection(currentSelection);
            }}
          />
          <Link to={selection? '/pokemon/'+selection.name : '/'}>Go to Pokemon</Link>
          {/* <Button variant="contained" color="primary">
            Go To Pokemon
          </Button> */}
        </div>
        <h1>Pokemon Gallery</h1>
        <PokemonGallery />
    </>;
}

export {HomePage};