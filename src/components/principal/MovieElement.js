import React, { useCallback, useState, useEffect } from "react";

import "./Movies.sass";
import { ReactComponent as IcoStart } from "./start.svg";
import { ReactComponent as IcoHeart } from "./heart.svg";
import { ReactComponent as IcoHeart2 } from "./heart2.svg";

import { useHistory } from "react-router-dom";

export const MovieElement = (props) => {
  const history = useHistory();
  const {
    key,
    id,
    title,
    overview,
    vote,
    voteCount,
    picture,
    pictureBack,
    genres,
    release_date,
    OnSelect,
    OnAddFavorites,
    activateFavorites,
    element,
    modeActual,
  } = props;
  const [clicked, setclicked] = useState(false);

  const OnAddFavoritesclicked = useCallback((data) => {
    setclicked(true);
    OnAddFavorites(data);
  }, []);

  return (
    <div
      className={modeActual === "grid" ? "MoviesView" : "MoviesListView"}
      onClick={() => OnSelect(overview)}
    >
      {modeActual === "grid" && (
        <div className="contentpictureMovie">
          <img src={picture} alt="picture" className="pictureMovie" />
        </div>
      )}

      {modeActual === "grid" && (
        <div className="detailsMovie">
          {activateFavorites && (
            <div className="svgIcof">
              {!clicked ? (
                <IcoHeart
                  className="svgIcoheart"
                  onClick={() => OnAddFavoritesclicked(element)}
                />
              ) : (
                <IcoHeart2 className="svgIcoheart" />
              )}
            </div>
          )}
          <div className="yearMovie">{release_date?.substring(0, 4)}</div>
          <div className="voteMovie">
            <div>{vote}</div>

            <div className="svgIcof">
              <IcoStart className="svgIcostart" />
            </div>
          </div>
        </div>
      )}

      <div className="titleMovie">
        <div>{title}</div>
      </div>
      <div className="descriptionMovie">{overview}</div>

      <div className="idMovie">
        <div className="idUserC">{id}</div>
      </div>
    </div>
  );
};
