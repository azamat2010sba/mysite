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

      <a href="event.html?id=${event.id}">
        <button>Подробнее</button>
      </a>
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
   SUBMIT FORM
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
    teacher: ""
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
const translations = {
  ru: {
    title: "КУЛЬТУРНЫЙ ЦЕНТР №54 «УЗБЕК-КАЗАХ»",
    index: "Главная",
    events: "События",
    about: "О нас",
    project: "Кружки",
    contact: "Контакты",
    more: "Подробнее",

    hero_text: "Официальный информационный портал района",
    about_title: "О районе",
    about_text1: "Официальный портал Хокимията района предоставляет информацию о деятельности администрации, событиях и развитии региона.",
    about_text2: "Здесь публикуются новости, мероприятия, проекты и важные объявления для жителей.",

    footer_desc: "Официальный портал",
    copyright: "© 2026 Все права защищены",

    location: "📍 Юкоричирчикский район",
    map: "📍 Открыть на карте",
    phone: "📞 +998 99 615 04 35",
    email: "✉ madaniyat54markazi@gmail.com"
  },

  uz: {
    title: "54-SONLI \"OʻZBEK-QOZOQ\" MADANIYAT MARKAZI",
    index: "Bosh sahifa",
    events: "Tadbirlar",
    about: "Biz haqimizda",
    project: "To'garaklar",
    contact: "Aloqa",
    more: "Batafsil",
  
    hero_text: "Tuman bo‘yicha rasmiy axborot portali",
    about_title: "Tuman haqida",
    about_text1: "Rasmiy portal ma’muriyat faoliyati, yangiliklar va rivojlanish haqida ma’lumot beradi.",
    about_text2: "Bu yerda yangiliklar, tadbirlar va loyihalar e’lon qilinadi.",
  
    // 🔥 ДОБАВИЛ ДЛЯ ABOUT.HTML
    about_page_title: "Biz haqimizda",
    about_p1: "Toshkent viloyati madaniyat boshqarmasi, Yuqori Chirchiq tumani madaniyat bo‘limiga qarashli 54-sonli \"O‘zbek-Qozoq\" madaniyat markazi ikki xalq do‘stligi, madaniyati va an’analarini rivojlantiradi.",
    about_p2: "Markaz tadbirlar, to‘garaklar va ko‘rgazmalar orqali madaniy aloqalarni mustahkamlaydi.",
    about_p3: "Markazda 225 o‘rinli tomosha zali mavjud.",
    about_p4: "12 nafar xodim va 2 ta to‘garak faoliyat yuritadi.",
    // 🔥 EVENTS
events_page_title: "Tadbirlar",
events_title: "📅 Tuman tadbirlari",

event1_title: "14-yanvar Vatan himoyachilari kuni",
event1_desc: "Yuqori Chirchiq tumanida Vatan himoyachilari kuni tantanali nishonlandi",

event2_title: "Ma’naviyat karvoni",
event2_desc: "Yuqori Chirchiq tumanida rivojlanish sari qadamlar",

event3_title: "Alisher Navoiy tavalludining 585 yilligi",
event3_desc: "Tumanimizda Navoiyga bag‘ishlangan tadbir o‘tkazildi",

event4_title: "Navro‘z bayrami",
event4_desc: "Tumanimizda Navro‘z keng nishonlandi",
    nav: "Navigatsiya",
    socials: "Ijtimoiy tarmoqlar",
  
    footer_desc: "Rasmiy portal",
    copyright: "© 2026 Barcha huquqlar himoyalangan",
  
    location: "📍 Yuqori Chirchiq tumani",
    map: "📍 Xarita ochish",
    phone: "📞 +998 99 615 04 35",
    email: "✉ madaniyat54markazi@gmail.com"
  },
  
  kz: {
    title: "54-NOMERLI «ÖZBEK-QAZAQ» MÄDENIET ORTALYĞY",
    index: "Басты бет",
    events: "Іс-шаралар",
    about: "Біз туралы",
    project: "Үйірмелер",
    contact: "Байланыс",
    more: "Толығырақ",
  
    hero_text: "Ресми ақпараттық портал",
    about_title: "Аудан туралы",
    about_text1: "Әкімдік қызметі мен жаңалықтар туралы ақпарат беріледі.",
    about_text2: "Мұнда жаңалықтар, іс-шаралар және жобалар жарияланады.",
  
    // 🔥 ДОБАВИЛ ДЛЯ ABOUT.HTML
    about_page_title: "Біз туралы",
    about_p1: "Ташкент облысы мәдениет басқармасы, Юқори Чирчик ауданы мәдениет бөліміне қарасты 54-нөмірлі «Өзбек-Қазақ» мәдениет орталығы екі халықтың достығы мен мәдениетін дамытады.",
    about_p2: "Орталық іс-шаралар мен үйірмелер арқылы мәдени байланысты нығайтады.",
    about_p3: "Орталықта 225 орындық зал бар.",
    about_p4: "12 қызметкер және 2 үйірме жұмыс істейді.",
    // 🔥 EVENTS
events_page_title: "Іс-шаралар",
events_title: "📅 Аудан іс-шаралары",

event1_title: "14 қаңтар Отан қорғаушылар күні",
event1_desc: "Юқори Чирчик ауданында Отан қорғаушылар күні атап өтілді",

event2_title: "Руханият керуені",
event2_desc: "Ауданда даму жолындағы қадамдар",

event3_title: "Әлішер Науаи 585 жылдығы",
event3_desc: "Ауданда Науаиға арналған іс-шара өтті",

event4_title: "Наурыз мерекесі",
event4_desc: "Ауданда Наурыз кең көлемде атап өтілді",
    nav: "Навигация",
    socials: "Әлеуметтік желілер",
  
    footer_desc: "Ресми портал",
    copyright: "© 2026 Барлық құқықтар қорғалған",
  
    location: "📍 Юқори Чирчик ауданы",
    map: "📍 Карта ашу",
    phone: "📞 +998 99 615 04 35",
    email: "✉ madaniyat54markazi@gmail.com"
  }
};

function setLang(lang) {
  localStorage.setItem("lang", lang);
  applyLang(lang);
}
function applyLang(lang) {
  const t = translations[lang];
  if (!t) return;

  // перевод всех data-lang элементов
  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    if (t[key]) {
      el.innerText = t[key];
    }
  });

  // сохраняем язык
  localStorage.setItem("lang", lang);
}

function setLang(lang) {
  applyLang(lang);
}

function loadLang() {
  const lang = localStorage.getItem("lang") || "ru";
  applyLang(lang);
}

loadLang();
/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
  setupMenu();
  loadHeader();
  setActiveLink();
});