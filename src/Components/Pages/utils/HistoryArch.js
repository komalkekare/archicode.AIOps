import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MermaidComp from './Mermaid';
import Loader from '../../Loader/loader';
import { fetchSingleGenArch } from '../../../store/thunks/genArch';


export default function HistoryArch() {
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
              ? currHistoryArch.prompt.charAt(0).toUpperCase() + currHistoryArch.prompt.slice(1)
              : ""}
          </h2>

          <MermaidComp chart={currHistoryArch ? currHistoryArch.arch : ""} desc={currHistoryArch.archDesc}/>
          
        </>
      )}



    </div>

  )
}
