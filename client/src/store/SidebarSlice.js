import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sideBarVisible: false
};

const SidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setSideBarVisible: (state, action) => {
            state.sideBarVisible = action.payload;
        }
    }
});

export const { setSideBarVisible } = SidebarSlice.actions;

export default SidebarSlice.reducer;