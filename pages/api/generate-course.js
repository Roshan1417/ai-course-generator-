import { GoogleGenerativeAI } from "@google/generative-ai";

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, type } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // Initialize INSIDE handler so env vars are always fresh
  const apiKey = process.env.COURSE_GEN_AI_KEY;
  console.log("COURSE_GEN_AI_KEY being used:", apiKey ? apiKey.substring(0,15) + "..." : "NOT SET");
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    let history = [];

    if (type === "course-layout") {
      history = [
        {
          role: "user",
          parts: [{ text: "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level:Basic, Duration: 1 hours, NoOf Chapters:5, in JSON format" }],
        },
        {
          role: "model",
          parts: [{ text: '{"course":{"name":"Python Programming for Beginners","description":"Learn the fundamentals of Python programming.","chapters":[{"name":"Introduction to Python","about":"History and setup.","duration":"15 minutes"},{"name":"Variables and Data Types","about":"Data types in Python.","duration":"20 minutes"},{"name":"Control Flow","about":"If/else and loops.","duration":"25 minutes"},{"name":"Functions","about":"Creating functions.","duration":"20 minutes"},{"name":"Data Structures","about":"Lists, tuples, dicts.","duration":"20 minutes"}],"duration":"1 hour","category":"Programming","topic":"Python","level":"Basic","noOfChapters":5}}' }],
        },
      ];
    } else if (type === "chapter-content") {
      history = [
        {
          role: "user",
          parts: [{ text: "Explain the concept in Detail on Topic: Python Basic Chapter: Variables and Data Types in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example (Code field in <precode> format) if applicable" }],
        },
        {
          role: "model",
          parts: [{ text: '[{"title":"Variables","explanation":"Variables store data in Python.","code":"<precode>x = 5\\nname = \'Alice\'</precode>"}]' }],
        },
      ];
    }

    const chat = model.startChat({ generationConfig, history });
    const result = await chat.sendMessage(prompt);
    const text = result.response.text();
    const data = JSON.parse(text);

    return res.status(200).json({ result: data });
  } catch (error) {
    console.error("Gemini API error:", error.message);
    return res.status(500).json({ error: error.message || "AI generation failed" });
  }
}
