(function () {
  // function for creating movie objects
  function Movie(title, runTime, release, genre, desc) {
    this.title = title;
    this.runTime = runTime;
    this.release = release;
    this.genre = genre;
    this.description = desc;
  }
  Movie.prototype = {
    runningTimeHours: function runningTimeHours() {
      return Math.floor(this.runTime / 60) + ' hrs ' + (this.runTime % 60) + ' min';
    },
    preview: function preview() {
      if (this.description.length > 50)
        return this.description.slice(0, 50).replace(/\s$/, '') + '...';
      return this.description;
    }
  };
  Movie.create = function create(title, runTime, release, genre, desc) {
    return new Movie(title, runTime, release, genre, desc);
  };
  window.movie = Movie.create;
}());
