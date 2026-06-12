"use client";

import { useEffect, useRef, useState } from "react";
import { ChatMessage, Document } from "@/types";
import { askQuestion } from "@/lib/api";

interface Props {
  document: Document | null;
}

export default function ChatPanel({ document }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);

  useEffect(() => { setMessages([]); }, [document?.id]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function handleSend() {
    if (!input.trim() || !document || loading) return;
    const question = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);
    try {
      const res = await askQuestion(document.id, question);
      setMessages((prev) => [...prev, { role: "assistant", content: res.answer, sources: res.sources }]);
    } catch (e: unknown) {
      setMessages((prev) => [...prev, { role: "assistant", content: e instanceof Error ? e.message : "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#FAFAF8" }}>

      {/* Header */}
      <div style={{
        padding: "16px 24px",
        borderBottom: "1px solid var(--m-border)",
        background: "#fff",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: "var(--m-light)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="18" height="18" fill="none" stroke="var(--m-primary)" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>
              {document ? "Document Q&A" : "Chat"}
            </p>
            <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "1px" }}>
              {document ? document.filename : "Select a document to begin"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* Empty state */}
        {!document && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "14px", paddingTop: "80px" }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--m-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="28" height="28" fill="none" stroke="var(--m-primary)" strokeWidth="1.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#374151" }}>No document selected</p>
              <p style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "6px", lineHeight: 1.6 }}>
                Upload a document and select it<br />to start asking questions
              </p>
            </div>
          </div>
        )}

        {/* Welcome hint when document selected but no messages yet */}
        {document && messages.length === 0 && !loading && (
          <div style={{
            padding: "20px 22px",
            borderRadius: "12px",
            background: "var(--m-light)",
            border: "1px solid var(--m-border)",
          }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--m-dark)", marginBottom: "8px" }}>
              Ready to answer questions
            </p>
            <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.7 }}>
              Ask anything about <strong style={{ color: "var(--m-dark)" }}>{document.filename}</strong> — summaries, specific details, comparisons, or explanations.
            </p>
            <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {["What is this document about?", "Summarise the key points", "What are the main findings?"].map((hint) => (
                <button
                  key={hint}
                  onClick={() => { setInput(hint); }}
                  style={{
                    textAlign: "left", background: "#fff", border: "1px solid var(--m-border)",
                    borderRadius: "8px", padding: "8px 12px", fontSize: "12px", color: "#374151",
                    cursor: "pointer", transition: "border-color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--m-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--m-border)")}
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {/* Role label */}
            <p style={{ fontSize: "11px", color: "#9CA3AF", paddingLeft: msg.role === "user" ? 0 : "4px", paddingRight: msg.role === "user" ? "4px" : 0 }}>
              {msg.role === "user" ? "You" : "DocuZen"}
            </p>

            {/* Bubble */}
            <div style={{
              maxWidth: "92%",
              padding: "14px 18px",
              borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              fontSize: "14px",
              lineHeight: 1.8,
              background: msg.role === "user" ? "var(--m-primary)" : "#fff",
              color: msg.role === "user" ? "#fff" : "#1F2937",
              border: msg.role === "assistant" ? "1px solid var(--m-border)" : "none",
              boxShadow: msg.role === "assistant" ? "0 1px 4px rgba(0,0,0,0.04)" : "none",
              whiteSpace: "pre-wrap",
            }}>
              {msg.content}
            </div>

            {/* Sources */}
            {msg.sources && msg.sources.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingLeft: "4px", marginTop: "2px" }}>
                <span style={{ fontSize: "11px", color: "#9CA3AF", alignSelf: "center" }}>Sources:</span>
                {msg.sources.slice(0, 4).map((s, si) => (
                  <span key={si} style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    fontSize: "11px", padding: "4px 10px", borderRadius: "20px",
                    background: "var(--m-light)", color: "var(--m-dark)",
                    border: "1px solid var(--m-border)",
                    fontWeight: 500,
                  }}>
                    <svg width="10" height="10" fill="none" stroke="var(--m-primary)" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    {s.page_number ? `Page ${s.page_number}` : `Chunk ${s.chunk_index}`}
                    <span style={{ opacity: 0.55 }}>· {(s.score * 100).toFixed(0)}%</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start" }}>
            <p style={{ fontSize: "11px", color: "#9CA3AF", paddingLeft: "4px" }}>DocuZen</p>
            <div style={{
              padding: "14px 18px", borderRadius: "16px 16px 16px 4px",
              background: "#fff", border: "1px solid var(--m-border)",
              display: "flex", gap: "5px", alignItems: "center",
            }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  width: 7, height: 7, borderRadius: "50%", background: "var(--m-mid)",
                  display: "inline-block", animation: `bounce 1.2s ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid var(--m-border)", background: "#fff", flexShrink: 0 }}>
        <div style={{
          display: "flex", alignItems: "flex-end", gap: "10px",
          border: "1.5px solid", borderColor: "var(--m-border)",
          borderRadius: "12px", padding: "10px 12px 10px 16px",
          background: "#fff", transition: "border-color 0.15s",
        }}
          onFocusCapture={(e) => (e.currentTarget.style.borderColor = "var(--m-primary)")}
          onBlurCapture={(e) => (e.currentTarget.style.borderColor = "var(--m-border)")}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder={document ? "Ask a question about this document..." : "Select a document first..."}
            disabled={!document || loading}
            rows={1}
            style={{
              flex: 1, border: "none", outline: "none",
              fontSize: "14px", background: "transparent",
              color: "#111827", fontFamily: "inherit",
              resize: "none", lineHeight: 1.6,
              maxHeight: "120px", overflowY: "auto",
            }}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
            }}
          />
          <button
            onClick={handleSend}
            disabled={!document || !input.trim() || loading}
            style={{
              background: !document || !input.trim() || loading ? "#E5E7EB" : "var(--m-primary)",
              border: "none", borderRadius: "8px", width: 34, height: 34,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: !document || !input.trim() || loading ? "not-allowed" : "pointer",
              transition: "background 0.15s", flexShrink: 0,
            }}
          >
            <svg width="15" height="15" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
        <p style={{ fontSize: "11px", color: "#C4C9BC", textAlign: "center", marginTop: "8px" }}>
          Enter to send · Shift+Enter for new line
        </p>
      </div>

      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }`}</style>
    </div>
  );
}
