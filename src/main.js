import filmItem from "./film-data";
import filters from "./filter-data";
import Film from "./film";
import FilmPopup from "./fimlPopup";
import Filter from "./filter";
import {chart, statisticTemplate, statisticElement} from './statistic';

const mainNavigation = document.querySelector(`.main-navigation`);
const mainContainer = document.querySelector(`.main`);
const allMoviesContainer = document.querySelector(`.films-list__container--all-movies`);
const filmsContainer = document.querySelector(`.films`);

const getFilmsData = (count) => {
  const filmsArr = [];
  for (let i = 0; i < count; i++) {
    filmsArr.push(filmItem());
  }
  return filmsArr;
};

const filmsData = getFilmsData(7);

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

mainContainer.appendChild(statisticElement(statisticTemplate(filterFilms(filmsData, `History`))));

const statisticCtx = document.querySelector(`.statistic__chart`);
const statisticContainer = document.querySelector(`.statistic`);

const renderFilters = (enterEltment, filtersArr) => {
  enterEltment.innerHTML = ``;

  filtersArr.forEach((filter) => {
    const filterComponent = new Filter(filter);

    filterComponent.onFilter = () => {
      const filteredFilms = filterFilms(filmsData, filterComponent._title);
      renderFilms(filteredFilms, allMoviesContainer);
      if (filter.title === `Stats`) {
        filmsContainer.classList.add(`visually-hidden`);
        statisticContainer.classList.remove(`visually-hidden`);
        chart(statisticCtx, filmsData);
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
    const popupFilmComponent = new FilmPopup(film);

    filmComponent.onComment = () => {
      const template = popupFilmComponent.render();
      document.body.appendChild(template);
    };

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

    popupFilmComponent.onClose = (newObject) => {
      filmComponent.unbind();
      filmComponent.update(Object.assign(filmItem, newObject));
      filmComponent.bind();

      popupFilmComponent.unrender(document.body);
    };

    container.appendChild(filmComponent.render());
  });
};

renderFilms(filmsData, allMoviesContainer);
