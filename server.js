const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "gemma3:4b",
            prompt: message,
            stream: false
        });

        console.log(response.data);
        res.json({ reply: response.data.response || "No response from model." });
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Error connecting to Ollama." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});