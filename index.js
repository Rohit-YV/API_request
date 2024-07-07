import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", async (req, res) => {
    const crypto = req.body.crypto;
    const fiat = req.body.fiat;
    const baseURL = "https://api.coinbase.com/v2/exchange-rates?currency=";

    try {
        const response = await fetch(baseURL + crypto);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const rate = data.data.rates[fiat];
        
        if (!rate) {
            throw new Error('Exchange rate not available for specified fiat currency');
        }
        const message = `<h1>The Current Price of ${crypto.toUpperCase()} in ${fiat.toUpperCase()} is: ${rate}</h1>`;
        console.log(message);
        res.send();
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

const PORT = 55509;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
