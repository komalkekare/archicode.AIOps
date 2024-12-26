import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, TextField, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTerraformScript,
} from "../../../store/thunks/openAi";
import {
  setTerraformScript,
  clearTerraformScript,
  setScriptType,
  setScriptPrompt,
  clearTriggerLambdaResp
} from "../../../store/actions/openAiSlice";

import Loader from "../../Loader/loader";



export default function GenScript() {
  const dispatch = useDispatch();
  const [terraformPrompt, setTerraformPrompt] = useState("");
  const [selectedScript, setSelectedScript] = useState("Terraform");
  const [updateScriptBtn, setupdateScriptBtn] = useState(false);
  const [isGenUpdateDisabled, setisGenUpdateDisabled] = useState(true);
  const [isGenScriptDisabled, setisGenScriptDisabled] = useState(false);
  const {
    openAiCloud,
    openAiCloudDesc,
    isCloudLoading,
    terraformScript,
    isTerraformLoading,
  } = useSelector((state) => state.openAi);


  const updateScript = () => {
    setupdateScriptBtn(true);
  }
  const handleChangeScript = (e) => {
    setSelectedScript(e.target.value);
  };

  const changeTerraform = (e) => {
    dispatch(setTerraformScript(e.target.value));
  };

  const getTerraformScript = () => {
    //dispatch(fetchTerraformScript(`${props.description} ${selectedCloud}`));
    dispatch(clearTerraformScript());
    dispatch(clearTriggerLambdaResp());
    dispatch(setScriptType(selectedScript));
    dispatch(setScriptPrompt(terraformPrompt));
    dispatch(
      fetchTerraformScript({ openAiCloudDesc, terraformPrompt, selectedScript })
    );
  };

  useEffect(() => {
    dispatch(clearTriggerLambdaResp());
    if(terraformPrompt && !isTerraformLoading){
      setisGenUpdateDisabled(false);
    }else{
      setisGenUpdateDisabled(true);
    }

    if(isTerraformLoading){
      setisGenScriptDisabled(true);
    }else{
      setisGenScriptDisabled(false);
    }
  
  }, [terraformScript, terraformPrompt, isTerraformLoading]);


  return (
    <div style={{ margin: "10ch", textAlign: "center" }}>
      <FormControl style={{ padding: 25, display: "flex" }}>
        <FormLabel id="demo-row-radio-buttons-group-label">
          <h3> Choose Script</h3>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={selectedScript}
          onChange={handleChangeScript}
        >
          <FormControlLabel
            value="Terraform"
            control={<Radio />}
            label="Terraform"
          />
          <FormControlLabel
            value="Ansible"
            control={<Radio />}
            label="Ansible"
          />
         
        </RadioGroup>
      </FormControl>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "70%" },
        }}
        noValidate
        autoComplete="on"
      >
        <Button
          size="medium"
          variant="contained"
          color="success"
          onClick={getTerraformScript}
          disabled={isGenScriptDisabled}
        >
          Generate Script
        </Button>
        <div>
          {isTerraformLoading && <Loader />}
          <TextField
            id="outlined-textarea"
            label="Script"
            placeholder="Script"
            value={terraformScript}
            onChange={changeTerraform}
            multiline
            fullWidth
          />
        </div>
        {terraformScript && (
            <div>
                 <Button
                    size="medium"
                    variant="contained"
                    color="success"
                    onClick={updateScript}
                  >
                    Update Script
                  </Button>
            </div>
        )}
        
        {updateScriptBtn && (
              <div>
                {" "}
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "70%" },
                    padding: "20px",
                  }}
                  noValidate
                  autoComplete="on"
                >
                  <div>
                    <TextField
                      id="outlined-textarea"
                      label="Required Script Modification"
                      placeholder="Required Script Modification"
                      onChange={(e) => setTerraformPrompt(e.target.value)}
                      value={terraformPrompt}
                      multiline
                    />
                  </div>
                  <Button
                    size="medium"
                    variant="contained"
                    color="success"
                    onClick={getTerraformScript}
                    disabled={isGenUpdateDisabled}
                  >
                    Generate Updated Script
                  </Button>
                </Box>
               
              </div>
            )}
      </Box>
    </div>
  );
}
