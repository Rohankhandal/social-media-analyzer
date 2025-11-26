import React, { useState } from "react";
import Upload from "./components/Upload";
import ResultPane from "./components/ResultPane";

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50">
      <div className="max-w-7xl mx-auto">
        <div className="px-6 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-clip-text ">
              Social Media Analyzer
            </h1>
          </div>
          <p className="text-gray-700 text-lg">Transform your social content with smart insights</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 p-6">
      
          <div className="lg:w-1/2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all duration-300">
              <Upload setResult={setResult} />
            </div>
          </div>

          
          <div className="lg:w-1/2">
            <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border p-8 h-full transition-all duration-300 ${
              result 
                ? 'border-emerald-200 shadow-md' 
                : 'border-gray-100 hover:shadow-md'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                  result ? 'w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-500' : 'w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500'
                }`}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {result ? 'Analysis Complete' : 'Awaiting Content'}
                </h2>
              </div>


              {!result && (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    Ready for Analysis
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Upload your content to begin
                  </p>
                </div>
              )}

              <ResultPane result={result} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}