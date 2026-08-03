"use client";

import { useRef, useState } from "react";
import { Document } from "@/types";
import { uploadDocument, deleteDocument } from "@/lib/api";

interface Props {
  documents: Document[];
  selectedId: string | null;
  onSelect: (doc: Document) => void;
  onUploaded: (doc: Document) => void;
  onDeleted: (id: string) => void;
}

const PANEL       = "#270818";
const GOLD        = "#C9A227";
const BORDER      = "rgba(255,255,255,0.08)";
const BORDER_GOLD = "rgba(201,162,39,0.2)";
const WHITE_DIM   = "rgba(255,255,255,0.62)";
const WHITE_FAINT = "rgba(255,255,255,0.35)";

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill={GOLD} />
      <path d="M10 8h8l5 5v11a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
        fill="rgba(58,13,22,0.15)" stroke="#3A0D16" strokeWidth="1.5" />
      <path d="M18 8v5h5" stroke="#3A0D16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="16" x2="20" y2="16" stroke="#3A0D16" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="19" x2="20" y2="19" stroke="#3A0D16" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="22" x2="16" y2="22" stroke="rgba(58,13,22,0.45)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Sidebar({ documents, selectedId, onSelect, onUploaded, onDeleted }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [dragOver, setDragOver]   = useState(false);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const doc = await uploadDocument(file);
      onUploaded(doc);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Upload failed");
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

  async function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    await deleteDocument(id);
    onDeleted(id);
  }

  return (
    <aside style={{
      display: "flex", flexDirection: "column", gap: "20px",
      padding: "16px", height: "100%", overflowY: "auto",
      background: PANEL, borderRight: `1px solid ${BORDER}`,
    }}>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "9px", paddingBottom: "4px" }}>
        <Logo />
        <div>
          <span style={{ fontSize: "16px", fontWeight: 800, color: "#fff", letterSpacing: "-0.2px" }}>
            Chunk<span style={{ color: GOLD }}>Doc</span>
          </span>
          <p style={{ fontSize: "10px", color: WHITE_FAINT, marginTop: "1px", letterSpacing: "0.04em" }}>Tygerberg Medical</p>
        </div>
      </div>

      {/* Upload zone */}
      <div>
        <p style={{ fontSize: "10px", fontWeight: 600, color: WHITE_FAINT, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Upload</p>
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          style={{
            border: `1.5px dashed ${dragOver ? GOLD : BORDER_GOLD}`,
            borderRadius: "9px", padding: "18px 12px",
            textAlign: "center",
            cursor: uploading ? "wait" : "pointer",
            background: dragOver ? "rgba(201,162,39,0.08)" : "rgba(255,255,255,0.03)",
            transition: "all 0.15s",
          }}
        >
          {uploading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                border: "2.5px solid rgba(201,162,39,0.2)",
                borderTopColor: GOLD,
                animation: "cd-spin 0.8s linear infinite",
              }} />
              <p style={{ fontSize: "12px", color: WHITE_DIM }}>Processing document...</p>
            </div>
          ) : (
            <>
              <svg width="22" height="22" fill="none" stroke={GOLD} strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 8px", display: "block" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V8m0 0-3 3m3-3 3 3M6.5 19a4.5 4.5 0 0 1 0-9h.5a5 5 0 0 1 9.8-1A4.5 4.5 0 0 1 17.5 19h-11Z" />
              </svg>
              <p style={{ fontSize: "12px", color: "#fff", lineHeight: 1.5, fontWeight: 500 }}>Drop your PDF or DOCX here</p>
              <p style={{ fontSize: "11px", color: WHITE_FAINT, marginTop: "3px" }}>or click to browse · max 50 MB</p>
            </>
          )}
        </div>
        <input ref={inputRef} type="file" accept=".pdf,.docx" style={{ display: "none" }}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        {error && <p style={{ fontSize: "11px", color: "#F87171", marginTop: "6px" }}>{error}</p>}
      </div>

      {/* Document list */}
      {documents.length > 0 && (
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "10px", fontWeight: 600, color: WHITE_FAINT, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Documents</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => doc.status === "ready" && onSelect(doc)}
                style={{
                  display: "flex", alignItems: "center", gap: "9px",
                  padding: "9px 10px", borderRadius: "8px",
                  background: selectedId === doc.id ? "rgba(201,162,39,0.1)" : "transparent",
                  border: selectedId === doc.id ? `1px solid ${BORDER_GOLD}` : "1px solid transparent",
                  cursor: doc.status === "ready" ? "pointer" : "default",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => { if (selectedId !== doc.id) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={(e) => { if (selectedId !== doc.id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <div style={{ width: 30, height: 30, borderRadius: 7, background: "rgba(201,162,39,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="15" height="15" fill="none" stroke={GOLD} strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "12px", fontWeight: 500, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.filename}</p>
                  <p style={{ fontSize: "11px", color: WHITE_FAINT, marginTop: "1px" }}>{formatSize(doc.file_size)}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
                  <span style={{
                    fontSize: "9px", padding: "2px 7px", borderRadius: "20px", fontWeight: 600,
                    background: doc.status === "ready" ? "rgba(34,197,94,0.12)" : doc.status === "failed" ? "rgba(248,113,113,0.12)" : "rgba(201,162,39,0.12)",
                    color: doc.status === "ready" ? "#4ADE80" : doc.status === "failed" ? "#F87171" : GOLD,
                    border: `0.5px solid ${doc.status === "ready" ? "rgba(74,222,128,0.25)" : doc.status === "failed" ? "rgba(248,113,113,0.25)" : BORDER_GOLD}`,
                    textTransform: "uppercase", letterSpacing: "0.06em",
                  }}>
                    {doc.status === "processing" ? "loading" : doc.status}
                  </span>
                  <button onClick={(e) => handleDelete(e, doc.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.2)", padding: "2px", lineHeight: 1 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F87171")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
                  >
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes cd-spin { to { transform: rotate(360deg); } }
      `}</style>
    </aside>
  );
}
