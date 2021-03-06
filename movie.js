// Structure
// ----------------------------------------------
var userQuery = document.querySelector(".movie");
var form = document.querySelector("form");
var anchor = document.querySelector("#show-results");

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
  saveSearchTerm();
  (form).reset();
});


// Event handlers
// ----------------------------------------------
function getResults(event) {
  var url = "http://www.omdbapi.com/?s=" + userQuery.value;
  $.get(url, function(data) {
    var movies = JSON.parse(data)
    movies.Search.forEach(updatePage)
  })
};

// Functions for updating the page
// ----------------------------------------------
function updatePage(i) {
  // Step 1 - create the new <a> tag for each movie and a line break for readability
  var a = document.createElement("a");
  var lineBreak = document.createElement("br");
  // Step 2 - create the url for the poster
  var urlPoster = "http://www.omdbapi.com/?i=" + i.imdbID; 
  // Step 3 - get the poster url
  $.get(urlPoster, function(data) {
    var posterData = JSON.parse(data);
    posterData = posterData.Poster;
    // Step 4 - add new elements to the DOM
    a.setAttribute('href', posterData);
    a.innerHTML = i.Title;
    anchor.appendChild(a);
    anchor.appendChild(lineBreak);
  })
};

// Utility functions
// ------------------------------------------------

//retrieve search histoy from local storage
function getSearchHistory() {
  if (localStorage.getItem("searchHistory") === null ) {
      console.log("Local storage is empty");
      return;
  }
  searchHistory = localStorage.getItem("searchHistory");
  searchHistory = JSON.parse(searchHistory);
};

//save the search keyword in local storage
function saveSearchTerm() {
  var date = new Date();
  var search = {
      name: userQuery.value,
      date: date
  }
  searchHistory.searches.push(search);
  var json = JSON.stringify(searchHistory);
  localStorage.setItem("searchHistory", json)
};






