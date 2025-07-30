const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.post("/generar", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres una experta en contenido UGC. Ayudas a creadores a generar guiones para Reels, TikToks, carruseles y copys publicitarios con tono creativo y claro. Usa un lenguaje natural, cercano y actual."
        },
        { role: "user", content: prompt }
      ]
    });

    res.json({ resultado: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Error al generar contenido" });
  }
});

app.listen(10000, () => {
  console.log("Servidor UGC funcionando en puerto 10000");
});
