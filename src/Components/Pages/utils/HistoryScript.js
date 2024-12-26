import React, { useEffect } from 'react';
import {  useSelector } from 'react-redux';

import Loader from '../../Loader/loader';
import { TextField } from '@mui/material';



export default function HistoryScript() {
  // Set state variable with id on click of menu item
  // Use that state variable to render gen arch items here


  const { currHistoryArch, isLoading } = useSelector((state) => state.fetchGenArch);
  useEffect(() => {

  }, [currHistoryArch])

  return (


    <div>
      {isLoading && <Loader />}
      {!isLoading && currHistoryArch && (
        <>
          <h2>
            {currHistoryArch
              ? currHistoryArch.scriptType.charAt(0).toUpperCase() + currHistoryArch.scriptType.slice(1) + " Script for " + currHistoryArch.prompt
              : ""}
          </h2>
          <TextField
          style={{margin:"2%"}}
          InputProps={{
            readOnly: true,
          }}
            id="outlined-textarea"
            label="Script"
            placeholder="Script"
            defaultValue={currHistoryArch
                ? currHistoryArch.script:""}
        
            multiline
            fullWidth
          />

          
        </>
      )}



    </div>

  )
}
