import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setMessages([...messages, { role: "user", content: input }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    setInput("");
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🤖 Chat con Fe y Alegría</h1>
      <img src="/fea-logo.png" alt="Logo Fe y Alegría" width={120} />
      <div style={{ margin: "20px 0" }}>
        {messages.map((m, i) => (
          <p key={i}><b>{m.role}:</b> {m.content}</p>
        ))}
        {loading && <p>⏳ Pensando...</p>}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje..."
        style={{ width: "70%", padding: 8 }}
      />
      <button onClick={sendMessage} style={{ marginLeft: 10, padding: 8 }}>
        Enviar
      </button>
    </div>
  );
}
