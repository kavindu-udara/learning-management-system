import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: []
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers : {
        addCourseCategories: (state, action) => {
            state.categories = action.payload
        }
    }
});

export const {addCourseCategories} = categoriesSlice.actions;

export default categoriesSlice.reducer;