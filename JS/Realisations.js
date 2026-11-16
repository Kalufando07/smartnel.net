/* SMARTNEL — filtres de la page Réalisations (../JS/realisations.js) */
(function () {
  'use strict';

  var buttons = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.project-card');
  var empty = document.querySelector('.projects-empty');

  function applyFilter(filter) {
    var shown = 0;
    cards.forEach(function (card) {
      var match = filter === 'all' || card.getAttribute('data-category') === filter;
      card.hidden = !match;
      if (match) {
        shown++;
        card.classList.add('visible');
      }
    });
    if (empty) empty.hidden = shown !== 0;
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      applyFilter(btn.getAttribute('data-filter'));
    });
  });
})();

