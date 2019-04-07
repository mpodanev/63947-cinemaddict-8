import getRandomInteger from './utils';
import moment from 'moment';


export default () => {
  return {title: [
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
  ][Math.floor(Math.random() * 11)],
  image: [
    `./images/posters/accused.jpg`,
    `./images/posters/blackmail.jpg`,
    `./images/posters/blue-blazes.jpg`,
    `./images/posters/fuga-da-new-york.jpg`,
    `./images/posters/moonrise.jpg`,
    `./images/posters/three-friends.jpg`
  ][Math.floor(Math.random() * 6)],
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`][Math.floor(Math.random() * 6)],
  rating: `${getRandomInteger(1, 9)}.${getRandomInteger(0, 9)}`,
  year: Date.now() - getRandomInteger(0, 50) * 60 * 60 * 24 * 365 * 1000,
  duration: getRandomInteger(60, 120) * 60 * 1000,
  genre: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`][Math.floor(Math.random() * 5)],
  comments: [
    {
      text: `So long-long story, boring!`,
      author: `Tim Macoveev`,
      emoji: `😴`,
      date: moment()
    }
  ],
  userRating: null,
  isWatchList: getRandomInteger(0, 1),
  isWatched: getRandomInteger(0, 1),
  isFavorite: getRandomInteger(0, 1),
  };
};
