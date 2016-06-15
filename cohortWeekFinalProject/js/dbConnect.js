(function () {
  function getMovies() {
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.mlab.com/api/1/databases/movies/collections/movies?apiKey=rnCd0wgtMrlCkNoa5VcuBANGjuSX1Dzw", true);
    request.onreadystatechange = function () {
      if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        console.log(request.responseText);
        return request.response;
      };
    };
    request.send();
  }
  function newMovie(obj) {
    var request = new XMLHttpRequest();
    request.open("POST", "https://api.mlab.com/api/1/databases/movies/collections/movies?apiKey=rnCd0wgtMrlCkNoa5VcuBANGjuSX1Dzw", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(obj);
  }
  function getMovie(id) {
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.mongolab.com/api/1/databases/movies/collections/movies/" + id + "?apiKey=rnCd0wgtMrlCkNoa5VcuBANGjuSX1Dzw", true);
    request.send();
  }
  function updatMovie(id, obj) {
    var request = new XMLHttpRequest();
    request.open("PUT", "https://api.mongolab.com/api/1/databases/movies/collections/movies/" + id + "?apiKey=rnCd0wgtMrlCkNoa5VcuBANGjuSX1Dzw", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(obj);
  }
  function deleteMovie(id) {
    var request = new XMLHttpRequest();
    request.open("DELETE", "https://api.mongolab.com/api/1/databases/movies/collections/movies/" + id + "?apiKey=rnCd0wgtMrlCkNoa5VcuBANGjuSX1Dzw", true);
    request.send();
  }
  window.getMovies = getMovies;
  window.newMovie = newMovie;
  window.getMovie = getMovie;
  window.updatMovie = updatMovie;
  window.deleteMovie = deleteMovie;
}());
