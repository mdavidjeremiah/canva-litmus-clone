import { useEffect, useState } from "react";
import type { Design } from "@canva-clone/shared";
import { api } from "../api/client";

interface DesignListProps {
  onSelectDesign: (id: string) => void;
}

export default function DesignList({ onSelectDesign }: DesignListProps) {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDesigns();
  }, []);

  const loadDesigns = async () => {
    try {
      const response = await api.designs.list();
      setDesigns(response.designs);
    } catch (error) {
      console.error("Failed to load designs:", error);
    } finally {
      setLoading(false);
    }
  };

  const createNewDesign = async () => {
    try {
      const design = await api.designs.create({
        name: "Untitled Design",
        width: 800,
        height: 600,
      });
      onSelectDesign(design.id);
    } catch (error) {
      console.error("Failed to create design:", error);
    }
  };

  const deleteDesign = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this design?")) return;

    try {
      await api.designs.delete(id);
      setDesigns(designs.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Failed to delete design:", error);
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Canva Litmus Clone</h1>
          <button
            onClick={createNewDesign}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            + New Design
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {designs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No designs yet</p>
            <button
              onClick={createNewDesign}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create Your First Design
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {designs.map((design) => (
              <div
                key={design.id}
                onClick={() => onSelectDesign(design.id)}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div
                  className="aspect-video bg-gray-100 rounded-t-lg relative overflow-hidden"
                  style={{ width: design.width, height: design.height, maxWidth: "100%" }}
                >
                  {design.thumbnailUrl ? (
                    <img
                      src={design.thumbnailUrl}
                      alt={design.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      {design.width} × {design.height}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate">{design.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Updated {new Date(design.updatedAt).toLocaleDateString()}
                  </p>
                  <button
                    onClick={(e) => deleteDesign(design.id, e)}
                    className="mt-2 text-sm text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
