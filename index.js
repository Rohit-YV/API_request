import express from 'express';
import bodyparser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", async (req, res) => {
  try {
    const response = await fetch("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD");
    const data = await response.json();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
