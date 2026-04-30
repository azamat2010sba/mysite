// ================= ADMIN LOAD =================
// 🔥 ЗАГРУЗКА ЗАЯВОК С СЕРВЕРА
function loadApps() {
  fetch("http://localhost:3000/api/applications")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("list");
      list.innerHTML = "";

      if (!data.length) {
        list.innerHTML = "<p>Заявок нет</p>";
        return;
      }

      data.forEach(app => {
        const div = document.createElement("div");

        // 🎨 STATUS COLOR
        let color = "#1e293b";
        if (app.status === "accepted") color = "#14532d";
        if (app.status === "rejected") color = "#7f1d1d";

        div.style.background = color;
        div.style.padding = "15px";
        div.style.marginBottom = "10px";
        div.style.borderRadius = "10px";
        div.style.color = "white";

        div.innerHTML = `
          <b>${app.name} ${app.surname}</b><br>
          📞 ${app.phone}<br>
          🎓 ${app.course}<br>
          ⏰ ${new Date(app.time).toLocaleString()}<br>
          📌 Status: ${app.status}<br><br>

          <!-- 🔥 ACTION BUTTONS -->
          <button onclick="updateStatus(${app.id}, 'accepted')">✅ Принять</button>
          <button onclick="updateStatus(${app.id}, 'rejected')">❌ Отклонить</button>
          <button onclick="deleteApp(${app.id})">🗑 Удалить</button>
        `;

        list.appendChild(div);
      });
    })
    .catch(err => console.log("LOAD ERROR:", err));
}


// ================= UPDATE STATUS =================
// 🔥 ДОБАВЛЕНО: обновление статуса заявки
function updateStatus(id, status) {
  fetch(`http://localhost:3000/api/applications/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  })
  .then(() => loadApps())
  .catch(err => console.log("STATUS ERROR:", err));
}


// ================= DELETE =================
// 🔥 ДОБАВЛЕНО: удаление заявки
function deleteApp(id) {
  fetch(`http://localhost:3000/api/applications/${id}`, {
    method: "DELETE"
  })
  .then(() => loadApps())
  .catch(err => console.log("DELETE ERROR:", err));
}


// ================= CLEAR ALL =================
// 🔥 ДОБАВЛЕНО: очистка всех заявок
function clearApps() {
  fetch("http://localhost:3000/api/applications", {
    method: "DELETE"
  })
  .then(() => loadApps())
  .catch(err => console.log("CLEAR ERROR:", err));
}

window.updateStatus = updateStatus;
window.deleteApp = deleteApp;
window.loadApps = loadApps;
// ================= INIT =================
// 🚀 запуск при открытии страницы
loadApps();