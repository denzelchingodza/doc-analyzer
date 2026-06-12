"use client";

import { Document } from "@/types";

interface Props {
  document: Document | null;
}

export default function ViewerPanel({ document }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#F5F5F2", borderRight: "1px solid var(--m-border)" }}>

      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--m-border)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ fontSize: "13px", color: "#374151", display: "flex", alignItems: "center", gap: "8px", fontWeight: 500 }}>
          <svg width="16" height="16" fill="none" stroke="var(--m-primary)" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          {document ? document.filename : "Document Viewer"}
        </span>
        {document && (
          <span style={{
            fontSize: "11px", padding: "2px 8px", borderRadius: "20px",
            background: "var(--m-light)", color: "var(--m-dark)",
            border: "1px solid var(--m-border)", fontWeight: 500,
          }}>
            {document.file_type.toUpperCase()}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", overflowY: "auto" }}>
        {!document ? (
          /* No document selected */
          <div style={{ textAlign: "center", maxWidth: "280px" }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: "var(--m-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="36" height="36" fill="none" stroke="var(--m-mid)" strokeWidth="1.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <p style={{ fontSize: "15px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>No document selected</p>
            <p style={{ fontSize: "13px", color: "#9CA3AF", lineHeight: 1.7 }}>Upload a document from the sidebar and select it to get started.</p>
          </div>
        ) : (
          /* Document selected — clean preview placeholder */
          <div style={{
            background: "#fff",
            border: "1px solid #E0E3D8",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "520px",
            padding: "48px 40px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
          }}>
            {/* Doc icon */}
            <div style={{ width: 64, height: 64, borderRadius: 16, background: "var(--m-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="32" height="32" fill="none" stroke="var(--m-primary)" strokeWidth="1.3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>

            <div>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#1F2937", marginBottom: "6px" }}>{document.filename}</p>
              <p style={{ fontSize: "12px", color: "#9CA3AF" }}>
                {document.file_type.toUpperCase()} · Document ready
              </p>
            </div>

            <div style={{ width: "100%", height: "1px", background: "var(--m-border)" }} />

            <div style={{ background: "var(--m-light)", borderRadius: "10px", padding: "16px 20px", width: "100%" }}>
              <p style={{ fontSize: "13px", color: "var(--m-dark)", fontWeight: 500, marginBottom: "6px" }}>
                PDF preview coming soon
              </p>
              <p style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.7 }}>
                Use the chat panel on the right to ask questions about this document — DocuZen will answer with references to the exact pages.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
