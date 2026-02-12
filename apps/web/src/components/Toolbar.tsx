import { useEditorStore } from "../store/useEditorStore";
import type { DesignElement, ElementType } from "@canva-clone/shared";

export default function Toolbar() {
  const { addElement, selectedElementId, deleteElement } = useEditorStore();

  const createId = () => Math.random().toString(36).substr(2, 9);

  const addShape = (type: ElementType) => {
    const element: DesignElement = {
      id: createId(),
      type,
      x: 350,
      y: 250,
      width: type === "text" ? 200 : 100,
      height: type === "text" ? 50 : 100,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      zIndex: 0,
    };

    if (type === "rectangle") {
      (element as any).fill = "#8b5cf6";
    } else if (type === "circle") {
      (element as any).fill = "#ec4899";
    } else if (type === "triangle") {
      (element as any).fill = "#14b8a6";
    } else if (type === "text") {
      (element as any).text = "Double click to edit";
      (element as any).fontSize = 24;
      (element as any).fontFamily = "Arial";
      (element as any).fontWeight = "normal";
      (element as any).fontStyle = "normal";
      (element as any).fill = "#000000";
      (element as any).align = "left";
      (element as any).lineHeight = 1.2;
    }

    addElement(element);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const response = await fetch("/api/assets", {
        method: "POST",
        body: (() => {
          const formData = new FormData();
          formData.append("file", file);
          return formData;
        })(),
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();

      const element: DesignElement = {
        id: createId(),
        type: "image",
        x: 350,
        y: 250,
        width: 200,
        height: 200,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        zIndex: 0,
        src: data.url,
        assetId: data.asset.id,
      };

      addElement(element);
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Failed to upload image");
    }
  };

  return (
    <div className="w-20 bg-gray-800 flex flex-col items-center py-4 gap-4">
      <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">Add</div>

      <button
        onClick={() => addShape("rectangle")}
        className="w-12 h-12 bg-purple-500 rounded hover:bg-purple-600 transition-colors"
        title="Add Rectangle"
      />

      <button
        onClick={() => addShape("circle")}
        className="w-12 h-12 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors"
        title="Add Circle"
      />

      <button
        onClick={() => addShape("triangle")}
        className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[40px] border-l-transparent border-r-transparent border-b-teal-500 hover:border-b-teal-600 transition-colors"
        title="Add Triangle"
      />

      <button
        onClick={() => addShape("text")}
        className="w-12 h-12 bg-gray-700 rounded hover:bg-gray-600 transition-colors flex items-center justify-center text-white font-bold"
        title="Add Text"
      >
        T
      </button>

      <label className="w-12 h-12 bg-gray-700 rounded hover:bg-gray-600 transition-colors flex items-center justify-center cursor-pointer text-white">
        <span className="text-xl">📷</span>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
      </label>

      <div className="flex-1" />

      {selectedElementId && (
        <button
          onClick={() => deleteElement(selectedElementId)}
          className="w-12 h-12 bg-red-600 rounded hover:bg-red-700 transition-colors flex items-center justify-center text-white"
          title="Delete Selected"
        >
          🗑️
        </button>
      )}
    </div>
  );
}
