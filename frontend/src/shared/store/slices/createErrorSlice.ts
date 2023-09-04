// Packages
import { StateCreator } from "zustand";

// Types
import { StoreCombinedSliceType } from "../index";

type ErrorState = {
  visible: boolean;
  message: string;
};
type ErrorSliceType = {
  errorState: ErrorState;
  showError: (message: string) => void;
  removeError: () => void;
};

const initialState: ErrorState = {
  visible: false,
  message: "Unknown Error!",
};

const createErrorSlice: StateCreator<
  StoreCombinedSliceType,
  [],
  [],
  ErrorSliceType
> = (set) => ({
  errorState: initialState,
  showError: (message) =>
    set(() => ({ errorState: { visible: true, message: message } })),
  removeError: () =>
    set(() => ({ errorState: { visible: false, message: "Unknown Error!" } })),
});

export { createErrorSlice };
export type { ErrorSliceType };
