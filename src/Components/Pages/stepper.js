import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";
import GenArch from "./ArchGenSteps.js/genArch";
import GenNativeArch from "./ArchGenSteps.js/genNativeArch";
import GenScript from "./ArchGenSteps.js/genScript";
import CommitDeploy from "./ArchGenSteps.js/commitDeploy";
import '../css/archGen.css';

const steps = ["Project Creation", "Choose The Questions"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [isDisabledNext, setisDisabledNext] = useState(true);
  const { archGenPrompt, openAiResp, openAiCloud, openAiRespDesc,terraformScript, isLoading } = useSelector(
    (state) => state.openAi
  );
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setisDisabledNext(true);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setisDisabledNext(false);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <GenArch />;
      case 1:
        return <GenNativeArch description={archGenPrompt}/>;
      case 2:
        return <GenScript/>;
      case 3:
        return <CommitDeploy/>;
    case 4:
        return;
      default:
        return null;
    }
  };

 useEffect(() => {
   if((openAiResp && (activeStep===0)) || (openAiCloud && (activeStep===1)) || (terraformScript && (activeStep===2))){
    setisDisabledNext(false);
   }
   else{
    setisDisabledNext(true)
   }
  
 }, [openAiResp, openAiCloud, terraformScript, activeStep])
 

  return (
    <Box className="archGen" sx={{ width: "100%", padding:"3%", margin:"4%"}}>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Generate Architecture</StepLabel>
        </Step>
        <Step>
          <StepLabel>Generate Cloud Architecture</StepLabel>
        </Step>
        <Step>
          <StepLabel>Generate Script</StepLabel>
        </Step>
        <Step>
          <StepLabel>Commit & Deploy</StepLabel>
        </Step>
      </Stepper>

      <div>
        {activeStep === 4 ? (
          <Typography>All steps completed - you're finished!</Typography>
        ) : (
          <div className="container m-5">{renderStepContent(activeStep)}</div>
        )}
        <div className="container m-5">
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" disabled={isDisabledNext} onClick={handleNext}>
            {activeStep === 4 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </Box>
  );
}
