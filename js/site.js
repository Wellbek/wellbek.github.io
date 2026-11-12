/* Theme toggle (dusk <-> paper).
   The initial theme is set by a tiny inline script in <head> to avoid a flash;
   this file only wires the button and remembers the choice in localStorage. */
(function () {
  'use strict';
  var KEY = 'theme';
  var COLORS = { dusk: '#12141a', paper: '#f0eeea' };
  var root = document.documentElement;
  var btn = document.querySelector('[data-theme-toggle]');
  var meta = document.querySelector('meta[name="theme-color"]');

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (meta) meta.setAttribute('content', COLORS[theme]);
    if (btn) {
      var next = theme === 'dusk' ? 'paper' : 'dusk';
      btn.textContent = next;
      btn.setAttribute('aria-label', 'Switch to the ' + next + ' theme');
    }
  }

  apply(root.getAttribute('data-theme') === 'paper' ? 'paper' : 'dusk');

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dusk' ? 'paper' : 'dusk';
      try { localStorage.setItem(KEY, next); } catch (e) { /* storage blocked: theme just won't persist */ }
      apply(next);
    });
  }
})();
