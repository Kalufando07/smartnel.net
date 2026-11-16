/* SMARTNEL — script commun à toutes les pages (../JS/main.js) */
(function () {
  'use strict';

  var header = document.querySelector('header');
  var burger = document.querySelector('.hamburger');
  var menu = document.querySelector('.nav-menu');

  /* En-tête : fond plus marqué dès que l'on défile */
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Menu mobile */
  function setMenu(open) {
    if (!menu || !burger) return;
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    var icon = burger.querySelector('i');
    if (icon) icon.className = open ? 'fas fa-xmark' : 'fas fa-bars';
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      setMenu(!menu.classList.contains('open'));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 991) setMenu(false);
    });
  }

  /* Apparition des éléments au défilement */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* Compteurs animés (<h3 class="counter" data-target="100">100</h3>) */
  var counters = document.querySelectorAll('.counter');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-target') || el.textContent, 10);
    if (isNaN(target) || reduce) { el.textContent = target; return; }
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          countObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObs.observe(el); });
  }
})();