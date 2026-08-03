"use client";

import { useEffect, useRef, useState } from "react";
import { ChatMessage, Document } from "@/types";
import { askQuestion, uploadDocument } from "@/lib/api";

interface Props {
  document: Document | null;
  onUpload: (doc: Document) => void;
}

const DEEP        = "#190508";
const PANEL       = "#2A0810";
const HERO        = "#611828";
const GOLD        = "#C9A227";
const BORDER      = "rgba(255,255,255,0.08)";
const BORDER_GOLD = "rgba(201,162,39,0.2)";
const WHITE_DIM   = "rgba(255,255,255,0.62)";
const WHITE_FAINT = "rgba(255,255,255,0.35)";

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const STARTERS = [
  "What is this document about?",
  "Summarise the key points",
  "What are the main findings?",
  "List the important topics covered",
];

export default function MainPanel({ document, onUpload }: Props) {
  const [tab, setTab]           = useState<"chat" | "doc">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef                = useRef<HTMLInputElement>(null);
  const bottomRef               = useRef<HTMLDivElement>(null);

  useEffect(() => { setMessages([]); setTab("chat"); }, [document?.id]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function handleFile(file: File) {
    setUploadError(null);
    setUploading(true);
    try {
      const doc = await uploadDocument(file);
      onUpload(doc);
    } catch (e: unknown) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  async function handleSend(question?: string) {
    const q = (question ?? input).trim();
    if (!q || !document || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setLoading(true);
    try {
      const res = await askQuestion(document.id, q);
      setMessages((prev) => [...prev, { role: "assistant", content: res.answer, sources: res.sources }]);
    } catch (e: unknown) {
      setMessages((prev) => [...prev, { role: "assistant", content: e instanceof Error ? e.message : "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  const tabBtn = (active: boolean): React.CSSProperties => ({
    padding: "13px 20px", fontSize: "13px", fontWeight: 500,
    cursor: "pointer", border: "none", background: "transparent",
    borderBottom: `2px solid ${active ? GOLD : "transparent"}`,
    color: active ? GOLD : WHITE_FAINT,
    transition: "color 0.15s, border-color 0.15s",
  });

  // No document: centered upload area
  if (!document) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: DEEP, alignItems: "center", justifyContent: "center", padding: "32px" }}>
        {uploading ? (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              border: "3px solid rgba(201,162,39,0.2)", borderTopColor: GOLD,
              animation: "cd-spin 0.85s linear infinite",
            }} />
            <div>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}>Processing your document</p>
              <p style={{ fontSize: "13px", color: WHITE_DIM, marginTop: "6px" }}>This usually takes a few seconds</p>
            </div>
          </div>
        ) : (
          <div style={{ width: "100%", maxWidth: "480px", textAlign: "center" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "14px",
              background: "rgba(201,162,39,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <svg width="26" height="26" fill="none" stroke={GOLD} strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>Upload a document to get started</h2>
            <p style={{ fontSize: "14px", color: WHITE_DIM, lineHeight: 1.7, marginBottom: "28px" }}>
              Lecture notes, clinical guidelines, textbook chapters, past papers. Drop it in and ask anything.
            </p>

            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              style={{
                border: `2px dashed ${dragOver ? GOLD : BORDER_GOLD}`,
                borderRadius: "12px", padding: "36px 24px",
                cursor: "pointer", background: dragOver ? "rgba(201,162,39,0.07)" : "rgba(255,255,255,0.02)",
                transition: "all 0.15s",
              }}
            >
              <svg width="28" height="28" fill="none" stroke={dragOver ? GOLD : WHITE_FAINT} strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 12px", display: "block" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V8m0 0-3 3m3-3 3 3M6.5 19a4.5 4.5 0 0 1 0-9h.5a5 5 0 0 1 9.8-1A4.5 4.5 0 0 1 17.5 19h-11Z" />
              </svg>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "#fff", marginBottom: "4px" }}>Drop your file here</p>
              <p style={{ fontSize: "12px", color: WHITE_FAINT }}>PDF or DOCX up to 50 MB</p>
            </div>

            <button
              onClick={() => inputRef.current?.click()}
              style={{
                marginTop: "14px", background: GOLD, color: "#2C0A10",
                border: "none", borderRadius: "7px", padding: "11px 28px",
                fontSize: "14px", fontWeight: 700, cursor: "pointer", width: "100%",
              }}
            >
              Choose a file
            </button>

            <input ref={inputRef} type="file" accept=".pdf,.docx" style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

            {uploadError && <p style={{ fontSize: "12px", color: "#F87171", marginTop: "10px" }}>{uploadError}</p>}
          </div>
        )}
        <style>{`@keyframes cd-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: DEEP }}>

      {/* Tab bar */}
      <div style={{ display: "flex", alignItems: "center", borderBottom: `1px solid ${BORDER}`, background: PANEL, flexShrink: 0 }}>
        <button style={tabBtn(tab === "chat")} onClick={() => setTab("chat")}>Chat</button>
        <button style={tabBtn(tab === "doc")} onClick={() => setTab("doc")}>Document</button>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px", paddingRight: "20px" }}>
          <span style={{
            fontSize: "10px", padding: "3px 9px", borderRadius: "20px", fontWeight: 600,
            background: "rgba(201,162,39,0.12)", color: GOLD,
            border: `1px solid ${BORDER_GOLD}`, letterSpacing: "0.05em",
          }}>
            {document.file_type.toUpperCase()}
          </span>
          <span style={{ fontSize: "12px", color: WHITE_FAINT, maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {document.filename}
          </span>
        </div>
      </div>

      {/* Chat tab */}
      {tab === "chat" && (
        <>
          <div style={{ flex: 1, overflowY: "auto", padding: "28px", display: "flex", flexDirection: "column", gap: "22px" }}>

            {/* Welcome card */}
            {messages.length === 0 && !loading && (
              <div style={{
                background: PANEL, border: `1px solid ${BORDER}`,
                borderRadius: "12px", padding: "22px 24px", maxWidth: "560px",
              }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>
                  {document.filename}
                </p>
                <p style={{ fontSize: "12px", color: WHITE_FAINT, marginBottom: "16px" }}>
                  {formatSize(document.file_size)} · uploaded {formatDate(document.created_at)}
                </p>
                <p style={{ fontSize: "13px", color: WHITE_DIM, lineHeight: 1.7, marginBottom: "16px" }}>
                  Ask anything about this document. ChunkDoc will find the answer and tell you which page it came from.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  {STARTERS.map((hint) => (
                    <button
                      key={hint}
                      onClick={() => handleSend(hint)}
                      style={{
                        textAlign: "left", background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${BORDER}`,
                        borderRadius: "8px", padding: "9px 14px", fontSize: "13px", color: WHITE_DIM,
                        cursor: "pointer", transition: "border-color 0.15s, background 0.15s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = BORDER_GOLD; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = WHITE_DIM; }}
                    >
                      {hint}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <p style={{ fontSize: "10px", color: WHITE_FAINT, letterSpacing: "0.05em", fontWeight: 500, paddingLeft: msg.role === "user" ? 0 : "4px", paddingRight: msg.role === "user" ? "4px" : 0 }}>
                  {msg.role === "user" ? "YOU" : "CHUNKDOC"}
                </p>
                <div style={{
                  maxWidth: "80%", padding: "13px 17px",
                  borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  fontSize: "14px", lineHeight: 1.8,
                  background: msg.role === "user" ? HERO : PANEL,
                  color: "#fff",
                  border: msg.role === "assistant" ? `1px solid ${BORDER}` : "none",
                  whiteSpace: "pre-wrap",
                }}>
                  {msg.content}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", paddingLeft: "4px", marginTop: "2px" }}>
                    {msg.sources.slice(0, 5).map((s, si) => (
                      <span key={si} style={{
                        fontSize: "11px", padding: "3px 10px", borderRadius: "20px",
                        background: "rgba(201,162,39,0.15)", color: GOLD,
                        border: `1px solid ${BORDER_GOLD}`, fontWeight: 600,
                      }}>
                        {s.page_number ? `Page ${s.page_number}` : `Chunk ${s.chunk_index}`}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
                <p style={{ fontSize: "10px", color: WHITE_FAINT, letterSpacing: "0.05em", fontWeight: 500, paddingLeft: "4px" }}>CHUNKDOC</p>
                <div style={{
                  padding: "13px 18px", borderRadius: "14px 14px 14px 4px",
                  background: PANEL, border: `1px solid ${BORDER}`,
                  display: "flex", gap: "5px", alignItems: "center",
                }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{
                      width: 6, height: 6, borderRadius: "50%", background: BORDER_GOLD,
                      display: "inline-block", animation: `cd-bounce 1.2s ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "14px 24px", borderTop: `1px solid ${BORDER}`, background: PANEL, flexShrink: 0 }}>
            <div
              style={{
                display: "flex", alignItems: "flex-end", gap: "10px",
                border: `1.5px solid ${BORDER}`, borderRadius: "10px",
                padding: "10px 12px 10px 16px", background: "rgba(255,255,255,0.04)",
                transition: "border-color 0.15s",
              }}
              onFocusCapture={(e) => (e.currentTarget.style.borderColor = BORDER_GOLD)}
              onBlurCapture={(e) => (e.currentTarget.style.borderColor = BORDER)}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Ask a question about this document..."
                disabled={loading}
                rows={1}
                style={{
                  flex: 1, border: "none", outline: "none",
                  fontSize: "14px", background: "transparent",
                  color: "#fff", fontFamily: "inherit",
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
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                style={{
                  background: !input.trim() || loading ? "rgba(201,162,39,0.15)" : GOLD,
                  border: "none", borderRadius: "7px", width: 34, height: 34,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: !input.trim() || loading ? "not-allowed" : "pointer",
                  transition: "background 0.15s", flexShrink: 0,
                }}
              >
                <svg width="14" height="14" fill="none" stroke={!input.trim() || loading ? BORDER_GOLD : "#2C0A10"} strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </div>
            <p style={{ fontSize: "11px", color: WHITE_FAINT, textAlign: "center", marginTop: "7px" }}>
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </>
      )}

      {/* Document tab */}
      {tab === "doc" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "36px" }}>
          <div style={{ maxWidth: "520px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: 50, height: 50, borderRadius: 13, background: "rgba(201,162,39,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="24" height="24" fill="none" stroke={GOLD} strokeWidth="1.4" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "#fff", wordBreak: "break-word" }}>{document.filename}</p>
                <span style={{
                  display: "inline-block", marginTop: "5px",
                  fontSize: "10px", padding: "2px 9px", borderRadius: "20px",
                  background: document.status === "ready" ? "rgba(34,197,94,0.12)" : "rgba(201,162,39,0.12)",
                  color: document.status === "ready" ? "#4ADE80" : GOLD,
                  border: `0.5px solid ${document.status === "ready" ? "rgba(74,222,128,0.25)" : BORDER_GOLD}`,
                  fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const,
                }}>
                  {document.status === "ready" ? "Ready" : document.status}
                </span>
              </div>
            </div>

            <div style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: "10px", overflow: "hidden" }}>
              {[
                { label: "File type", value: document.file_type.toUpperCase() },
                { label: "File size", value: formatSize(document.file_size) },
                { label: "Uploaded",  value: formatDate(document.created_at) },
                { label: "Status",    value: document.status.charAt(0).toUpperCase() + document.status.slice(1) },
              ].map((row, i, arr) => (
                <div key={row.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 18px",
                  borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : "none",
                }}>
                  <span style={{ fontSize: "13px", color: WHITE_DIM }}>{row.label}</span>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#fff" }}>{row.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setTab("chat")}
              style={{
                background: GOLD, color: "#2C0A10", border: "none",
                borderRadius: "8px", padding: "11px 24px",
                fontSize: "13px", fontWeight: 700, cursor: "pointer",
                alignSelf: "flex-start",
              }}
            >
              Back to chat
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes cd-bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }
        @keyframes cd-spin { to { transform: rotate(360deg); } }
        textarea::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </div>
  );
}
