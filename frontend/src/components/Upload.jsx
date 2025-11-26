import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function Upload({ setResult }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      setResult(null); 
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      setProgress(0);

      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (e.total) {
            setProgress(Math.round((e.loaded * 100) / e.total));
          }
        },
      });

      //console.log("response"+res.data);
      setResult(res.data); 
    } catch (err) {
      console.log("error"+err);
      alert("Upload failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div>
     
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition
        ${isDragActive ? "bg-blue-50 border-blue-400" : "bg-gray-100"}`}
      >
        <input {...getInputProps()} accept=".pdf,image/*" />
        <p className="text-gray-700">
          {isDragActive ? "Drop the file..." : "Drag & drop PDF/Image or click to select"}
        </p>
      </div>

    
      {selectedFile && (
        <div className="mt-4 p-3 bg-gray-200 rounded">
          <strong>Selected File:</strong> {selectedFile.name}
        </div>
      )}

     
      {selectedFile && !loading && (
        <button
          onClick={uploadFile}
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Extract Text
        </button>
      )}

     
      {loading && (
        <div className="mt-4">
          <div className="text-sm mb-1">Processing... {progress}%</div>
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="h-2 rounded bg-blue-600"
              style={{ width: progress + "%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
