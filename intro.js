(function () {
  var PAGES = [
    { img: 'comic/page_01.webp' },
    { img: 'comic/page_02.webp' },
    { img: 'comic/page_03.webp' },
    { img: 'comic/page_04.webp' },
    { img: 'comic/page_05.webp' },
    { img: 'comic/page_06.webp' },
    { img: 'comic/page_07.webp' },
    { img: 'comic/page_08.webp' },
    { img: 'comic/page_09.webp' },
    { img: 'comic/page_10.webp' },
    { img: 'comic/page_11.webp' },
    { img: 'comic/page_12.webp' },
    { img: 'comic/page_13.webp' },
    { img: 'comic/page_14.webp' },
    { img: 'comic/page_15.webp' },
    { img: 'comic/page_16.webp' },
    { img: 'comic/page_17.webp' }
  ];

  var TOTAL = PAGES.length;
  var currentPage = -1;
  var transitioning = false;
  var comicStarted = false;
  var selectedLang = null;

  var intro = document.getElementById('intro');
  var splash = document.getElementById('splash');
  var viewer = document.getElementById('comic-viewer');
  var progressFill = document.getElementById('comic-progress-fill');
  var pageCounter = document.getElementById('page-counter');
  var clickHint = document.getElementById('click-hint');
  var gameRoot = document.getElementById('root');

  // Preload images
  function preloadImages() {
    PAGES.forEach(function (p) {
      var img = new Image();
      img.src = p.img;
    });
  }

  // Language selection
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectedLang = btn.dataset.lang;
      startComic();
    });
  });

  function startComic() {
    splash.classList.add('hidden');
    setTimeout(function () {
      viewer.classList.add('active');
      comicStarted = true;
      showPage(0);
    }, 600);
  }

  function showPage(index) {
    if (index >= TOTAL) {
      endIntro();
      return;
    }

    transitioning = true;
    var prevEl = viewer.querySelector('.comic-page.active');

    // Create new page element
    var pageEl = document.createElement('div');
    pageEl.className = 'comic-page';

    var img = document.createElement('img');
    img.src = PAGES[index].img;
    img.alt = 'Page ' + (index + 1);
    img.draggable = false;
    pageEl.appendChild(img);

    viewer.appendChild(pageEl);

    // Update progress
    progressFill.style.width = ((index + 1) / TOTAL * 100) + '%';
    pageCounter.textContent = (index + 1) + ' / ' + TOTAL;

    // Fade out previous, fade in new
    if (prevEl) {
      prevEl.classList.remove('active');
      prevEl.classList.add('exiting');
    }

    // Small delay for DOM paint
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        pageEl.classList.add('active');
        currentPage = index;

        // Show hint on first page
        if (index === 0) {
          clickHint.style.display = '';
        }
        if (index > 2) {
          clickHint.style.display = 'none';
        }

        // Clean up old pages after transition
        setTimeout(function () {
          var old = viewer.querySelectorAll('.comic-page.exiting');
          old.forEach(function (el) { el.remove(); });
          transitioning = false;
        }, 500);
      });
    });
  }

  function nextPage() {
    if (transitioning) return;
    showPage(currentPage + 1);
  }

  function endIntro() {
    intro.classList.add('fade-out');
    setTimeout(function () {
      intro.style.display = 'none';
      gameRoot.style.display = '';
    }, 1000);
  }

  // Click / tap to advance
  viewer.addEventListener('click', function (e) {
    if (e.target.closest('.skip-intro-btn')) return;
    nextPage();
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!comicStarted) return;
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      nextPage();
    }
    if (e.key === 'Escape') {
      endIntro();
    }
  });

  // Skip button
  var skipBtn = document.getElementById('skip-intro-btn');
  if (skipBtn) {
    skipBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      endIntro();
    });
  }

  // Start preloading on load
  preloadImages();
})();
