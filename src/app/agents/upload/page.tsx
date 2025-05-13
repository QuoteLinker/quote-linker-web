"use client";
import React, { useState } from "react";

export default function AgentUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string[][]>([]);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setError("");
    if (selected) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const rows = text.split("\n").map((row) => row.split(","));
        setPreview(rows.slice(0, 5)); // Preview first 5 rows
      };
      reader.onerror = () => setError("Failed to read file");
      reader.readAsText(selected);
    } else {
      setPreview([]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Upload Leads (CSV)</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-700"
      />
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {preview.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 shadow mb-4">
          <div className="font-semibold mb-2">Preview (first 5 rows):</div>
          <table className="w-full text-sm">
            <tbody>
              {preview.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border px-2 py-1">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        className="bg-electric-blue text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#00D4E5] transition"
        disabled={!file}
      >
        Upload
      </button>
    </div>
  );
} 