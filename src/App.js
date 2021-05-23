import React, { useCallback, useState, useEffect } from "react";
import { Page1 } from "./Pages/principal/Page1";
import { Favorites } from "./Pages/favorites/Favorites";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//simulated get server

function App() {
  const [favoritesList, setfavoritesList] = useState([]);

  const OnAddFavorites = useCallback(
    (element) => {
      let elementNotRepeat = false;

      favoritesList.forEach((movieInList) => {
        if (movieInList.id === element.id) {
          elementNotRepeat = true;
        }
      });

      if (!elementNotRepeat) {
        favoritesList.push(element);
        setfavoritesList(favoritesList);
      }

    },
    [favoritesList]
  );

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Redirect from="/" to="/Peliculas" exact />
            <Route
              path={["/Peliculas"]}
              render={(props) => <Page1 OnAddFavorites={OnAddFavorites} />}
            />
            <Route
              path={["/Favoritos"]}
              render={(props) => <Favorites favoritesList={favoritesList} />}
            />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
