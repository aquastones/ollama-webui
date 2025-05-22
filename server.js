const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        const { data } = await axios.post("http://localhost:11434/api/generate", {
            model: "gemma3:4b",
            prompt: message,
            stream: false
        });
        res.json({ reply: data.response || "No response." });
    } catch (err) {
        res.status(500).json({ error: "Ollama error." });
    }
});

app.listen(3000, () => console.log("http://localhost:3000"));