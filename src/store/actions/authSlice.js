const { createSlice } = require("@reduxjs/toolkit");
const { signin, signup, fetchSingleUser } = require("../thunks/auth");


const initialState = {
    userDetails: null,
    userLoading: false,
    authError: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem("authToken");
            state.userDetails = null;
        }
    },
        extraReducers: (builder) => {
            builder.addCase(signin.pending, (state)=>{
                
                state.userLoading = true;
                state.authError = null;
            });
            builder.addCase(signin.fulfilled, (state, action)=>{
               
                state.userLoading = false;
                state.userDetails = {userName: action.payload.userName, userEmail: action.payload.userEmail};
                state.authError = null;
            });
            builder.addCase(signin.rejected, (state, action) => {
                
                state.userLoading = false;
                state.authError = action.payload;
                state.userDetails = null;
            });
            builder.addCase(signup.pending, (state)=>{
                
                state.userLoading = true;
                state.authError = null;
            });
            builder.addCase(signup.fulfilled, (state, action)=>{
                console.log("ACTION", action)
                state.userLoading = false;
                state.userDetails = {userName: action.payload.userName, userEmail: action.payload.userEmail};
                state.authError = null;
            });
            builder.addCase(signup.rejected, (state, action) => {
                console.log(action)
                state.userLoading = false;
                state.authError = action.payload;
                state.userDetails = null;
            });
            builder.addCase(fetchSingleUser.fulfilled, (state, action)=>{
                console.log("ACTION", action)
                state.userLoading = false;
                state.userDetails = {userName: action.payload.userName, userEmail: action.payload.userEmail};
                state.authError = null;
            });
            
        }
    
});
export const { logout, setUserDetails } = authSlice.actions;
export default authSlice.reducer;