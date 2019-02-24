export default (link, className, title, count = ``) => `<a
  href="${link}"
  class="${className}">
  ${title}
  ${count ? ` <span
    class="main-navigation__item-count">
    ${count}
  </span>` : ``}
</a>`;
