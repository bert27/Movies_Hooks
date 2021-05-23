import React, { useCallback, useState, useEffect } from "react";
import { MovieElement } from "../../components/principal/MovieElement";
import { useHistory } from "react-router-dom";
export const Favorites = (props) => {
  const { favoritesList } = props;
  const [numberpage, setnumberpage] = useState(1);
  const [listmoviesView, setlistmoviesView] = useState([]);
  const [error, seterror] = useState(false);
  const history = useHistory();
  useEffect(() => {
    getMovies(numberpage);
  }, [numberpage, favoritesList]);

  const getMovies = useCallback(
    (page) => {
      OnViewMovies(favoritesList);
    },
    [numberpage, favoritesList]
  );

  const OnSelect = useCallback((movie) => {}, []);
  const OnViewMovies = useCallback((moviesdata) => {
    let moviestmp = [];
    for (let i = 0; i < moviesdata.length; i++) {
      moviestmp.push(
        <MovieElement
          key={moviesdata[i]?.id}
          id={moviesdata[i]?.id}
          title={moviesdata[i]?.original_title}
          overview={moviesdata[i]?.overview}
          vote={moviesdata[i]?.vote_average}
          voteCount={moviesdata[i]?.vote_count}
          picture={
            "https://image.tmdb.org/t/p/w200/" + moviesdata[i]?.poster_path
          }
          pictureBack={
            "https://image.tmdb.org/t/p/w200/" + moviesdata[i]?.backdrop_path
          }
          genres={moviesdata[i]?.genre_ids}
          release_date={moviesdata[i]?.release_date}
          activateFavorites={false}
          element={moviesdata[i]}
          OnSelect={OnSelect}
          modeActual={"grid"}
        />
      );
    }
    setlistmoviesView(moviestmp);
  }, []);

  const OnNext = useCallback(() => {
    setnumberpage(numberpage + 1);
  }, [numberpage]);
  const OnBack = useCallback(() => {
    if (numberpage > 1) {
      setnumberpage(numberpage - 1);
    }
  }, [numberpage]);

  const OnPrincipal = useCallback(() => {
    history.push("/Peliculas");
  }, []);
  return (
    <>
      <div className="Page1">
        <div className="headPage1">
          <div className="titleheadpage1">Favoritos</div>
        </div>

        <div className="panelNavigation_Movies">
          {numberpage > 1 && (
            <div className="panelNavigation_Movies_element">
              <div
                className="panelNavigation_Movies_element_button"
                onClick={OnBack}
              >
                Atras
              </div>
            </div>
          )}
          <div className="panelNavigation_Movies_element">
            <div
              className="panelNavigation_Movies_element_button"
              onClick={OnNext}
            >
              Siguiente
            </div>
          </div>
          <div className="panelNavigation_Movies_element">
            <div
              className="panelNavigation_Movies_element_button"
              onClick={OnPrincipal}
            >
              <div>Volver</div>
            </div>
          </div>
        </div>

        <div className="gridMovies">
          {error && <div className="error">Error recuperando favoritos</div>}
          {listmoviesView}
        </div>
      </div>
    </>
  );
};
