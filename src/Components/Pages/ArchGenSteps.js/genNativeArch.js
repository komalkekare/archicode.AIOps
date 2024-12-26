import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, TextField, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MermaidComp from "../utils/Mermaid";

import {
  fetchFromOpenAiCloud,
  fetchTerraformScript,
} from "../../../store/thunks/openAi";
import {
  setTerraformScript,
  clearOpenAiCloud,
  clearTerraformScript,
  setScriptType,
  setCloudType,

} from "../../../store/actions/openAiSlice";
import Loader from "../../Loader/loader";
import Modal from "../utils/ConfirmationModal";

export default function GenNativeArch(props) {
  const dispatch = useDispatch();
  const [terraformPrompt, setTerraformPrompt] = useState("");
  const [selectedCloud, setSelectedCloud] = useState("AWS");
  const [selectedScript, setSelectedScript] = useState("Terraform");
  const [isGenNativeDisabled, setisGenNativeDisabled] = useState(false);
  const {
    openAiCloud,
    openAiCloudDesc,
    isCloudLoading,
    terraformScript,
    isTerraformLoading,
  
  } = useSelector((state) => state.openAi);
  const [currCloudDiagram, setCurrCloudDiagram] = useState(false);

  const handleChangeCloud = (e) => {
    setSelectedCloud(e.target.value);
  };



  const generateCloudArch = () => {
    const prompt = `${props.description} ${selectedCloud}`;
    dispatch(setCloudType(selectedCloud));
    dispatch(clearOpenAiCloud());
    dispatch(clearTerraformScript());
    dispatch(fetchFromOpenAiCloud(prompt));
  };

  const getTerraformScript = () => {
    //dispatch(fetchTerraformScript(`${props.description} ${selectedCloud}`));
    dispatch(clearTerraformScript());
    dispatch(setScriptType(selectedScript));
    dispatch(
      fetchTerraformScript({ openAiCloudDesc, terraformPrompt, selectedScript })
    );
  };

  useEffect(() => {
    if (openAiCloud) {
      setCurrCloudDiagram(true);
    }

    if(isCloudLoading){
      setisGenNativeDisabled(true);
    }else{
      setisGenNativeDisabled(false);
    }
  }, [openAiCloud, terraformScript, isCloudLoading]);

  return (
    <>
      <div style={{ margin: "10ch", textAlign: "center" }}>
        <FormControl style={{ padding: 25, display: "flex" }}>
          <FormLabel id="demo-row-radio-buttons-group-label">
            <h3> Choose Cloud Platform</h3>
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={selectedCloud}
            onChange={handleChangeCloud}
          >
            <FormControlLabel value="AWS" control={<Radio />} label="AWS" />
            <FormControlLabel value="Azure" control={<Radio />} label="Azure" />
            <FormControlLabel value="GCP" control={<Radio />} label="GCP" />
          </RadioGroup>
        </FormControl>
        <Button
          color="success"
          variant="contained"
          size="small"
          onClick={generateCloudArch}
          disabled={isGenNativeDisabled}
        >
          Generate Architecture for {selectedCloud}
        </Button>

        {openAiCloud && (
          <MermaidComp chart={openAiCloud} desc={openAiCloudDesc} />
        )}
        {isCloudLoading && <Loader />}
        {!isCloudLoading && currCloudDiagram && (
          <div>
            {/* <div style={{ margin: "10ch", textAlign: "center" }}>
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
                  <FormControlLabel
                    value="Puppet"
                    control={<Radio />}
                    label="Puppet"
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
                >
                  Generate Script
                </Button>
                <div>
                  {isTerraformLoading && <Loader />}
                  <TextField
                    id="outlined-textarea"
                    label="Terraform"
                    placeholder="Terraform Script"
                    defaultValue={terraformScript}
                    onBlur={changeTerraform}
                    multiline
                    fullWidth
                  />
                </div>
              </Box>
            </div> */}
{/* 
            {terraformScript && (
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
                      label="Enter text to search flow"
                      placeholder="enter description"
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
                  >
                    Generate Updated Script
                  </Button>
                </Box>
                <Modal />
              </div>
            )} */}
          </div>
        )}
      </div>
    </>
  );
}
