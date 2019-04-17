import filmItem from "./film-data";
import filters from "./filter-data";
import Film from "./film";
import FilmPopup from "./fimlPopup";
import Filter from "./filter";
import Statistic from './statistic';

const mainNavigation = document.querySelector(`.main-navigation`);
const allMoviesContainer = document.querySelector(`.films-list__container--all-movies`);
const topRatedContainer = document.querySelector(`.films-list__container--top-rated`);
const mostCommentedContainer = document.querySelector(`.films-list__container--most-commented`);
const filmsContainer = document.querySelector(`.films`);

const getFilmsData = (count) => {
  const filmsArr = [];
  for (let i = 0; i < count; i++) {
    filmsArr.push(filmItem());
  }
  return filmsArr;
};

const mainFilmsData = getFilmsData(7);
const topRatedFilmsData = getFilmsData(2);
const mostCommentedFilmsData = getFilmsData(2);

const filterFilms = (films, filterName) => {
  let filteredFilms = [];

  switch (filterName) {
    case (`All movies`):
      filteredFilms = films;
      break;
    case (`Watchlist`):
      filteredFilms = films.filter((it) => it.isWatchList);
      break;
    case (`History`):
      filteredFilms = films.filter((it) => it.isWatched);
      break;
    case (`Favorites`):
      filteredFilms = films.filter((it) => it.isFavorite);
      break;
  }

  return filteredFilms;
};

const statisticContainer = document.querySelector(`.statistic`);

const renderFilters = (enterEltment, filtersArr) => {
  enterEltment.innerHTML = ``;

  filtersArr.forEach((filter) => {
    const filterComponent = new Filter(filter);

    filterComponent.onFilter = () => {
      const filteredFilms = filterFilms(mainFilmsData, filterComponent._title);
      renderFilms(filteredFilms, allMoviesContainer);
      if (filter.title === `Stats`) {
        filmsContainer.classList.add(`visually-hidden`);
        statisticContainer.classList.remove(`visually-hidden`);
      } else {
        filmsContainer.classList.remove(`visually-hidden`);
        statisticContainer.classList.add(`visually-hidden`);
      }
    };

    enterEltment.appendChild(filterComponent.render());
  });
};

renderFilters(mainNavigation, filters);

const renderFilms = (films, container) => {
  container.innerHTML = ``;
  films.forEach((film) => {
    const filmComponent = new Film(film);

    filmComponent.onAddToWatchList = () => {
      film.isWatchList = !film.isWatchList;
      filmComponent.unbind();
      filmComponent.update(film);
      filmComponent.bind();
    };

    filmComponent.onMarkAsWatched = () => {
      film.isWatched = !film.isWatched;
      filmComponent.unbind();
      filmComponent.update(film);
      filmComponent.bind();
    };

    filmComponent.onFavorite = () => {
      film.isFavorite = !film.isFavorite;
      filmComponent.unbind();
      filmComponent.update(film);
      filmComponent.bind();
    };

    filmComponent.onComment = () => {
      const popupFilmComponent = new FilmPopup(film);
      const template = popupFilmComponent.render();
      document.body.appendChild(template);

      popupFilmComponent.onClose = (newObject) => {
        filmComponent.unbind();
        filmComponent.update(Object.assign(film, newObject));
        filmComponent.bind();

        popupFilmComponent.unrender(document.body);
      };
    };

    container.appendChild(filmComponent.render());
  });
};

renderFilms(mainFilmsData, allMoviesContainer);
renderFilms(topRatedFilmsData, topRatedContainer);
renderFilms(mostCommentedFilmsData, mostCommentedContainer);

const showStatistic = () => {
  statisticContainer.innerHTML = ``;
  const statisticComponent = new Statistic(mainFilmsData);
  statisticContainer.appendChild(statisticComponent.render());
};


showStatistic();
