/* =========================
   Firebase INIT
========================= */

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCg27w1e6tjm3qnNXL2jP5CrB5UBGHLR04",
  authDomain: "kruzzhki.firebaseapp.com",
  projectId: "kruzzhki",
  storageBucket: "kruzzhki.firebasestorage.app",
  messagingSenderId: "390218537245",
  appId: "1:390218537245:web:9f836236801c76234ca9f4"
};

// ⚠️ IMPORTANT: compat version
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* =========================
   GLOBAL
========================= */

let selectedCourse = "";
let allEvents = [];

/* =========================
   EVENTS
========================= */

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
   MENU
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
   HEADER
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

function setActiveLink() {
  const links = document.querySelectorAll(".nav-link");

  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
}

/* =========================
   COURSE
========================= */

function openForm(course = "") {
  selectedCourse = course;
  const modal = document.getElementById("form-modal");
  if (modal) modal.style.display = "flex";
}

function closeForm() {
  const modal = document.getElementById("form-modal");
  if (modal) modal.style.display = "none";
}

function goToCourse(course) {
  window.location.href = `course.html?course=${course}`;
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
   SUBMIT FORM (FIREBASE FIX)
========================= */
function submitForm() {
  const name = document.getElementById("name").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !surname || !phone) {
    showToast("Заполни все поля");
    return;
  }

  const token = "8785923759:AAG-0yFVORAC4faEet6BXSJK4ID81ej_o2Q";
  const chat_id = "5292377784";

  const text =
`📥 Новая заявка
👤 Имя: ${name}
👤 Фамилия: ${surname}
📞 Телефон: ${phone}
📚 Кружок: ${selectedCourse}`;

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chat_id,
      text: text
    })
  })
  .then(() => {
    showToast("Заявка отправлена ✅");

    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("phone").value = "";

    closeForm();
  })
  .catch(() => {
    showToast("Ошибка отправки ❌");
  });
}

/* =========================
   COURSE DATA
========================= */

const courses = {
  dance: {
    title: "Танцы",
    img: "images/IMG_20251110_145534.jpg",
    desc: "Современные и национальные танцы",
    time: "",
    teacher: ""
  },
  music: {
    title: "Музыка",
    img: "images/IMG_20251110_150340.jpg",
    desc: "",
    time: "",
    teacher: ""
  },
  art: {
    title: "Рисование",
    img: "images/IMG_20251110_145133.jpg",
    desc: "Живопись и дизайн",
    time: "",
    teacher: ".."
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
  setActiveLink();
});