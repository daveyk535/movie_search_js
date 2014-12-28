// Structure
// ----------------------------------------------
var userQuery = document.querySelector(".movie");
var form = document.querySelector("form");
var movies;
var anchor = document.querySelector("#show-results");
var poster2 = "";


// Setup
// ----------------------------------------------
var searchHistory = {
	"searches": []
};

// Events
// ----------------------------------------------
window.addEventListener("load", getSearchHistory);
// form.addEventListener("submit", getResults);
$('#search-form').submit(function(event) {
  event.preventDefault();
  getResults();
  (form).reset();
});

// Event handlers
// ----------------------------------------------
function getResults(event) {
  saveSearchTerm();
  var url = "http://www.omdbapi.com/?s=" + userQuery.value;
  $.get(url, function(data) {
    movies = JSON.parse(data)
    movies.Search.forEach(updatePage)
    return movies;
  })
};

// Functions for updating the page
// ----------------------------------------------
function updatePage(i) {
  // Step 1 - create the new <a> tag for each movie
  var a = document.createElement("a");
  // Step 2 - get the url for the poster
  var poster = createPosterUrl(i.imdbID);
  // Step 3 - add new elements to the DOM
  a.textContent = i.Title;
  anchor.appendChild(a);
};

function createPosterUrl(omdbID) {
  var urlPoster = "http://www.omdbapi.com/?i=" + omdbID;
  $.get(urlPoster, function(data) {
    var posterData = JSON.parse(data);
    poster2 = posterData.Poster;
    console.log(poster2, "test");
    // return ("poster2");
  })
};

// Utility functions
// ------------------------------------------------
function getSearchHistory() {
  if (localStorage.getItem("searchHistory") === null ) {
      console.log("Local storage is empty");
      return;
  }

  searchHistory = localStorage.getItem("searchHistory");
  // searchList = JSON.parse(searchList);
  console.log(searchList)
};

function saveSearchTerm() {
  var date = new Date();
  var search = {
      name: userQuery.value,
      date: date
  }
  searchHistory.searches.push(search);
  var json = JSON.stringify(searchHistory);
  console.log(json);
  localStorage.setItem("searcHistory", json)
};






