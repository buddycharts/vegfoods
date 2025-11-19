const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve vegfood images folder
app.use("/vegfood", express.static(path.join(__dirname, "vegfood")));

// API route for vegfood.json
app.get("/vegfood", (req, res) => {
  fs.readFile("vegfood.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read vegfood.json" });
    }
    res.json(JSON.parse(data));
  });
});

// PORT for Render deployment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Veg Food API running on port ${PORT}`);
});
