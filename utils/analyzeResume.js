const { OpenAI } = require("openai");
require('dotenv').config();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // <-- Yaha apna API key paste kiya
});

async function analyzeResume(resumeText, jobRole) {
  const prompt = `
Resume Text: ${resumeText}
Job Role: ${jobRole}

Please analyze the resume and return the following points clearly in human-readable detailed format:

🎯 Title (Resume Analysis for [Job Role])

✅ Match Percentage with small 1-line explanation.

💰 Estimated Package with 1-line salary expectation comment.

⏳ Estimated Learning Time with 1-line daily study suggestion.

❌ Missing Skills (list each skill and short why it's missing or needed).

🛠️ Skill Suggestions:
Table format:
Area         | Suggested Skills

📚 Learning Plan:
Month-wise plan like:
- Month 1-2: Topics to study
- Month 3: Topics to study
- Month 4: Topics to study
- Month 5: Topics to study
- Month 6: Topics to study

Make it professional, clean, organized with emojis for each section. No JSON. No code block. No extra explanation.

Strictly return a clean readable analysis only.
`;


  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
  });

  const reply = response.choices[0].message.content;
  // console.log("Raw reply:", reply);  // Debug ke liye --> backend me print karwane ke liye hai ye 
  return reply;//-->ye apan frontend me bhej rahe hai 

}

module.exports = analyzeResume;

