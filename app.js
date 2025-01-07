import express from "express";
import OpenAI from "openai";

// Configuración de la clave API de OpenAI
const openai = new OpenAI({
  apiKey: "TU_CLAVE_API_DE_OPENAI", // Reemplaza esto con tu clave
});

const app = express();
app.use(express.json());

// Endpoint para el chatbot
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Falta el mensaje del usuario" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error procesando tu solicitud" });
  }
});

// Servidor en ejecución
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});