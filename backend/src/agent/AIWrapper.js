const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const XMLParser = require('./XMLParser'); // Use the original parser

class AIWrapper {
  constructor() {
    this.openai = new OpenAI({
      baseURL: process.env.LLM_API_BASE_URL,
      apiKey: process.env.LLM_API_KEY,
    });
    this.model = process.env.LLM_MODEL_NAME;
    this.conversationHistory = [];
    this.loadSystemPrompts();
  }

  loadSystemPrompts() {
    const slopInstruction = fs.readFileSync(path.join(__dirname, '../instructions/SlopInstruction.md'), 'utf8');
    this.systemPrompt = `${slopInstruction}`;
    this.conversationHistory.push({ role: 'system', content: this.systemPrompt });
  }

  async stream(prompt, onChunk) { // The optional onChunk is still here but won't be used
    this.conversationHistory.push({ role: 'user', content: prompt });

    const stream = await this.openai.chat.completions.create({
      model: this.model,
      messages: this.conversationHistory,
      temperature: 0.1,
      stream: true,
    });
    
    let fullResponse = "";
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        fullResponse += content;
        if (typeof onChunk === 'function') {
          onChunk(content);
        }
      }
    }
    
    this.conversationHistory.push({ role: 'assistant', content: fullResponse });
    return XMLParser.parse(fullResponse);
  }
}

module.exports = AIWrapper;