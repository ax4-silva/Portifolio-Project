import { desafios } from "./desafios.js";
import { projetos } from "./projetos.js";

const navigation = document.querySelector("#navigation");
const backToTopButton = document.querySelector("#backToTopButton");
// section references (may be null if section removed)
const about = document.getElementById("about");
const projects = document.getElementById("projects");
const projectsSection = document.querySelector("#projects .wrapper");
const knowledge = document.getElementById("knowledge");
const contact = document.getElementById("contact");



window.addEventListener("load", function begin() {
  // Only call projetos if the projects section exists
  if (projectsSection) {
    try {
      projetos(projectsSection);
    } catch (e) {
      // fail silently if projetos module expects a different structure
      console.warn('projetos() failed:', e);
    }
  }

  const desafioBtn = document.querySelector("#desafio");
  if (desafioBtn) {
    desafioBtn.addEventListener("click", () => {
      if (projectsSection) {
        try {
          desafios(projectsSection);
        } catch (e) {
          console.warn('desafios() failed:', e);
        }
      }

      const backToProjectsBtn = document.querySelector("#backToProjectsBtn");
      if (backToProjectsBtn) {
        backToProjectsBtn.addEventListener("click", begin);
      }
    });
  }

  // Typing effect for subtitle (class="typing") — multi-text cycling
  (function initTyping() {
    const el = document.querySelector('.typing');
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Allow multiple phrases via a data attribute separated by `|`, otherwise use the element text
    const data = el.getAttribute('data-texts');
    const texts = data ? data.split('|').map(s => s.trim()).filter(Boolean) : [el.textContent.trim()];

    // ensure caret styling is present
    el.classList.add('caret');

    if (prefersReduced) {
      // for reduced motion, show first text immediately
      el.textContent = texts[0] || '';
      return;
    }

    el.textContent = '';

    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    function type() {
      if (count === texts.length) {
        count = 0;
      }
      currentText = texts[count];
      letter = currentText.slice(0, ++index);

      el.textContent = letter;

      if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 1500); // pausa entre frases
      } else {
        setTimeout(type, 100); // velocidade da digitação
      }
    }

    type();
  })();
});

window.addEventListener("scroll", onScroll);
onScroll();



function onScroll() {
  showNavOnScroll();
  showBackToTopButtonOnScroll();

  if (about) activateMenuAtCurrentSection(about);
  if (projects) activateMenuAtCurrentSection(projects);
  if (knowledge) activateMenuAtCurrentSection(knowledge);
  if (contact) activateMenuAtCurrentSection(contact);
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);

  menuElement.classList.remove("active");

  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

openMenu();
function openMenu() {
  const openBtns = document.querySelectorAll(".open");
  openBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.add("menu-expanded");
    });
  });
}

closeMenu();
function closeMenu() {
  const closeBtns = document.querySelectorAll(".close");
  closeBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.remove("menu-expanded");
    });
  });
}

ScrollReveal({
  origin: "bottom",
  distance: "50px",
  duration: 1000,
}).reveal(
  `#home, 
  #home img, 
  #about, 
  #about header, 
  #about p,
  #about img,
  #projects,
  #projects header,
  #projects .card,
  #knowledge,
  #knowledg header,
  #knowledg .card,
  #contact,
  #contact header`
);

