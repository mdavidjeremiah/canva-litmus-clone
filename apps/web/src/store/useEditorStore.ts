import { create } from "zustand";
import type { DesignElement } from "@canva-clone/shared";

interface EditorState {
  elements: DesignElement[];
  selectedElementId: string | null;
  setElements: (elements: DesignElement[]) => void;
  addElement: (element: DesignElement) => void;
  updateElement: (id: string, updates: Partial<DesignElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  clearElements: () => void;
  loadDesign: (elements: DesignElement[]) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  elements: [],
  selectedElementId: null,
  setElements: (elements) => set({ elements }),
  addElement: (element) =>
    set((state) => ({
      elements: [...state.elements, element],
    })),
  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) => (el.id === id ? { ...el, ...updates } : el)),
    })),
  deleteElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
    })),
  selectElement: (id) => set({ selectedElementId: id }),
  clearElements: () => set({ elements: [], selectedElementId: null }),
  loadDesign: (elements) => set({ elements, selectedElementId: null }),
}));
