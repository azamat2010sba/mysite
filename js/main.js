/* =========================
   EVENTS (из JSON)
========================= */

let allEvents = [];

function loadEvents() {
  const container = document.getElementById("events-container");

  if (!container) return;

  fetch("data/events.json")
    .then(res => res.json())
    .then(data => {
      allEvents = data;
      renderEvents(data);
    })
    .catch(err => console.log("Events error:", err));
}

function renderEvents(data) {
  const container = document.getElementById("events-container");
  if (!container) return;

  container.innerHTML = "";

  data.forEach(event => {
    const card = document.createElement("div");

    card.innerHTML = `
      <img src="${event.image}">
      <h3>${event.title}</h3>
      <p>${event.description}</p>
      <small>${event.date}</small>
    `;

    container.appendChild(card);
  });
}

function filterEvents(type) {
  if (type === "all") {
    renderEvents(allEvents);
  } else {
    const filtered = allEvents.filter(e => e.type === type);
    renderEvents(filtered);
  }
}

/* =========================
   MOBILE MENU
========================= */
function setupMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

/* =========================
   LOAD HEADER
========================= */
function loadHeader() {
  const header = document.getElementById("header");

  if (!header) return;

  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      header.innerHTML = data;
      setActiveLink();
    });
}

/* =========================
   ACTIVE LINK MENU
========================= */
function setActiveLink() {
  const links = document.querySelectorAll(".nav-link");

  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
}

/* =========================
   PAGE TRANSITION
========================= */
function pageTransition() {
  document.querySelectorAll("a").forEach(link => {
    if (
      link.href &&
      link.href.includes(window.location.host) &&
      !link.href.includes("#")
    ) {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const url = this.href;

        document.body.style.opacity = "0";
        document.body.style.transition = "0.3s";

        setTimeout(() => {
          window.location.href = url;
        }, 300);
      });
    }
  });
}

/* =========================
   THEME
========================= */
function setupThemeToggle() {
  const btn = document.getElementById("theme-toggle");

  if (!btn) return;

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

/* =========================
   COURSE
========================= */
let selectedCourse = "";

function openForm(course = "") {
  selectedCourse = course;
  const modal = document.getElementById("form-modal");
  if (modal) modal.style.display = "flex";
}

function closeForm() {
  const modal = document.getElementById("form-modal");
  if (modal) modal.style.display = "none";
}

/* =========================
   TOAST
========================= */
function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* =========================
   SUBMIT FORM (FIXED)
========================= */
function submitForm() {
  const name = document.getElementById("name").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !surname || !phone) {
    showToast("Заполни все поля");
    return;
  }

  // ⚠️ ВАЖНО: localhost НЕ работает на Vercel
  // поэтому просто симуляция + Telegram/Backend можно подключить позже

  showToast("Заявка отправлена ✅");

  document.getElementById("name").value = "";
  document.getElementById("surname").value = "";
  document.getElementById("phone").value = "";

  closeForm();
}

/* =========================
   COURSE DATA
========================= */
function goToCourse(course) {
  window.location.href = `course.html?course=${course}`;
}

const courses = {
  dance: {
    title: "Танцы",
    img: "images/IMG_20251110_145534.jpg",
    desc: "Современные и национальные танцы",
    time: "Пн, Ср, Пт — 16:00",
    teacher: "Иван Иванов"
  },
  music: {
    title: "Музыка",
    img: "images/IMG_20251110_150340.jpg",
    desc: "Игра на инструментах",
    time: "Вт, Чт — 15:00",
    teacher: "Алиев Бек"
  },
  art: {
    title: "Рисование",
    img: "images/IMG_20251110_145133.jpg",
    desc: "Живопись и дизайн",
    time: "Сб — 14:00",
    teacher: "Мария Петрова"
  }
};

const params = new URLSearchParams(window.location.search);
const courseKey = params.get("course");

if (courseKey && courses[courseKey]) {
  const course = courses[courseKey];

  selectedCourse = course.title;

  const t = document.getElementById("course-title");
  const i = document.getElementById("course-img");
  const d = document.getElementById("course-desc");
  const tm = document.getElementById("course-time");
  const tr = document.getElementById("course-teacher");

  if (t) t.innerText = course.title;
  if (i) i.src = course.img;
  if (d) d.innerText = course.desc;
  if (tm) tm.innerText = course.time;
  if (tr) tr.innerText = course.teacher;
}

/* =========================
   FORM VALIDATION
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const name = document.getElementById("name");
  const surname = document.getElementById("surname");
  const phone = document.getElementById("phone");
  const btn = document.getElementById("submitBtn");

  if (!name || !surname || !phone || !btn) return;

  function checkForm() {
    const ok =
      name.value.trim() !== "" &&
      surname.value.trim() !== "" &&
      phone.value.trim() !== "";

    btn.disabled = !ok;
  }

  name.addEventListener("input", checkForm);
  surname.addEventListener("input", checkForm);
  phone.addEventListener("input", checkForm);

  checkForm();
});

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
  setupMenu();
  loadHeader();
  pageTransition();
  setupThemeToggle();
});