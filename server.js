// 📦 Backend server using Node.js + Express + Axios to fetch NSE India stock data

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api/stock/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const { from, to } = req.query;

  try {
    const response = await axios.get(`https://www.nseindia.com/api/historical/cm/equity`, {
      params: {
        symbol,
        series: '["EQ"]',
        from,
        to
      },
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nseindia.com/'
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
