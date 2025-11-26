import React from "react";
import ReactMarkdown from "react-markdown";

export default function ResultPane({ result }) {
  if (!result)
    return (
      <div className="text-gray-500 text-center mt-20">
        Upload a file and click Extract Text.
      </div>
    );

  let raw = result.aiSuggestions;
  let data = raw;

  if (typeof raw === "string") {
    try {
      let cleaned = raw.trim();

      cleaned = cleaned
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      cleaned = cleaned.replace(/\\"/g, '"').replace(/\\n/g, "");

      if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
        data = JSON.parse(cleaned);
      }
    } catch (err) {
      console.error("Failed to parse suggestions JSON:", err);
      data = raw;
    }
  }

  const isObj = typeof data === "object" && !Array.isArray(data);

  const renderTags = (tags) =>
    tags?.length ? (
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((t, i) => (
          <span
            key={i}
            className="text-sm px-2 py-1 rounded-full border bg-white shadow"
          >
            {t}
          </span>
        ))}
      </div>
    ) : null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Extracted Text</h2>

      <div className="bg-white shadow rounded p-4 mb-6 max-h-80 overflow-y-auto whitespace-pre-wrap">
        {result.extractedText}
      </div>

      <h2 className="text-xl font-bold mb-3">AI Suggestions</h2>

      {!isObj && (
        <div className="prose bg-gray-50 shadow rounded p-4 max-h-80 overflow-y-auto">
          <ReactMarkdown>{raw}</ReactMarkdown>
        </div>
      )}

      {isObj && (
        <div className="space-y-4">
          {data.suggestions?.length > 0 && (
            <div className="bg-gray-50 shadow rounded p-4">
              <h3 className="font-semibold mb-2">Suggestions</h3>
              <ul className="list-disc list-inside">
                {data.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {data.instagram && (
            <div className="bg-white shadow rounded p-4">
              <h4 className="font-semibold">Instagram</h4>
              <div className="prose text-sm mt-2">
                <ReactMarkdown>{data.instagram.caption}</ReactMarkdown>
              </div>
              {renderTags(data.instagram.hashtags)}
            </div>
          )}

          {data.linkedin && (
            <div className="bg-white shadow rounded p-4">
              <h4 className="font-semibold">LinkedIn</h4>
              <div className="prose text-sm mt-2">
                <ReactMarkdown>{data.linkedin.caption}</ReactMarkdown>
              </div>
              {renderTags(data.linkedin.hashtags)}
            </div>
          )}

          {data.social_tips?.length > 0 && (
            <div className="bg-gray-50 shadow rounded p-4">
              <h4 className="font-semibold">Social Tips</h4>
              <ul className="list-disc list-inside">
                {data.social_tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
