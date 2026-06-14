(function () {
  "use strict";

  var WEEKS = [
    { id: "week-1", label: "Week 1", active: true },
    { id: "week-2", label: "Week 2", active: true },
    { id: "week-3", label: "Week 3", active: false },
    { id: "week-4", label: "Week 4", active: false },
  ];

  var CLASSES = {
    "week-1": [
      { id: "class-1", label: "Class 1 — Foundations", shortLabel: "Class 1", href: "class-1.html" },
      { id: "class-2", label: "Class 2 — Groq API", shortLabel: "Class 2", href: "class-2.html" },
      { id: "class-3", label: "Class 3 — Lab & Project", shortLabel: "Class 3", href: "class-3.html" },
    ],
    "week-2": [
      { id: "class-1", label: "Class 1 — Prompt Engineering", shortLabel: "Class 1", href: "class-1.html" },
      { id: "class-2", label: "Class 2 — LangChain & LangGraph", shortLabel: "Class 2", href: "class-2.html" },
      { id: "class-3", label: "Class 3 — Data Collection Lab", shortLabel: "Class 3", href: "class-3.html" },
    ],
  };

  function getNavContext() {
    var path = window.location.pathname;
    if (path.includes("/week-1/") || path.endsWith("/week-1")) return "week-1";
    if (path.includes("/week-2/") || path.endsWith("/week-2")) return "week-2";
    return "root";
  }

  function getCurrentWeek() {
    var ctx = getNavContext();
    return ctx === "root" ? null : ctx;
  }

  function linkHome() {
    var week = getCurrentWeek();
    return week ? "../index.html" : "index.html";
  }

  function linkWeek(weekId) {
    var current = getCurrentWeek();
    if (current === weekId) return "index.html";
    if (current) return "../" + weekId + "/index.html";
    return weekId + "/index.html";
  }

  function linkClass(classHref) {
    var current = getCurrentWeek();
    if (current) return classHref;
    var week = getNavContext() === "root" ? "week-1" : getNavContext();
    return week + "/" + classHref;
  }

  function getWeekClasses(weekId) {
    return CLASSES[weekId] || [];
  }

  function renderSidebar(page) {
    var shell = document.querySelector(".site-shell");
    if (!shell) return;

    var currentWeek = getCurrentWeek();
    var weekSubNav = "";

    if (currentWeek && (page === currentWeek || page.startsWith("class-"))) {
      weekSubNav =
        '<div class="site-nav__sub">' +
        getWeekClasses(currentWeek)
          .map(function (c) {
            var active = page === c.id ? " is-active" : "";
            return (
              '<a class="site-nav__link' +
              active +
              '" href="' +
              linkClass(c.href) +
              '">' +
              c.label +
              "</a>"
            );
          })
          .join("") +
        "</div>";
    }

    var weekLinks = WEEKS.map(function (w) {
      var href = w.active ? linkWeek(w.id) : "#";
      var classes = "site-nav__link";
      if (page === w.id || (currentWeek === w.id && page.startsWith("class-")))
        classes += " is-active";
      if (!w.active) classes += " is-disabled";
      return (
        '<a class="' +
        classes +
        '" href="' +
        (w.active ? href : "#") +
        '">' +
        w.label +
        (w.active ? "" : " (soon)") +
        "</a>"
      );
    }).join("");

    var sidebar = document.createElement("aside");
    sidebar.className = "site-sidebar";
    sidebar.innerHTML =
      '<div class="site-brand">' +
      '<a href="' +
      linkHome() +
      '" class="site-brand__logo">AI Chatbots</a>' +
      '<span class="site-brand__subtitle">LLMs &amp; RAG Bootcamp</span>' +
      "</div>" +
      '<nav class="site-nav" aria-label="Course navigation">' +
      '<span class="site-nav__label">Course</span>' +
      '<a class="site-nav__link' +
      (page === "home" ? " is-active" : "") +
      '" href="' +
      linkHome() +
      '">Home</a>' +
      '<span class="site-nav__label">Weeks</span>' +
      weekLinks +
      weekSubNav +
      "</nav>";

    shell.insertBefore(sidebar, shell.firstChild);
  }

  function renderDeckTopbar(page) {
    var currentWeek = getCurrentWeek();
    if (!currentWeek) return;

    var topbar = document.createElement("nav");
    topbar.className = "deck-topbar";
    topbar.setAttribute("aria-label", "Slide deck navigation");

    var weekLabel = currentWeek === "week-1" ? "Week 1" : "Week 2";
    var crumbs = [
      { label: "Home", href: linkHome(), active: false },
      { label: weekLabel, href: linkWeek(currentWeek), active: page === currentWeek },
    ];

    getWeekClasses(currentWeek).forEach(function (c) {
      crumbs.push({
        label: c.shortLabel,
        href: linkClass(c.href),
        active: page === c.id,
        fullLabel: c.label,
      });
    });

    var navLinks = crumbs
      .map(function (c, i) {
        var sep = i > 0 ? '<span class="deck-topbar__sep">/</span>' : "";
        return (
          sep +
          '<a href="' +
          c.href +
          '"' +
          (c.active ? ' class="is-active"' : "") +
          ' title="' +
          (c.fullLabel || c.label) +
          '">' +
          c.label +
          "</a>"
        );
      })
      .join("");

    topbar.innerHTML =
      '<a href="' +
      linkHome() +
      '" class="deck-topbar__brand">AI Chatbots</a>' +
      '<div class="deck-topbar__nav">' +
      navLinks +
      "</div>";

    document.body.insertBefore(topbar, document.body.firstChild);
    document.body.classList.add("has-deck-topbar");
  }

  function injectDeckNavHint() {
    if (!window.matchMedia("(max-width: 768px)").matches) return;
    if (document.querySelector(".deck-nav-hint")) return;

    var hint = document.createElement("div");
    hint.className = "deck-nav-hint";
    hint.setAttribute("aria-hidden", "true");
    hint.innerHTML =
      "Swipe or use arrows below · <kbd>&larr;</kbd> <kbd>&rarr;</kbd>";
    document.body.appendChild(hint);

    function hideHint() {
      hint.classList.add("is-hidden");
      if (typeof Reveal !== "undefined") {
        Reveal.off("slidechanged", hideHint);
      }
    }

    if (typeof Reveal !== "undefined") {
      Reveal.on("slidechanged", hideHint);
    }
  }

  function initReveal() {
    if (typeof Reveal === "undefined") return;
    var plugins = [];
    if (typeof RevealHighlight !== "undefined") plugins.push(RevealHighlight);
    if (typeof RevealNotes !== "undefined") plugins.push(RevealNotes);
    var result = Reveal.initialize({
      hash: true,
      slideNumber: "c/t",
      showSlideNumber: "all",
      progress: true,
      controls: true,
      controlsLayout: "bottom-right",
      controlsBackArrows: "visible",
      controlsTutorial: true,
      center: false,
      transition: "slide",
      width: 1100,
      height: 700,
      margin: 0.04,
      plugins: plugins,
    });

    if (result && typeof result.then === "function") {
      result.then(injectDeckNavHint);
    } else {
      injectDeckNavHint();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var page = document.body.getAttribute("data-page") || "home";

    if (document.body.classList.contains("deck-page")) {
      renderDeckTopbar(page);
      initReveal();
    } else {
      renderSidebar(page);
    }
  });
})();
