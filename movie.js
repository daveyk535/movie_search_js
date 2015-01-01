// Structure
// ----------------------------------------------
var userQuery = document.querySelector(".movie");
var form = document.querySelector("form");
var movies;
var anchor = document.querySelector("#show-results");
var poster2;


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

$('a').on('click', function(event) {
  event.preventDefault();
  alert("You clicked a link");
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

function getPosters(event) {
  var url = "http://www.omdbapi.com/?i=" + userQuery.value;

}
// Functions for updating the page
// ----------------------------------------------
function updatePage(i) {
  // Step 1 - create the new <a> tag for each movie and a line break for readability
  var a = document.createElement("a");
  var lineBreak = document.createElement("br");
  // Step 2 - create the url for the poster
  // createPosterUrl(i.imdbID);
  var urlPoster = "http://www.omdbapi.com/?i=" + i.imdbID; 
  // Step 3 - add new elements to the DOM
  a.setAttribute('href', urlPoster);
  a.innerHTML = i.Title;
  anchor.appendChild(a);
  anchor.appendChild(lineBreak);
};

// function createPosterUrl(omdbID) {
//   var urlPoster = "http://www.omdbapi.com/?i=" + omdbID;
//   $.get(urlPoster, function(data) {
//     var posterData = JSON.parse(data);
//     poster2 = posterData.Poster;
//   })
// };

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






