import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // if using Node 18+, native fetch is available, else install node-fetch

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { model, messages } = req.body;

    if (!model || !messages) {
      return res.status(400).json({ error: "Model and messages are required" });
    }

    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: messages[messages.length - 1].content }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
