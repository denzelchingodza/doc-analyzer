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

  useEffect(() => {
    listDocuments().then(setDocuments).catch(console.error);
  }, []);

  function handleUploaded(doc: Document) {
    setDocuments((prev) => [doc, ...prev]);
    if (doc.status === "ready") setSelected(doc);
  }

  function handleDeleted(id: string) {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  return (
    <PasswordGate>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: "260px", flexShrink: 0, height: "100vh", overflow: "hidden" }}>
          <Sidebar
            documents={documents}
            selectedId={selected?.id ?? null}
            onSelect={setSelected}
            onUploaded={handleUploaded}
            onDeleted={handleDeleted}
          />
        </div>

        {/* Main — Chat + Document tabs */}
        <div style={{ flex: 1, minWidth: 0, height: "100vh", overflow: "hidden" }}>
          <MainPanel document={selected} />
        </div>
      </div>
    </PasswordGate>
  );
}
