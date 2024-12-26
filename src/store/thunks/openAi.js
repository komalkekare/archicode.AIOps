import { createAsyncThunk } from "@reduxjs/toolkit";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import axios from "axios";

const { Configuration, OpenAIApi } = require("openai");


async function azureOpenAI(prompt) {
  // Replace with your Azure OpenAI key
  const key = process.env.key;
  const endpoint = "https://onecloud.openai.azure.com/";
  const deploymentName = "GenAIforOneCloud";
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));

  const choices = await client.getChatCompletions(
    deploymentName,
    [{ role: "user", content: prompt }]
    
  );

  
  return choices.choices[0].message;
}

export const fetchFromOpenAi = createAsyncThunk(
  "openAi/fetchFromOpenAi",
  async (userPrompt, { _, rejectWithValue }) => {
    try {
      const prompt = `I need an architectural diagram to implement ${userPrompt}. I need perfect mermaid2 script to illustrate the architectire diagram.`
      const script = await azureOpenAI(prompt);
      return {script: script.content
        .split("```")[1]
        .split("mermaid" || "mermaid2")[1], desc: script.content.split("```")[2]}
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFromOpenAiCloud = createAsyncThunk(
  "openAiCloud/fetchFromOpenAiCloud",
  async (userPrompt, { _, rejectWithValue }) => {
    try {

      const prompt = `I need an architectural diagram to implement ${userPrompt}. I need perfect mermaid2 script to illustrate the architectire diagram. Give the description of services and architecture`
      const script = await azureOpenAI(prompt);
      return {script: script.content
        .split("```")[1]
        .split("mermaid" || "mermaid2")[1], desc: script.content.split("```")[2]}
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTerraformScript = createAsyncThunk(
  "openAiCloud/fetchTerraformScript",
  async (userPrompt, { _, rejectWithValue }) => {
    try {
      let gptContent = "";
      if(userPrompt.terraformPrompt===""){
        gptContent = `I need a perfect ${userPrompt.selectedScript} script to implement architecture diagram using these services ${userPrompt.openAiCloudDesc}. Your task is to help me to generate ${userPrompt.selectedScript} scripts.`
      }
      else{
        gptContent = `I need a perfect ${userPrompt.selectedScript} script to implement architecture diagram using these services ${userPrompt.openAiCloudDesc} and ${userPrompt.terraformPrompt}`
      }
      
     const script = await azureOpenAI(gptContent);
      return script.content.split("```")[1];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deployScript = createAsyncThunk("openAiCloud/deployScript", async(_, {rejectWithValue}) => {
  try {
    const pat = process.env.Pat;
    const repo = "ArchGen.AIOps";
    const owner = "brillio-Oneai";
    const workflow= "CiCd.yml";
    const branch = "main";
    const config = {
      headers: {
        "Authorization": `Bearer ${pat}`
      }
    }
    const response = await axios.post(`https://api.github.com/repos/${owner}/${repo}/dispatches`, {
      event_type: 'trigger-workflow', // This should match the name of the event in your workflow YAML
      client_payload: {
        branch: branch
      }
    },
    config);
    console.log(response);
    if (response.status === 204) {
      return 'Workflow dispatch successful';
    } else {
      return 'Workflow dispatch failed';
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
})
