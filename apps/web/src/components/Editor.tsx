import { useEffect, useState } from "react";
import { useEditorStore } from "../store/useEditorStore";
import { api } from "../api/client";
import type { Design } from "@canva-clone/shared";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";
import PropertiesPanel from "./PropertiesPanel";

interface EditorProps {
  designId: string;
  onClose: () => void;
}

export default function Editor({ designId, onClose }: EditorProps) {
  const [design, setDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { elements, loadDesign } = useEditorStore();

  useEffect(() => {
    loadDesignData();
  }, [designId]);

  const loadDesignData = async () => {
    try {
      const data = await api.designs.get(designId);
      setDesign(data);
      loadDesign(data.elements);
    } catch (error) {
      console.error("Failed to load design:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!design) return;

    setSaving(true);
    try {
      const updated = await api.designs.update(designId, {
        name: design.name,
        description: design.description,
        elements,
      });
      setDesign(updated);
      alert("Design saved!");
    } catch (error) {
      console.error("Failed to save design:", error);
      alert("Failed to save design");
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement("a");
      link.download = `${design?.name || "design"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <header className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
          >
            ← Back
          </button>
          <input
            type="text"
            value={design?.name || ""}
            onChange={(e) => setDesign(design ? { ...design, name: e.target.value } : null)}
            className="bg-transparent border-b border-gray-600 focus:border-white outline-none px-1"
          />
          <span className="text-sm text-gray-400">
            {design?.width} × {design?.height}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleExport}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Export PNG
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <Toolbar />
        <Canvas design={design!} />
        <PropertiesPanel />
      </div>
    </div>
  );
}
