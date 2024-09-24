const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const cloudName = '';
const apiKey = '';
const apiSecret = '';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Servidor Node.js está rodando. Acesse /images para listar as imagens.');
});

app.get('/images', async (req, res) => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`;
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Erro ao buscar imagens');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
