"use client";

import { useEffect, useRef, useState } from "react";
import { ChatMessage, Document } from "@/types";
import { askQuestion } from "@/lib/api";

interface Props {
  document: Document | null;
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const GREEN = "#4A5C2F";
const LIGHT = "#EEF2E8";
const BORDER = "#D6DCCA";
const DARK  = "#2E3A1C";
const MID   = "#7A8870";

export default function MainPanel({ document }: Props) {
  const [tab, setTab]         = useState<"chat" | "doc">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);

  useEffect(() => { setMessages([]); setTab("chat"); }, [document?.id]);
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

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "14px 22px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    background: "transparent",
    borderBottom: `2px solid ${active ? GREEN : "transparent"}`,
    color: active ? GREEN : "#9CA3AF",
    transition: "color 0.15s, border-color 0.15s",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#FAFAF8" }}>

      {/* ── Tab bar ── */}
      <div style={{ display: "flex", alignItems: "center", borderBottom: `1px solid ${BORDER}`, background: "#fff", flexShrink: 0 }}>
        <button style={tabStyle(tab === "chat")} onClick={() => setTab("chat")}>Chat</button>
        <button
          style={{ ...tabStyle(tab === "doc"), opacity: document ? 1 : 0.4, cursor: document ? "pointer" : "default" }}
          onClick={() => document && setTab("doc")}
        >
          Document
        </button>

