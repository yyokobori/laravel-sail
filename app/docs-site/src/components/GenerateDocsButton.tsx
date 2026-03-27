import React, { useState } from 'react';

export default function GenerateDocsButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const generate = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:4000/generate-docs", {
        method: "POST"
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text);
      }

      setMessage(text);
    } catch (e: any) {
      setMessage(`エラー: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={generate} disabled={loading}>
        {loading ? "生成中..." : "Generate Docs"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}