import { createSlice } from "@reduxjs/toolkit";
import { fetchFromOpenAi, fetchFromOpenAiCloud, fetchTerraformScript, deployScript } from "../thunks/openAi";

const initialState = {
    archGenPrompt: "",
    openAiResp : "",
    openAiRespDesc: "",
    isLoading: false,
    openAiCloud: "",
    openAiCloudDesc: "",
    isCloudLoading: false,
    terraformScript: "",
    isTerraformLoading: false,
    scriptType: "",
    cloudType: "",
    scriptPrompt: "",
    triggerLambdaResp: "",
    deployResp: ""
}


const openAiSlice = createSlice({
    name: "openAi",
    initialState,
    reducers: {
        setArchGenPrompt(state, action){
            state.archGenPrompt = action.payload
        },
        setTerraformScript(state, action){
            state.terraformScript = action.payload;
        },
        clearTerraformScript(state){
            state.terraformScript = "";
        },
        clearOpenAiCloud(state){
            state.openAiCloud = "";
            state.openAiCloudDesc = "";
        },
        clearOpenAiResp(state){
            state.openAiResp = "";
            state.openAiRespDesc = "";
        },
        setScriptType(state, action){
            state.scriptType = action.payload;
        },
        setScriptPrompt(state, action){
            state.scriptPrompt = action.payload;
        },
        setCloudType(state, action){
            state.cloudType = action.payload;
        },
        clearArchGenPrompt(state){
            state.archGenPrompt = "";
        },
        setTriggerLambdaResp(state, action){
            state.triggerLambdaResp = action.payload;
        },
        clearTriggerLambdaResp(state){
            state.triggerLambdaResp = "";
        },
        clearDeployResp(state){
            state.deployResp = "";
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchFromOpenAi.pending, (state) =>{
            state.isLoading = true;
        })
        builder.addCase(fetchFromOpenAi.fulfilled, (state, action) =>{
            state.openAiResp = action.payload.script;
            state.openAiRespDesc = action.payload.desc;
            state.isLoading = false;
        })
        builder.addCase(fetchFromOpenAiCloud.pending, (state)=>{
            state.isCloudLoading = true;
        })
        builder.addCase(fetchFromOpenAiCloud.fulfilled, (state, action) => {
            state.openAiCloud = action.payload.script;
            state.openAiCloudDesc = action.payload.desc;
            state.isCloudLoading = false;
        })
        builder.addCase(fetchTerraformScript.pending, (state) => {
            state.isTerraformLoading = true;
        })
        builder.addCase(fetchTerraformScript.fulfilled, (state, action)=>{
            state.terraformScript = action.payload;
            state.isTerraformLoading = false;
        })
        builder.addCase(deployScript.fulfilled, (state, action) => {
            state.deployResp = action.payload;
        })

        
    }
});

export const { clearDeployResp, clearTriggerLambdaResp, setTriggerLambdaResp, setArchGenPrompt, setScriptPrompt, clearArchGenPrompt, setTerraformScript, clearOpenAiCloud, clearOpenAiResp, clearTerraformScript, setScriptType, setCloudType } = openAiSlice.actions;
export default openAiSlice.reducer;