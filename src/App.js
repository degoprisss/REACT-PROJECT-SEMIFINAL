import './App.css';
import './normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './grid-portafolio.css';
import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'
import Pokemon from './Componet/Pokemon.js'
import Pagination from './Componet/Pagination.js'
import Seact from './Componet/Seact.js'
import DetailsPokemon from './Componet/DetailsPokemon.js'
import LocationEncounters from './Componet/LocationEncounters.js'

import {
  HashRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

function App() {
  const [data, setData] = useState();
  const [renderPokemon, setRenderPokemon] = useState();
  const [pageInition, serPageInition] = useState(1);
  const [pageFind] = useState(4);
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

  // --------------------------------------------------------------------- //


  const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };

  const authContext = createContext();

  function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
      <authContext.Provider value={auth}>
        {children}
      </authContext.Provider>
    );
  }

  function useAuth() {
    return useContext(authContext);
  }


  function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = cb => {
      return fakeAuth.signin(() => {
        setUser("user");
        cb();
      });
    };

    const signout = cb => {
      return fakeAuth.signout(() => {
        setUser(null);
        cb();
      });
    };

    return {
      user,
      signin,
      signout
    };
  }

  function AuthButton() {
    let history = useHistory();
    let auth = useAuth();

    return auth.user ? (
      <p className='ButtonLogin'>
        <h2>Welcome!{" "}</h2>
        <div className='ButtonLogin'>
          <button className='btn btn-warning Login' style={{ padding: '2%', marginLeft: '2%' }}
            onClick={() => {
              auth.signout(() => history.push("/"));
            }}
          >
            Sign out
      </button>
        </div>
      </p>
    ) : (
        <p className='ButtonLogin'>You are not logged in.</p>
      );

  }

  function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
        }
      />
    );
  }

  function PublicPage() {
    return <h3>Public</h3>;
  }

  function ProtectedPage() {
    return <h3>Protected</h3>;
  }

  function LoginPage() {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
      auth.signin(() => {
        history.replace(from);
      });
    };

    return (
      <div className='ButtonLogin'>
        <p>You must log in to view the page at {from.pathname}</p>
        <button className='ButtonLogin btn btn-warning Login' onClick={login}>Log in</button>
      </div>
    );
  }

  // ------------------------------------------------------------------ //

  return (
    <div className="App containerCardsGeneral col-sm-12">
      <ProvideAuth>
        <HashRouter>
          <Switch>
            <PrivateRoute exact path='/pokedex/pokemon/:name'>
              <AuthButton />
              <DetailsPokemon />
            </PrivateRoute>

            <Route exact path='/pokedex/pokemon/:id/encounters/:name'>
              <LocationEncounters />
            </Route>

            <Route path="/login">
              <LoginPage />
            </Route>

            <Route exact path='/'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
                alt="pokemon" className='titlePokemon' />
              <Seact handleSeact={handleSeact}/>
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
      </ProvideAuth>
    </div>
  );
}

export default App;
