import {createSlice} from "@reduxjs/toolkit";

const featuredSlice = createSlice({
    name: "featured",
    initialState: [],
    reducers: {
        setFeatured: (state, action) => {
            return action.payload
        }
    }
})

export const {setFeatured} = featuredSlice.actions;
export default featuredSlice.reducer;