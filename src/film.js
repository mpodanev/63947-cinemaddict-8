import Component from './component';
import moment from 'moment';
import createElement from './create-element';

export default class Film extends Component {
  constructor({title, image, description, rating, year, duration, genre, comments, isWatchList, isWatched, isFavorite}) {
    super();
    this._title = title;
    this._image = image;
    this._description = description;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genre = genre;
    this._commentsCount = comments.length;
    this._isWatchList = isWatchList;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;

    this._onComment = null;
    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;
    this._onFavorite = null;

    this._onAddToWatchListButtonClick = this._onAddToWatchListButtonClick.bind(this);
    this._onMarkAsWatchedButtonClick = this._onMarkAsWatchedButtonClick.bind(this);
    this._onFavoriteButtonClick = this._onFavoriteButtonClick.bind(this);
    this._onCommentButtonClick = this._onCommentButtonClick.bind(this);
  }

  _onCommentButtonClick() {
    if (typeof this._onComment === `function`) {
      this._onComment();
    }
  }

  _onAddToWatchListButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onAddToWatchList === `function`) {
      this._onAddToWatchList();
    }
  }

  _onMarkAsWatchedButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched();
    }
  }

  _onFavoriteButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onFavorite === `function`) {
      this._onFavorite();
    }
  }

  _updateComponent() {
    this._element.innerHTML = createElement(this.template).innerHTML;
  }

  set onComment(fn) {
    this._onComment = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }
  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }
  set onFavorite(fn) {
    this._onFavorite = fn;
  }

  _getControlsTemplate() {
    return `<button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isWatchList ? `film-card__controls-item--active` : ``}">
              <!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isWatched ? `film-card__controls-item--active` : ``}">
              <!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite ? `film-card__controls-item--active` : ``}">
              <!--Mark as favorite-->FAV</button>`;
  }

  get template() {
    return `<article class="film-card">
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${moment(this._year).format(`YYYY`)}</span>
      <span class="film-card__duration">${moment.duration(this._duration).hours()}h ${moment.duration(this._duration - moment.duration(this._duration).hours()).minutes()}m</span>
      <span class="film-card__genre">${this._genre}</span>
    </p>
    <img src="${this._image}" alt="" class="film-card__poster">
    <p class="film-card__description">${this._description}</p>
    <button class="film-card__comments">${this._commentsCount} comments</button>
    <form class="film-card__controls">
      ${this._getControlsTemplate()}
    </form>
    </article>`;
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onCommentButtonClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onAddToWatchListButtonClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onMarkAsWatchedButtonClick);
    this._element.querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onFavoriteButtonClick);
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onCommentButtonClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).removeEventListener(`click`, this._onAddToWatchListButtonClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`).removeEventListener(`click`, this._onMarkAsWatchedButtonClick);
    this._element.querySelector(`.film-card__controls-item--favorite`).removeEventListener(`click`, this._onFavoriteButtonClick);
  }

  update({comments, isWatchList, isWatched, isFavorite}) {
    this._commentsCount = comments.length;
    this._isWatchList = isWatchList;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
    this._updateComponent();
  }

}
