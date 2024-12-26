const { createSlice } = require("@reduxjs/toolkit");
const { fetchGenArch, fetchSingleGenArch } = require("../thunks/genArch");


const initialState = {
    genArch: [],
    currHistoryArch: null,
    isLoading: false
}

const fetchGenArchSlice = createSlice({
    name: "fetchGenArch",
    initialState,
    reducers: {
        clearCurrHistoryArch(state){
            state.currHistoryArch = null;
        },
        deleteSingleGenArch(state, action){
            const idToRemove = action.payload;
            state.genArch = state.genArch.filter(item => item._id !== idToRemove);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGenArch.fulfilled, (state, action) => {
            state.genArch = action.payload;
        })
        builder.addCase(fetchSingleGenArch.fulfilled, (state, action) => {
            state.currHistoryArch = action.payload;
            state.isLoading = false;
        })
        builder.addCase(fetchSingleGenArch.pending, (state, action) => {
            state.isLoading = true;
        })
    }
});

export const { clearCurrHistoryArch, deleteSingleGenArch } = fetchGenArchSlice.actions;
export default fetchGenArchSlice.reducer;