        {/* Doc name pill — right side */}
        {document && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px", paddingRight: "20px" }}>
            <span style={{
              fontSize: "11px", padding: "3px 9px", borderRadius: "20px",
              background: LIGHT, color: GREEN, border: `1px solid ${BORDER}`, fontWeight: 600,
            }}>
              {document.file_type.toUpperCase()}
            </span>
            <span style={{ fontSize: "12px", color: MID, maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {document.filename}
            </span>
          </div>
        )}
      </div>

      {/* ── CHAT TAB ── */}
      {tab === "chat" && (
        <>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px", display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* No document */}
            {!document && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "16px", paddingTop: "100px" }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="30" height="30" fill="none" stroke={GREEN} strokeWidth="1.4" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "#374151" }}>No document selected</p>
                  <p style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "6px", lineHeight: 1.7 }}>Upload or select a document from the sidebar<br />to start asking questions.</p>
                </div>
              </div>
            )}

            {/* Welcome hints */}
            {document && messages.length === 0 && !loading && (
              <div style={{ padding: "22px 24px", borderRadius: "14px", background: LIGHT, border: `1px solid ${BORDER}`, maxWidth: "580px" }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: DARK, marginBottom: "10px" }}>
                  Ready to answer questions about <span style={{ color: GREEN }}>{document.filename}</span>
                </p>
                <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.7, marginBottom: "16px" }}>
                  Ask for summaries, specific details, comparisons, or explanations.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["What is this document about?", "Summarise the key points", "What are the main findings?"].map((hint) => (
                    <button
                      key={hint}
                      onClick={() => setInput(hint)}
                      style={{
                        textAlign: "left", background: "#fff", border: `1px solid ${BORDER}`,
                        borderRadius: "9px", padding: "10px 14px", fontSize: "13px", color: "#374151",
                        cursor: "pointer", transition: "border-color 0.15s, background 0.15s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.background = "#FAFCF8"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = "#fff"; }}
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
                <p style={{ fontSize: "11px", color: "#9CA3AF", paddingLeft: msg.role === "user" ? 0 : "4px", paddingRight: msg.role === "user" ? "4px" : 0 }}>
                  {msg.role === "user" ? "You" : "DocuZen"}
                </p>
                <div style={{
                  maxWidth: "82%",
                  padding: "14px 18px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  fontSize: "14px",
                  lineHeight: 1.85,
                  background: msg.role === "user" ? GREEN : "#fff",
                  color: msg.role === "user" ? "#fff" : "#1F2937",
                  border: msg.role === "assistant" ? `1px solid ${BORDER}` : "none",
                  whiteSpace: "pre-wrap",
                }}>
                  {msg.content}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingLeft: "4px", marginTop: "2px" }}>
                    <span style={{ fontSize: "11px", color: "#9CA3AF", alignSelf: "center" }}>Sources:</span>
                    {msg.sources.slice(0, 5).map((s, si) => (
                      <span key={si} style={{
                        display: "inline-flex", alignItems: "center", gap: "5px",
                        fontSize: "11px", padding: "4px 11px", borderRadius: "20px",
                        background: LIGHT, color: DARK, border: `1px solid ${BORDER}`, fontWeight: 500,
                      }}>
                        {s.page_number ? `Page ${s.page_number}` : `Chunk ${s.chunk_index}`}
                        <span style={{ opacity: 0.5 }}>· {(s.score * 100).toFixed(0)}%</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start" }}>
                <p style={{ fontSize: "11px", color: "#9CA3AF", paddingLeft: "4px" }}>DocuZen</p>
                <div style={{
                  padding: "14px 18px", borderRadius: "16px 16px 16px 4px",
                  background: "#fff", border: `1px solid ${BORDER}`,
                  display: "flex", gap: "5px", alignItems: "center",
                }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{
                      width: 7, height: 7, borderRadius: "50%", background: "#B8C4A8",
                      display: "inline-block", animation: `dz-bounce 1.2s ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "16px 24px", borderTop: `1px solid ${BORDER}`, background: "#fff", flexShrink: 0 }}>
            <div
              style={{
                display: "flex", alignItems: "flex-end", gap: "10px",
                border: "1.5px solid", borderColor: BORDER,
                borderRadius: "13px", padding: "10px 12px 10px 18px",
                background: "#fff", transition: "border-color 0.15s",
              }}
              onFocusCapture={(e) => (e.currentTarget.style.borderColor = GREEN)}
              onBlurCapture={(e) => (e.currentTarget.style.borderColor = BORDER)}
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
                  resize: "none", lineHeight: 1.65,
                  maxHeight: "140px", overflowY: "auto",
                }}
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
                }}
              />
              <button
                onClick={handleSend}
                disabled={!document || !input.trim() || loading}
                style={{
                  background: !document || !input.trim() || loading ? "#E5E7EB" : GREEN,
                  border: "none", borderRadius: "9px", width: 36, height: 36,
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
        </>
      )}

      {/* ── DOCUMENT TAB ── */}
      {tab === "doc" && document && (
        <div style={{ flex: 1, overflowY: "auto", padding: "36px 36px" }}>
          <div style={{ maxWidth: "560px", display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Doc identity */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: LIGHT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="26" height="26" fill="none" stroke={GREEN} strokeWidth="1.4" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "16px", fontWeight: 600, color: DARK, marginBottom: "4px", wordBreak: "break-word" }}>{document.filename}</p>
                <span style={{
                  fontSize: "11px", padding: "3px 10px", borderRadius: "20px",
                  background: document.status === "ready" ? "#E6F4EA" : LIGHT,
                  color: document.status === "ready" ? "#2D6A4F" : MID,
                  border: `1px solid ${document.status === "ready" ? "#B7DFC9" : BORDER}`,
                  fontWeight: 600,
                }}>
                  {document.status === "ready" ? "Ready" : document.status === "processing" ? "Processing…" : "Failed"}
                </span>
              </div>
            </div>

            <div style={{ height: "1px", background: BORDER }} />

            {/* Details grid */}
            <div>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", color: MID, marginBottom: "14px" }}>FILE DETAILS</p>
              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: "12px", overflow: "hidden" }}>
                {[
                  { label: "File type",    value: document.file_type.toUpperCase() },
                  { label: "File size",    value: formatSize(document.file_size) },
                  { label: "Uploaded",     value: formatDate(document.created_at) },
                  { label: "Status",       value: document.status.charAt(0).toUpperCase() + document.status.slice(1) },
                ].map((row, i, arr) => (
                  <div key={row.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "13px 18px",
                    borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : "none",
                  }}>
                    <span style={{ fontSize: "13px", color: MID }}>{row.label}</span>
                    <span style={{ fontSize: "13px", fontWeight: 500, color: DARK }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA back to chat */}
            <div style={{ background: LIGHT, border: `1px solid ${BORDER}`, borderRadius: "12px", padding: "20px 22px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: DARK, marginBottom: "6px" }}>Start asking questions</p>
              <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.7, marginBottom: "14px" }}>
                Switch to the Chat tab to ask anything about this document — summaries, specific facts, comparisons.
              </p>
              <button
                onClick={() => setTab("chat")}
                style={{
                  background: GREEN, color: "#fff", border: "none",
                  borderRadius: "9px", padding: "9px 20px",
                  fontSize: "13px", fontWeight: 600, cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#3a4a24")}
                onMouseLeave={(e) => (e.currentTarget.style.background = GREEN)}
              >
                Go to chat →
              </button>
            </div>

          </div>
        </div>
      )}

      <style>{`
        @keyframes dz-bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
