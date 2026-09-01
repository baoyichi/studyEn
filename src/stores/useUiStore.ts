import { create } from "zustand";

type Dialog = "none" | "new-trip" | "new-stamp";

type UiState = {
  dialog: Dialog;
  selectedStampId?: string;
  setDialog: (dialog: Dialog) => void;
  selectStamp: (id?: string) => void;
};

export const useUiStore = create<UiState>((set) => ({
  dialog: "none",
  selectedStampId: undefined,
  setDialog: (dialog) => set({ dialog }),
  selectStamp: (selectedStampId) => set({ selectedStampId }),
}));
