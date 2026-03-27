const express = require("express");
const cors = require('cors');
const { exec } = require("child_process");

const app = express();

app.use(cors());

app.post("/generate-docs", (req, res) => {
  exec("node scripts/generateDocs.js", (err, stdout, stderr) => {
    if (err) {
      res.status(500).send(stderr);
      return;
    }
    res.send(stdout);
  });
});

app.listen(4000, () => {
  console.log("Docs API running");
});