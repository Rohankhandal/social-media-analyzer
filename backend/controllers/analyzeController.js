const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const Document = require("../models/Document");
const path = require("path");
const generateContent = require("../services/ai.services");

async function analyzeFile(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    let extractedText = "";
    const ext = path.extname(file.originalname).toLowerCase();

    if (ext === ".pdf") {
      const dataBuffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text || "";
    } else {
      const ocr = await Tesseract.recognize(file.path, "eng");
      extractedText = ocr.data.text || "";
    }

    const aiSuggestions = await generateContent(extractedText);

    await Document.create({
      filename: file.filename,
      originalname: file.originalname,
      text: extractedText,
      createdAt: new Date(),
    });

    return res.status(200).json({
      success: true,
      message: "File processed successfully",
      extractedText,
      aiSuggestions,
    });
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
}

module.exports = { analyzeFile };
