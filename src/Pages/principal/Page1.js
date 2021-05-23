import React, { useCallback, useState, useEffect } from "react";

import "./Page1.sass";
import IcoTitle from "./title.png";
import { useHistory } from "react-router-dom";
import { moviesService } from "../../_services/movies.service";
import { MovieElement } from "../../components/principal/MovieElement";
import { ReactComponent as IcoHeart } from "./heart.svg";
import { ReactComponent as IcoList } from "./list.svg";
export const Page1 = (props) => {
  const { OnAddFavorites } = props;
  const [error, seterror] = useState(false);
  const [listmoviesView, setlistmoviesView] = useState([]);
  const history = useHistory();
  const [numberpage, setnumberpage] = useState(1);
  const [descriptionMovieSelect, setdescriptionMovieSelect] =
    useState(undefined);

  const modesView = {
    grid: "grid",
    list : "list",
  };

  const [modeActual, setmodeActual] = useState(modesView.grid);

  useEffect(() => {
    getMovies(numberpage);
  }, [numberpage,modeActual]);

  const getMovies = useCallback(
    (page) => {

      moviesService.getMoviesByPage(page).then(
        (moviesGet) => {
          
          setlistmoviesView(OnViewMovies(moviesGet.results));
        },
        (error) => {
          seterror(true);
        }
      );
    },
    [numberpage,modeActual]
  );

  const OnchangeViewListOrGrid = useCallback(() => {
    if (modeActual === modesView.grid) {
      setmodeActual(modesView.list);
    } else {
      setmodeActual(modesView.grid);
    }
  }, [modeActual]);

  const OnSelect = useCallback((description) => {
    setdescriptionMovieSelect(description);
    window.scrollTo(0, 0);
  }, []);

  const OnNext = useCallback(() => {
    setnumberpage(numberpage + 1);
  }, [numberpage]);
  const OnBack = useCallback(() => {
    if (numberpage > 1) {
      setnumberpage(numberpage - 1);
    }
  }, [numberpage]);
  const OnNavigatefavorites = useCallback(() => {
    history.push("/Favoritos");
  }, []);

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
          OnSelect={OnSelect}
          OnAddFavorites={OnAddFavorites}
          activateFavorites={true}
          element={moviesdata[i]}
          modeActual={modeActual}
        />
      );
    }
    
   return moviestmp;
    
  }, [modeActual]);

  return (
    <div className="Page1">
      <div className="headPage1">
        <div className="titleheadpage1">
          <div className="icotitle">
            <img src={IcoTitle} className="svgTitle" />
          </div>
          Películas
        </div>

        <div className="descriptionMovies">{descriptionMovieSelect}</div>
      </div>

      <div className="panelNavigation_Movies">
        <div
          className="panelNavigation_Movies_element"
          onClick={OnchangeViewListOrGrid}
        >
          <IcoList className="svgIcoList" />
        </div>
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
            onClick={OnNavigatefavorites}
          >
            <div className="svgIcof">
              <IcoHeart className="svgIcoheart" />
            </div>
            <div>Favoritos</div>
          </div>
        </div>
      </div>

      <div className={modeActual===modesView.grid ? "gridMovies" : "listMovies" }>
        {error && <div className="error">Error recuperando las peliculas</div>}
        {listmoviesView}
      </div>
    </div>
  );
};
