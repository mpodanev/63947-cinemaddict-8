import makeFilter from './make-filter';
import film from './film-data';
import filters from './configs';
import Film from './film';
import FilmPopup from './fimlPopup';

const mainNavigation = document.querySelector(`.main-navigation`);
const allMoviesContainer = document.querySelector(`.films-list__container--all-movies`);
// const topRatedContainer = document.querySelector(`.films-list__container--top-rated`);

const addFilters = (enterEltment, filtersArr) => {
  let counter = 0;
  while (counter < filtersArr.length) {
    const link = filtersArr[counter].link;
    const className = filtersArr[counter].className;
    const title = filtersArr[counter].title;
    const count = filtersArr[counter].count;
    enterEltment.insertAdjacentHTML(`beforeend`, makeFilter(link, className, title, count));
    counter++;
  }
};

addFilters(mainNavigation, filters, 0);

const filmComponent = new Film(film);
const popupFilmComponent = new FilmPopup(film);

allMoviesContainer.appendChild(filmComponent.render());

filmComponent.onComment = () => {
  document.body.appendChild(popupFilmComponent.render());
};

popupFilmComponent.onClose = () => {
  popupFilmComponent.unrender(document.body);
};
