import './App.css';
import './normalize.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Pokemon from './Componet/Pokemon.js'
import Pagination from './Componet/Pagination'
import Seact from './Componet/Seact.js'
import DetailsPokemon from './Componet/DetailsPokemon.js'
import LocationEncounters from './Componet/LocationEncounters.js'
import {
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [data, setData] = useState();
  const [renderPokemon, setRenderPokemon] = useState();
  const [pageInition, serPageInition] = useState(1);
  const [pageFind, setPageFind] = useState(4);
  const [newData, setNewData] = useState()
  const [seachType, setSeachType] = useState('grass');

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/type/${seachType}`)
      .then((dataApi) => {
        setData(dataApi.data.pokemon)
      })

  }, [pageInition, seachType])

  useEffect(() => {
    if (newData) {
      const renderPokemonSave = newData.map((value) => (
        <Pokemon name={value.pokemon.name} url={value.pokemon.url} type={seachType}
        key={value.pokemon.name} />
      ))
      setRenderPokemon(renderPokemonSave);
    }
  }, [newData])

  useEffect(() => {
    if (data) {
      const inition = pageInition * pageFind;
      const find = inition - pageFind;
      const newDataApi = data.slice(find, inition)
      setNewData(newDataApi);
    }
  }, [data, seachType])

  useEffect(() => {
    if (newData) {
      console.log(newData)
    }
  }, [newData])

  const handleChange = (number) => {
    serPageInition(number);
  }

  const handleSeact = (type) => {
    setSeachType(type)
  }

  const handleSeactSelect = (type) => {
    setSeachType(type)
  }

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path='/pokedex/pokemon/:name'>
            <DetailsPokemon />
          </Route>

          <Route exact path='/pokedex/pokemon/:id/encounters/:name'>
            <LocationEncounters/>
          </Route>
          
          <Route exact path='/'>
          <Seact handleSeact={handleSeact} />
          {newData && renderPokemon}
          {newData && <Pagination pageFind={pageFind}
          lengthArray={data.length} handleChange={handleChange} />}
          </Route>

          <Route path='*'>
            <p>La ruta es invalida</p>
            <Link to='/'>Ir a el Listado</Link>
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
