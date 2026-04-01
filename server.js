const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = "PUT_YOUR_API_KEY_HERE";

app.post("/tashkeel", async (req, res) => {
    try {
        const { text } = req.body;

        const response = await fetch("https://farasa.qcri.org/webapi/diacritize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY
            },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        res.json({ result: data.text });

    } catch {
        res.json({ result: text });
    }
});

app.listen(3000, () => console.log("Server running"));
