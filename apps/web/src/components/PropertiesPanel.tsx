import { useEditorStore } from "../store/useEditorStore";
import type { DesignElement } from "@canva-clone/shared";

export default function PropertiesPanel() {
  const { elements, selectedElementId, updateElement } = useEditorStore();

  const selectedElement = elements.find((el) => el.id === selectedElementId);

  if (!selectedElement) {
    return (
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Properties</h2>
        <p className="text-gray-500 text-sm">Select an element to edit its properties</p>
      </div>
    );
  }

  const handleChange = (key: string, value: any) => {
    updateElement(selectedElement.id, { [key]: value });
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4 overflow-y-auto">
      <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Properties</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Type</label>
          <div className="text-sm capitalize">{selectedElement.type}</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm text-gray-400 mb-1">X</label>
            <input
              type="number"
              value={Math.round(selectedElement.x)}
              onChange={(e) => handleChange("x", Number(e.target.value))}
              className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Y</label>
            <input
              type="number"
              value={Math.round(selectedElement.y)}
              onChange={(e) => handleChange("y", Number(e.target.value))}
              className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Width</label>
            <input
              type="number"
              value={Math.round(selectedElement.width)}
              onChange={(e) => handleChange("width", Number(e.target.value))}
              className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Height</label>
            <input
              type="number"
              value={Math.round(selectedElement.height)}
              onChange={(e) => handleChange("height", Number(e.target.value))}
              className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Rotation</label>
          <input
            type="range"
            min="0"
            max="360"
            value={selectedElement.rotation}
            onChange={(e) => handleChange("rotation", Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{Math.round(selectedElement.rotation)}°</div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Opacity</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={selectedElement.opacity}
            onChange={(e) => handleChange("opacity", Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">{selectedElement.opacity}</div>
        </div>

        {(selectedElement.type === "rectangle" ||
          selectedElement.type === "circle" ||
          selectedElement.type === "triangle") && (
          <div>
            <label className="block text-sm text-gray-400 mb-1">Fill Color</label>
            <input
              type="color"
              value={(selectedElement as any).fill || "#000000"}
              onChange={(e) => handleChange("fill", e.target.value)}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
        )}

        {selectedElement.type === "rectangle" && (
          <div>
            <label className="block text-sm text-gray-400 mb-1">Corner Radius</label>
            <input
              type="number"
              value={(selectedElement as any).cornerRadius || 0}
              onChange={(e) => handleChange("cornerRadius", Number(e.target.value))}
              className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
            />
          </div>
        )}

        {selectedElement.type === "text" && (
          <>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Text</label>
              <textarea
                value={(selectedElement as any).text}
                onChange={(e) => handleChange("text", e.target.value)}
                className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Font Size</label>
              <input
                type="number"
                value={(selectedElement as any).fontSize}
                onChange={(e) => handleChange("fontSize", Number(e.target.value))}
                className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Font Family</label>
              <select
                value={(selectedElement as any).fontFamily}
                onChange={(e) => handleChange("fontFamily", e.target.value)}
                className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
                <option value="Courier New">Courier New</option>
                <option value="Verdana">Verdana</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Font Weight</label>
              <select
                value={(selectedElement as any).fontWeight}
                onChange={(e) => handleChange("fontWeight", e.target.value)}
                className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Text Color</label>
              <input
                type="color"
                value={(selectedElement as any).fill || "#000000"}
                onChange={(e) => handleChange("fill", e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Alignment</label>
              <select
                value={(selectedElement as any).align}
                onChange={(e) => handleChange("align", e.target.value)}
                className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </>
        )}

        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-400">Locked</label>
          <input
            type="checkbox"
            checked={selectedElement.locked}
            onChange={(e) => handleChange("locked", e.target.checked)}
            className="w-4 h-4"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-400">Visible</label>
          <input
            type="checkbox"
            checked={selectedElement.visible}
            onChange={(e) => handleChange("visible", e.target.checked)}
            className="w-4 h-4"
          />
        </div>
      </div>
    </div>
  );
}
