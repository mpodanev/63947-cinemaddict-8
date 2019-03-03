import makeFilter from './make-filter';
import makeFilm from './make-film';

const mainNavigation = document.querySelector(`.main-navigation`);
const filmsListContainer = document.querySelectorAll(`.films-list__container`);
const initialNumberOfTasks = 7;
const initialNumberOfTasksRecomented = 2;

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

const filters = [
  {
    link: `#all`,
    className: `main-navigation__item main-navigation__item--active`,
    title: `All movies`
  },
  {
    link: `#watchlist`,
    className: `main-navigation__item`,
    title: `Watchlist`,
    count: 13
  },
  {
    link: `#history`,
    className: `main-navigation__item`,
    title: `History`,
    count: 4
  },
  {
    link: `#favorites`,
    className: `main-navigation__item`,
    title: `Favorites`,
    count: 8
  },
  {
    link: `#stats`,
    className: `main-navigation__item main-navigation__item--additional`,
    title: `Stats`
  }
];
const film = {
  title: () => {
    return [
      `The Shawshank Redemption`,
      `The Green Mile`,
      `Forrest Gump`,
      `Schindler's List`,
      `Intouchables`,
      `Léon`,
      `Inception`,
      `The Lion King`,
      `Fight Club`,
      `Иван Васильевич меняет профессию`,
      `La vita è bella`
    ][Math.floor(Math.random() * 11)]},
  image: () => {
    return [
      `./images/posters/accused.jpg`,
      `./images/posters/blackmail.jpg`,
      `./images/posters/blue-blazes.jpg`,
      `./images/posters/fuga-da-new-york.jpg`,
      `./images/posters/moonrise.jpg`,
      `./images/posters/three-friends.jpg`,
    ][Math.floor(Math.random() * 6)];
  },
  description: () => {
    const descArr = [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      `Cras aliquet varius magna, non porta ligula feugiat eget.`,
      `Fusce tristique felis at fermentum pharetra.`,
      `Aliquam id orci ut lectus varius viverra.`,
      `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
      `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
      `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
      `Sed sed nisi sed augue convallis suscipit in sed felis.`,
      `Aliquam erat volutpat.`,
      `Nunc fermentum tortor ac porta dapibus.`,
      `In rutrum ac purus sit amet tempus.`
    ];
    let descStr = ``;
    for (let i = 0; i < randomInteger(1, 3); i++) {
      descStr += descArr[Math.floor(Math.random() * descArr.length)] + ` `;
    }
    return descStr;
  },
  rating: () => `${randomInteger(1, 9)}.${randomInteger(0, 9)}`,
  year: () => randomInteger(1950, 2019),
  duration: () => `1h&nbsp;${randomInteger(1, 59)}m`,
  genre: `Comedy`,
  comments: () => `${randomInteger(0, 19)}&nbsp;comments`,
};
const filmList = [film];

const addFilters = (enterEltment, filtersArr, counter) => {
  if (counter === filtersArr.length) {
    return;
  }
  const link = filtersArr[counter].link;
  const className = filtersArr[counter].className;
  const title = filtersArr[counter].title;
  const count = filtersArr[counter].count;
  enterEltment.insertAdjacentHTML(`beforeend`, makeFilter(link, className, title, count));
  addFilters(enterEltment, filtersArr, ++counter);
};

addFilters(mainNavigation, filters, 0);

const addTask = (enterElement, count) => {
  const iter = (counter) => {
    if (counter === count) {
      return;
    }
    enterElement.insertAdjacentHTML(`beforeend`, makeFilm(filmList[0]));
    iter(++counter);
  };
  iter(0);
};

addTask(filmsListContainer[0], initialNumberOfTasks);
addTask(filmsListContainer[1], initialNumberOfTasksRecomented);
addTask(filmsListContainer[2], initialNumberOfTasksRecomented);

const addRandomTasks = (e) => {
  const target = e.target;
  if (target.classList.contains(`main-navigation__item`)) {
    filmsListContainer[0].innerHTML = ``;
    const countTasks = randomInteger(1, 4);
    addTask(filmsListContainer[0], countTasks);
  }
};

mainNavigation.addEventListener(`click`, addRandomTasks);
