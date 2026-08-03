"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainPanel from "@/components/MainPanel";
import { Document } from "@/types";
import { listDocuments } from "@/lib/api";

export default function AppPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selected, setSelected]   = useState<Document | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    listDocuments().then(setDocuments).catch(console.error);
  }, []);

  function handleUploaded(doc: Document) {
    setDocuments((prev) => [doc, ...prev]);
    if (doc.status === "ready") {
      setSelected(doc);
      setSidebarOpen(false);
    }
  }

  function handleDeleted(id: string) {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  function handleSelect(doc: Document) {
    setSelected(doc);
    setSidebarOpen(false);
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#190508" }}>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            display: "none", position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)", zIndex: 99,
          }}
        />
      )}

      <div className={`app-sidebar${sidebarOpen ? " open" : ""}`}
        style={{ width: "256px", flexShrink: 0, height: "100vh", overflow: "hidden" }}>
        <Sidebar
          documents={documents}
          selectedId={selected?.id ?? null}
          onSelect={handleSelect}
          onUploaded={handleUploaded}
          onDeleted={handleDeleted}
        />
      </div>

      <div className="app-main" style={{ flex: 1, minWidth: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>

        {/* Mobile top bar */}
        <div className="mob-toggle" style={{
          display: "none", alignItems: "center", justifyContent: "space-between",
          padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "#2A0810", flexShrink: 0,
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
            {selected ? selected.filename : "ChunkDoc"}
          </span>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            style={{
              background: "none", border: "1px solid rgba(201,162,39,0.3)",
              borderRadius: 6, padding: "6px 12px",
              fontSize: 12, color: "#C9A227", cursor: "pointer",
            }}
          >
            {sidebarOpen ? "Close" : "Documents"}
          </button>
        </div>

        <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <MainPanel document={selected} onUpload={handleUploaded} />
        </div>
      </div>
    </div>
  );
}
