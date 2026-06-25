"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainPanel from "@/components/MainPanel";
import PasswordGate from "@/components/PasswordGate";
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
    <PasswordGate>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden", position: "relative" }}>

        {/* Overlay — mobile only */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            style={{
              display: "none",
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 99,
            }}
          />
        )}

        {/* Sidebar */}
        <div
          className={`app-sidebar${sidebarOpen ? " open" : ""}`}
          style={{ width: "260px", flexShrink: 0, height: "100vh", overflow: "hidden" }}
        >
          <Sidebar
            documents={documents}
            selectedId={selected?.id ?? null}
            onSelect={handleSelect}
            onUploaded={handleUploaded}
            onDeleted={handleDeleted}
          />
        </div>

        {/* Main */}
        <div className="app-main" style={{ flex: 1, minWidth: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>

          {/* Mobile top bar */}
          <div
            className="mob-toggle"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderBottom: "1px solid #e5e7eb",
              background: "#fff",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: "#2E3A1C" }}>
              {selected ? selected.filename : "DocuZen"}
            </span>
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              style={{
                background: "none", border: "1px solid #D6DCCA",
                borderRadius: 6, padding: "6px 12px",
                fontSize: 12, color: "#5A6E4A", cursor: "pointer",
              }}
            >
              {sidebarOpen ? "✕ Close" : "☰ Documents"}
            </button>
          </div>

          <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
            <MainPanel document={selected} />
          </div>
        </div>
      </div>
    </PasswordGate>
  );
}
