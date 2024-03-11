import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
        );
        const results = response.data.results;
        const promises = results.map((elem) => axios.get(elem.url));
        const responses = await Promise.all(promises);
        const tempPokemons = responses.map((response) => ({
          name: response.data.name,
          photo: response.data.sprites.front_shiny,
          moves: response.data.moves,
          id: response.data.id,
          height: response.data.height,
          base_experience: response.data.base_experience,
        }));
        setPokemons(tempPokemons);
        console.log(tempPokemons);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div className="container">
      <div className="chipsContainer">
        <div className="chips">
          {pokemons.map((pokemon) => (
            <button
              key={pokemon.id}
              className="chips_button"
              onClick={() => handleClick(pokemon)}
            >
              {pokemon.name}
            </button>
          ))}
        </div>
        <div className="description">
          {selectedPokemon && (
            <>
              <h2 className="description_name">
                {selectedPokemon.name.charAt(0).toUpperCase() +
                  selectedPokemon.name.slice(1)}
              </h2>
              <img
                className="description_img"
                src={selectedPokemon.photo}
                alt={selectedPokemon.name}
              />
              <p className="description_moves">
                Снялся в {selectedPokemon.moves.length} сериях
              </p>
              <p className="description_id">id: {selectedPokemon.id}</p>
              <p className="description_height">
                height: {selectedPokemon.height}
              </p>
              <p className="description_attack">
                attack: {selectedPokemon.base_experience}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
