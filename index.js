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
//   var crypto = req.body.crypto;
//   var fiat = req.body.fiat;
//   var baseURL =https://api.coindesk.com/v1/bpi/currentprice/
  try {
    const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice/BTC.json");
    const data = await response.json();
    const price = data.bpi.USD.rate; 
    console.log(price);
    res.send("<h1>The Current Price of Bitcoin is:"+" "+price +"</h1>");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.listen(55509, () => {
  console.log("Server is listening on port 55509");
});
