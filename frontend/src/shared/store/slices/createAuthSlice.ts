// Packages
import { StateCreator } from "zustand";

// Types
import { StoreCombinedSliceType } from "../index";
import { UserDataType } from "../../types";

type AuthState = {
  user: UserDataType | null;
  accessToken: string;
};

type AuthSliceType = {
  auth: AuthState;
  setAuth: (user: UserDataType | null, accessToken: string) => void;
  clearAuth: () => void;
};

const initialState: AuthState = {
  user: null,
  accessToken: "",
};

const createAuthSlice: StateCreator<
  StoreCombinedSliceType,
  [],
  [],
  AuthSliceType
> = (set) => ({
  auth: initialState,
  setAuth: (user, accessToken) => set(() => ({ auth: { user, accessToken } })),
  clearAuth: () => set(() => ({ auth: { user: null, accessToken: "" } })),
});

export { createAuthSlice };
export type { AuthSliceType };
