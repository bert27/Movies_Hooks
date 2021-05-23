import axios from "axios";
const key = "fbf5e48d5952c6422d10deb441d0f5c9";
export const moviesService = {
  getMoviesByPage,
};

function getMoviesByPage(page) {
  const headers = {
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "GET",
    headers,
  };
  //not working language es
  const language = "es_ES";

  return axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=` +
        key +
        `&language=` +
        language +
        `&page=` +
        page,
      requestOptions
    )
    .then(handleResponse)
    .then((token) => {
      return token;
    });
}

function handleResponse(response) {
  var p = new Promise((resolve, reject) => {
    const data = response.data;
    if (response.status >= 400) {
      const error = response.statusText;
      reject(error);
    }

    resolve(data);
  });
  return p.then((data) => {
    return data;
  });
}
