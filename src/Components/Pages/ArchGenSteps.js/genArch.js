import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Loader from "../../Loader/loader";
import { fetchFromOpenAi } from "../../../store/thunks/openAi";
import MermaidComp from "../utils/Mermaid";
import { setArchGenPrompt, clearOpenAiCloud, clearOpenAiResp, clearTerraformScript, clearTriggerLambdaResp } from "../../../store/actions/openAiSlice";

function GenArch() {
  const dispatch = useDispatch();
  const { archGenPrompt, openAiResp, openAiRespDesc, isLoading } = useSelector(
    (state) => state.openAi
  );
  const [prompt, setPrompt] = useState("");
  const [cloudSelector, setCloudSelector] = useState(false);
  const [stepBtnContent, setStepBtnContent] = useState("NEXT");
  const [currDiagram, setCurrDiagram] = useState(false);
  const [isSubmitDisabled, setisSubmitDisabled] = useState(true);

  const getMermaidScript = async () => {
    dispatch(clearOpenAiResp());
    dispatch(clearOpenAiCloud());
    dispatch(clearTerraformScript());
    dispatch(fetchFromOpenAi(archGenPrompt));
  };

  const setGenArchPrompt = (value) => {
    dispatch(setArchGenPrompt(value));
  }



  const next = () => {
    setCloudSelector(!cloudSelector);
    cloudSelector ? setStepBtnContent("NEXT") : setStepBtnContent("PREV");
  };

  useEffect(() => {

    if (openAiResp) {
      setCurrDiagram(true);
    }
    if(archGenPrompt  && !isLoading){
      setisSubmitDisabled(false);
    }else{
      setisSubmitDisabled(true);
    }
  }, [openAiResp, archGenPrompt, isLoading]);

  return (
    <div style={{ margin: "10ch", textAlign: "center" }}>
      <FormLabel id="demo-row-radio-buttons-group-label">
        <h3> Generate Architecture</h3>
      </FormLabel>
   

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "45%" },
        }}
        noValidate
        autoComplete="on"
      >
        <div>
          <TextField
            id="outlined-textarea"
            label="Enter architecture description"
            placeholder="Enter architecture description"
            onChange={(e) => setGenArchPrompt(e.target.value)}
            value={archGenPrompt}
            multiline
          />
        </div>
      </Box>

      <Button
        color="success"
        variant="contained"
        onClick={getMermaidScript}
        style={{ marginBottom: 10, marginTop: 5 }}
        disabled={isSubmitDisabled}
      >
        {" "}
        Submit{" "}
      </Button>
   
      {isLoading && <Loader />}
      {!isLoading && currDiagram && (
        <>
          <MermaidComp chart={openAiResp} desc={openAiRespDesc} />
          
        </>
      )}


    </div>
  );
}

export default GenArch;
