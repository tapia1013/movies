const autoCompleteConfig = {
  renderOption(movie) {
    // if image not available ? dont show any :else show Poster
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
    `;
  },

  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
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
  }
}


createAutoComplete({
  // ... means make a copy of autoCompleteConfig
  ...autoCompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden')
    onMovieSelect(movie, document.querySelector('#left-summary'));
  }
});
createAutoComplete({
  // ... means make a copy of autoCompleteConfig
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden')
    onMovieSelect(movie, document.querySelector('#right-summary'));
  }
});


const onMovieSelect = async (movie, summaryElement) => {
  // console.log(movie);
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      // api key
      apikey: 'dcf2cc2e',
      // info within ID
      i: movie.imdbID
    }
  });
  // console.log(response.data);

  // render movieTemplate
  summaryElement.innerHTML = movieTemplate(response.data)
};


const movieTemplate = (movieDetail) => {
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
}



























































































































































































































































































































































