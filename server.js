const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
