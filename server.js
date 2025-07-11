const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const analyzeResume = require("./utils/analyzeResume");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    const jobRole = req.body.jobRole;
    const pdfBuffer = req.file.buffer;

    const data = await pdfParse(pdfBuffer);
    const analysis = await analyzeResume(data.text, jobRole);

    res.json(analysis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Resume analysis failed" });
  }
});

// login or registation ke liye code --->

mongoose.
    connect(process.env.MONGO_URI,{
        dbName:"ResumeAnalyzerData"
    },
).then(()=>console.log("MongoDB Connected..")).catch((err)=>console.log(err));

  const authRoutes = require('./Routers/Auth');
  app.use('/api', authRoutes);

// bas --<

app.listen(process.env.PORT, () => console.log("Server running on http://localhost:3000"));
