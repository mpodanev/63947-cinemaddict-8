import makeFilter from './make-filter';
import makeFilm from './make-film';
import film from './film-data';
import getRandomInteger from './utils';
import filters from './configs';
import Film from './film';

const mainNavigation = document.querySelector(`.main-navigation`);
const allMoviesContainer = document.querySelector(`.films-list__container--all-movies`);
const topRatedContainer = document.querySelector(`.films-list__container--top-rated`);
const mostCommentedContainer = document.querySelector(`.films-list__container--most-commented`);
const INITIAL_FILMS_NUMBER = 7;
const INITIAL_NUMBER_RECOMENTED_FILMS = 2;

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

const firstFilm = new Film(film);
firstFilm.render(allMoviesContainer);
const secondFilm = new Film(film);
secondFilm.render(topRatedContainer);

const addRandomTasks = (e) => {
  const target = e.target;
  if (target.classList.contains(`main-navigation__item`)) {
    allMoviesContainer.textContent = ``;
    const countTasks = getRandomInteger(1, 4);
    addTask(allMoviesContainer, countTasks);
  }
};

mainNavigation.addEventListener(`click`, addRandomTasks);
