import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.get("/", (req, res) => {
    return res.json("tes")
})

app.listen(9000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${9000}`);
  });