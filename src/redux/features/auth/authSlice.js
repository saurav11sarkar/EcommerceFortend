import { createSlice } from "@reduxjs/toolkit";

// Function to load user data from localStorage
const loadUserFromStorage = () => {
  try {
    const serializedState = localStorage.getItem("data");
    return serializedState ? { data: JSON.parse(serializedState) } : { data: null };
  } catch (error) {
    return { data: null };
  }
};

// Initial state
const initialState = loadUserFromStorage();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("data", JSON.stringify(state.data));
    },
    logout: (state) => {
      state.data = null;
      localStorage.removeItem("data");
    },
  },
});

// Export actions
export const { setUser, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
