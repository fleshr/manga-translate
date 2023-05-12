import { IPage } from "@/interfaces";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IState {
  pages: IPage[];
  totalPages: number;
  selectedPage: number;
  setPages: (pages: IPage[]) => void;
  selectPage: (pageId: number) => void;
  selectedTextBox: number;
  selectTextBox: (textBoxId: number) => void;
  addTextBox: (
    pageId: number,
    url: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) => void;
  removeTextBox: (pageId: number, textBoxId: number) => void;
}

export const usePagesStore = create<IState>()(
  immer((set) => ({
    pages: [],
    setPages: (pages) => {
      set({ pages, selectedPage: 1, totalPages: pages.length });
    },
    totalPages: 0,
    selectedPage: 0,
    selectPage: (pageId) => set({ selectedPage: pageId }),
    selectedTextBox: 0,
    selectTextBox: (textBoxId: number) => set({ selectedTextBox: textBoxId }),
    addTextBox: async (pageId, url, x, y, width, height) => {
      let newId = 0;

      set((state) => {
        const pageIndex = state.pages.findIndex((page) => page.id === pageId);
        if (pageIndex === -1) return state;

        const textBoxes = state.pages[pageIndex].textBoxes;
        newId = textBoxes.length + 1;

        textBoxes.push({
          id: newId,
          url,
          x,
          y,
          width,
          height,
          rawText: "Text recognising...",
          translatedText: "Text translation...",
        });
        state.selectedTextBox = newId;
      });

      try {
        const imageResponse = await fetch(url);
        const image = await imageResponse.blob();
  
        const formData = new FormData();
        formData.append("image", image);
  
        const responseText = await fetch("http://localhost:5000/", {
          method: "POST",
          body: formData,
        });
  
        const text = (await responseText.json()) as {
          rawText: string;
          translatedText: string;
        };
  
        set((state) => {
          const pageIndex = state.pages.findIndex((page) => page.id === pageId);
          if (pageIndex === -1) return state;
  
          const textBoxIndex = state.pages[pageIndex].textBoxes.findIndex(
            (textBox) => textBox.id === newId
          );
          if (textBoxIndex === -1) return state;
  
          state.pages[pageIndex].textBoxes[textBoxIndex].rawText = text.rawText;
          state.pages[pageIndex].textBoxes[textBoxIndex].translatedText = text.translatedText;
        });
      } catch (error) {
        console.log(error)
      }
    },
    removeTextBox: (pageId, textBoxId) => {
      set((state) => {
        const index = state.pages.findIndex((page) => page.id === pageId);
        if (index !== -1) {
          state.pages[index].textBoxes = state.pages[index].textBoxes
            .filter((textBox) => textBox.id !== textBoxId)
            .map((textBox, index) => ({ ...textBox, id: index + 1 }));
        }
      });
    },
  }))
);
