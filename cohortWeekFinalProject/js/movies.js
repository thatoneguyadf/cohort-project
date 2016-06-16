(function () {
  // function for creating movie objects
  function Movie(title, runTime, release, genre, desc) {
    this.title = title;
    this.runTime = runTime;
    this.release = release;
    this.genre = genre;
    this.description = desc;
    this.checkedIn = true;
    this.checkInDate = '';
    this.checkOutDate = '';
    this.dueDate = '';
  }
  Movie.prototype = {
    runningTimeHours: function runningTimeHours() {
      return Math.floor(this.runTime / 60) + ' hrs ' + (this.runTime % 60) + ' min';
    },
    preview: function preview() {
      if (this.description.length > 50)
        return this.description.slice(0, 50).replace(/\s$/, '') + '...';
      return this.description;
    },
    checkIn: function checkIn(rate, randDays) {
      this.checkedIn = true;
      this.checkInDate = new Date();
      this.checkInDate.setDate(this.checkInDate.getDate() + randDays);
      var checkOutTime = this.checkOutDate.getTime();
      var checkInTime = this.checkInDate.getTime();
      var days = Math.floor(Math.abs(checkInTime - checkOutTime) / 1000 / 60 / 60 / 24);
      return this.title + ' has been out for ' + days + ' days. The fee for this movie is ' + (days * rate);
    },
    checkOut: function checkOut() {
      this.checkedIn = false;
      this.checkOutDate = new Date();
      this.dueDate = new Date();
      this.dueDate.setDate(this.checkOutDate.getDate() + 14);
      return 'You hav checked out ' + this.title + '. It is due back by ' + this.dueDate;
    }
  };
  Movie.create = function create(title, runTime, release, genre, desc) {
    return new Movie(title, runTime, release, genre, desc);
  };
  window.movie = Movie.create;
}());
