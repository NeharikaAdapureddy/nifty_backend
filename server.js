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
    const response = await axios.get(
      `https://www.nseindia.com/api/historical/cm/equity?symbol=${symbol}&series=[%22EQ%22]&from=${from}&to=${to}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Referer': 'https://www.nseindia.com/',
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch NSE data', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
