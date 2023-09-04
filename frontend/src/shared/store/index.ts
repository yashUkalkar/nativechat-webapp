// Packages
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Slices
import { createErrorSlice, ErrorSliceType } from "./slices/createErrorSlice";
import { createAuthSlice, AuthSliceType } from "./slices/createAuthSlice";

// Combined Type
type StoreCombinedSliceType = ErrorSliceType & AuthSliceType;

const useStore = create<StoreCombinedSliceType>()(
  persist(
    (...a) => ({
      ...createErrorSlice(...a),
      ...createAuthSlice(...a),
    }),
    {
      name: "authStorage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ auth: state.auth }),
    }
  )
);

export { useStore };
export type { StoreCombinedSliceType };
