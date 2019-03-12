import createElement from './create-element';

export default class Film {
  constructor(data) {
    this._title = data.title;
    this._image = data.image;
    this._description = data.description;
    this._rating = data.rating;
    this._year = data.year;
    this._duration = data.duration;
    this._genre = data.genre;
    this._comments = data.comments;

    this._element = null;

    this.state = {};

    this._onComment = null;
  }

  _onCommentButtonClick() {
    if (typeof this._onComment === `function`) {
      this._onComment();
    }
  }

  get element() {
    return this._element;
  }

  set onComment(fn) {
    this._onComment = fn;
  }

  get template() {
    return `<article class="film-card">
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this._year}</span>
      <span class="film-card__duration">${this._duration}</span>
      <span class="film-card__genre">${this._genre}</span>
    </p>
    <img src="${this._image}" alt="" class="film-card__poster">
    <p class="film-card__description">${this._description}</p>
    <button class="film-card__comments">${this._comments}</button>

    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">
        <!--Add to watchlist--> WL</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">
        <!--Mark as watched-->WTCHD</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">
        <!--Mark as favorite-->FAV</button>
    </form>
    </article>`;
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onCommentButtonClick.bind(this));
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onCommentButtonClick.bind(this));
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

}
