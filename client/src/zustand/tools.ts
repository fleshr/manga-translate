import { ITools } from "@/interfaces";
import { create } from "zustand";

interface IState {
  selectedTool: ITools;
  selectTool: (tool: ITools) => void;
}

export const useToolsStore = create<IState>()((set) => ({
  selectedTool: "view",
  selectTool: (tool) => set({ selectedTool: tool }),
}));
