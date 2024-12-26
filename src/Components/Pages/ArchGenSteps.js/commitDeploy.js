import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AWS from "aws-sdk";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ConfirmationModal from "../utils/ConfirmationModal";
import { saveGenArch } from "../../../store/thunks/genArch";
import Success from "../../../assets/success1.gif"
import { setTriggerLambdaResp } from "../../../store/actions/openAiSlice";
import { deployScript } from "../../../store/thunks/openAi";


export default function CommitDeploy() {
  const dispatch = useDispatch();
  const { triggerLambdaResp, archGenPrompt, openAiResp,openAiRespDesc,openAiCloudDesc, openAiCloud,cloudType, terraformScript, scriptType, scriptPrompt } = useSelector((state) => state.openAi);
  const [open, setOpen] = React.useState(true);
  const [fileName, setFileName] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDeployDisabled, setisDeployDisabled] = useState(true);
  const [commitResp, setCommitResp] = useState(false);
  const [lambdaResp, setlambdaResp] = useState(null);
  const [saving, setSaving] = useState(false);

  AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  });

  const s3 = new AWS.S3();
  const lambda = new AWS.Lambda({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: "us-east-1",
  });

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const run = async () => {
    await sleep(5000); // Sleep for 5 seconds (5000 milliseconds)
  };

  // Function to trigger Lambda function
  const triggerLambda = async (lambdaFunctionName) => {
    let path = "";
    if (scriptType === "Ansible") {
      path = "ansible/" + fileName + ".yaml";
    } else if (scriptType === "Puppet") {
      path = "puppet/" + fileName + ".pp";
    } else {
      path = "terraform/" + fileName + ".tf";
    }

    const params = {
      FunctionName: lambdaFunctionName,
      InvocationType: "Event",
      Payload: JSON.stringify({
        param1: "IAC_Commit_Feature",
        param3: "ArchGen.AIOps",
        param2: path,
        param4: process.env.Pat,
        param5: "brillio-Oneai",
        param6: path,
        param7: commitMessage,
        param8: "Text.txt",
      }),
    };
    try {
      const response = await lambda.invoke(params).promise();
     
      
      if(response){
   
        setlambdaResp(response);
        dispatch(setTriggerLambdaResp(response));
        setCommitResp(true);
        setIsDisabled(false)
      }
      setCommitMessage("");
      setFileName("");
      // Handle the response from the Lambda function if needed
    } catch (error) {
      console.error("Failed to trigger Lambda function:", error);
      // Handle the error if the Lambda function invocation fails
    }
  };

  // Fucntion to Upload terraform script to S3
  const upload = async (terraformScript) => {
    try {
      const parsedData = terraformScript;
  
      const params = {
        Bucket: "testbucketarchv1",
        Key: "Text.txt",
        Body: parsedData,
      };

      try {
        const data = await s3.upload(params).promise();
      } catch (err) {
        console.error("Error uploading file:", err);
      }

      await run();
      triggerLambda("pushcodetorepo");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle confirm to Deploy
  const handleCommit = () => {

    setIsDisabled(true);
    setOpen(false);
    upload(terraformScript);
  };

  const handleDeploy = () => {
    dispatch(deployScript());
  }

  const handleClose = () => {
    setOpen(false);
    setCommitMessage("");
    setFileName("");
  };

  const handleSaveArch = () => {
    dispatch(saveGenArch({
      prompt: archGenPrompt,
      arch: openAiResp,
      archDesc: openAiRespDesc,
      cloudType: cloudType,
      nativeArch: openAiCloud,
      nativeArchDesc: openAiCloudDesc,
      scriptType: scriptType,
      scriptPrompt: scriptPrompt,
      script: terraformScript
    }));
    setSaving(true);
  }

  useEffect(() => {
    if (commitMessage && fileName) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    // if(lambdaResp){

    // }
    if(triggerLambdaResp){

      setisDeployDisabled(false)
      setIsDisabled(false);
    }else{
   
      setisDeployDisabled(true)
    }
  }, [fileName, commitMessage, commitResp, triggerLambdaResp]);

  return (
    
    <div style={{ margin: "10ch", textAlign: "center" }}>
        <ConfirmationModal isOpen={triggerLambdaResp?true:false}/>
     
      {saving && <div>
        <div>
          <h3>SAVED</h3>
        </div>
     <img src={Success}/>
      </div>
    }
      
      <Button
          onClick={handleSaveArch}
          size="medium"
          variant="contained"
          color="success"
          autoFocus
          style={{margin:"5%"}}
        >
          Save Generated Architecture & Script
        </Button>
      <Box
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="File Name"
              defaultValue={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Commit Message"
              defaultValue={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
            />
          </div>
        </Box>

        <Button
          onClick={handleCommit}
          size="medium"
          variant="contained"
          color="success"
          autoFocus
          disabled={isDisabled}
          style={{margin:"5%"}}
        >
          Commit
        </Button>
        <Button
          onClick={handleDeploy}
          size="medium"
          variant="contained"
          color="success"
          autoFocus
          disabled={isDeployDisabled}
          style={{margin:"5%"}}
        >
          Deploy
        </Button>
      </Box>
    </div>
  );
}
