// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "d0f9c1b68700451bbf2c916f0724af21";

app.get("/stock", async (req, res) => {
  const { symbol, start, end } = req.query;
  try {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&start_date=${start}&end_date=${end}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    res.json({ symbol, data: response.data });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from Nifty Backend!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
