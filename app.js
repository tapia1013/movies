const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      // api key
      apikey: 'dcf2cc2e',
      // // Search... dont need anymore
      // s: 'avengers'
      // info
      s: searchTerm
    }
  });

  // check if there's error return empty array
  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

// html template
const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

// Select input
const input = document.querySelector('input');
// render content inside html template
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


//make variable that delays request
const onInput = async event => {
  const movies = await fetchData(event.target.value);

  // If there's no movies/results dont show anything
  if (!movies.length) {
    dropdown.classList.remove('is-active');
    return;
  }

  // clear input
  resultsWrapper.innerHTML = '';

  // Add active to html template
  dropdown.classList.add('is-active');

  // Iterate movies
  for (let movie of movies) {
    const option = document.createElement('a');
    // if image not available ? dont show any :else show Poster
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

    // Create dropdown-item class
    option.classList.add('dropdown-item');

    // insert html in option<a></a>
    option.innerHTML = `
      <img src="${imgSrc}" />
      ${movie.Title}
    `;

    // detect a click on the <a></a> or movie
    option.addEventListener('click', () => {
      // close the dropdown
      dropdown.classList.remove('is-active');
      // update text inside the input with title of movie clicked
      input.value = movie.Title;

      // Show the movie and info
      onMovieSelect(movie)
    });

    // take div and innerHTML and insert to DOM with id and appendChild
    resultsWrapper.appendChild(option);

  }
};

// add event listener to input and listen for input
input.addEventListener('input', debounce(onInput, 500));

// Close sidebar menu if use clicks out of the box of list
document.addEventListener('click', event => {
  // console.log(event.target);

  // if the root/menu/dropdown is not clicked
  if (!root.contains(event.target)) {
    // remove active class that we created above
    dropdown.classList.remove('is-active')
  }
});


const onMovieSelect = async movie => {
  // console.log(movie);

  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      // api key
      apikey: 'dcf2cc2e',
      // info within ID
      i: movie.imdbID
    }
  });

  console.log(response.data);
}






























































































































































































































































































































































