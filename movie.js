// Structure
// ----------------------------------------------
var userQuery = document.querySelector(".movie");
var form = document.querySelector("form");
var movies;
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
  // alert("test");
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
  })
};


// Functions for updating the page
// ----------------------------------------------
function updatePage(i) {
  // Step 1 - create the new <p> tag for each movie
  var p = document.createElement("p");
  // Step 2 - add new elements to the DOM
  p.textContent = i.Title + " " + "(" + i.Year + ")";
  anchor.appendChild(p);
};

// Utility functions
// ------------------------------------------------
function getSearchHistory() {
  if (localStorage.getItem("searchList") === null ) {
      console.log("Local storage is empty");
      return;
  }

  searchList = localStorage.getItem("searchList");
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
  console.log(searchHistory);
};






