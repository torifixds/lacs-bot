const OpenAI = require('openai');
const config = require('../config');

const openai = config.api.openai ? new OpenAI({ apiKey: config.api.openai }) : null;

async function generateAiReply(prompt) {
  if (!openai) {
    return 'La API de OpenAI no está configurada. Añade OPENAI_API_KEY en el entorno.';
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    return completion.choices[0]?.message?.content || 'No hubo respuesta.';
  } catch (error) {
    console.error('Error en IA:', error.message);
    return 'Hubo un error al consultar la IA.';
  }
}

module.exports = { generateAiReply };
