const { urlencoded } = require('express');
const express = require('express');
const app = express();

let accessHistory = [
  {
    url: 'https://victor.dev.br',
    time: '06 Jun 2021',
  },
];

app.use(express.json());

app.get('/api/history', (req, res) => {
  res.send(JSON.stringify(accessHistory));
});

app.post('/api/history', (req, res) => {
  const { url, time } = req.body;

  try {
    if (!url || url.length == 0) {
      throw new Error('URL not found or invalid');
    }

    if (!time || time.length == 0) {
      throw new Error('Time not found or invalid');
    }

    accessHistory.push({
      url: url,
      time: time,
    });

    res.status(201);
    res.end();
  } catch (error) {
    res.status(400);
    res.send({
      message: error.message,
    });
  }
});

app.listen(3000, () => console.log('A API está funcionando'));
