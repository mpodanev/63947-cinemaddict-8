import Component from './component';

export default class Filter extends Component {
  constructor({title, link, className, count}) {
    super();
    this._title = title;
    this._link = link;
    this._className = className;
    this._count = count;

    this._onFilter = null;

    this._onFilterClick = this._onFilterClick.bind(this);
  }

  _onFilterClick(evt) {
    evt.preventDefault();
    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `<a href="${this._link}" class="${this._className}"> ${this._title}
              ${typeof this._count === `number` ? `<span class="main-navigation__item-count">${this._count}</span>` : ``}
            </a>`;
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }
}
