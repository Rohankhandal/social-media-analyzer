const { GoogleGenerativeAI } = require("@google/generative-ai");
const { response } = require("express");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash", 
  systemInstruction: `You are an expert Social Media Content Strategist and Growth Analyst.  
Your task is to analyze the content provided below and generate actionable, clear, and platform-agnostic
engagement improvement suggestions.

Content to analyze:
[INSERT_EXTRACTED_TEXT_HERE]

Please analyze the content and provide:

1. Concise Summary:
   - What the post is about
   - The intent and tone

2. Engagement Score (1–10):
   - Based on clarity, structure, emotional appeal, and call-to-action strength

3. Improvements (Very Important):
   Provide highly actionable suggestions in bullet points for improving:
   - **Hook / Opening Line**
   - **Readability & Flow**
   - **Emotional Impact**
   - **Call-to-Action (CTA)**
   - **Hashtags & Keywords**
   - **Formatting (line breaks, emojis, bold words, etc.)**

4. Hashtag Suggestions:
   Provide 10–15 niche + broad hashtags based on the topic.

Make sure your response is:
- Clear and structured
- Human-like and natural
- Highly actionable (not generic advice)
- Focused on measurable improvements

Also you can use emoji for better formatting of review.
`,
});

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);

  console.log(result.response.text());

  return result.response.text();
}

module.exports = generateContent;
