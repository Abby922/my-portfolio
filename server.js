
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const MONGO_URI = process.env.MONGO_URI;



const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
// , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }
.then(() => console.log("✅ 已連接 MongoDB"))
.catch(err => console.error("❌ MongoDB 連線失敗：", err));

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", ProjectSchema);

// 取得所有作品
app.get("/api/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// 新增作品
app.post("/api/projects", async (req, res) => {
  const { title, description, image } = req.body;
  const newProject = new Project({ title, description, image });
  await newProject.save();
  res.json(newProject);
});

const path = require("path");

// 提供靜態 HTML 檔案
app.use(express.static(path.join(__dirname,"..","frontend", "public"))); // 確保你的 HTML 放在 `public/` 資料夾

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"..","frontend", "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 伺服器運行在 http://localhost:${PORT}`);
});

const portfolioRoutes = require("./routes/portfolio");
app.use("/portfolio", portfolioRoutes);