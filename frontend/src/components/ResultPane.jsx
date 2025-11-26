import React from "react";
import ReactMarkdown from "react-markdown";

export default function ResultPane({ result }) {
  if (!result)
    return (
      <div className="text-gray-500 text-center mt-20">
        Upload a file and click Extract Text.
      </div>
    );

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Extracted Text</h2>

      <div className="bg-white shadow rounded p-4 mb-6 max-h-80 overflow-y-auto whitespace-pre-wrap">
        {result.extractedText}
      </div>

      <h2 className="text-xl font-bold mb-3">AI Suggestions</h2>

      <div className="prose prose-neutral max-w-none bg-gray-50 shadow rounded p-4 max-h-80 overflow-y-auto">
        <ReactMarkdown>{result.aiSuggestions}</ReactMarkdown>
      </div>
    </div>
  );
}
