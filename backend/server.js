const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// 🔥 СНАЧАЛА СОЗДАЁМ app
const app = express();

app.use(cors());
app.use(express.json());

// 🔥 STATIC (после app)
app.use(express.static(path.join(__dirname, "../")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// ================= FILE =================
const FILE = path.join(__dirname, "data.json");

function loadData() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

function saveData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// ================= CREATE =================
app.post("/api/apply", (req, res) => {
  const data = loadData();

  const newApp = {
    id: Date.now(),
    name: req.body.name,
    surname: req.body.surname,
    phone: req.body.phone,
    course: req.body.course,
    status: "pending",
    time: new Date()
  };

  data.push(newApp);
  saveData(data);

  res.json({ ok: true });
});

// ================= GET =================
app.get("/api/applications", (req, res) => {
  res.json(loadData());
});

// ================= STATUS =================
app.put("/api/applications/:id/status", (req, res) => {
  let data = loadData();

  data = data.map(app => {
    if (app.id === Number(req.params.id)) {
      return { ...app, status: req.body.status };
    }
    return app;
  });

  saveData(data);

  res.json({ ok: true });
});

// ================= DELETE =================
app.delete("/api/applications/:id", (req, res) => {
  let data = loadData();

  data = data.filter(app => app.id !== Number(req.params.id));

  saveData(data);

  res.json({ ok: true });
});

// ================= START =================
app.listen(3000, () => {
  console.log("🚀 Server running: http://localhost:3000");
});