import React, { useEffect} from 'react'
import SideBar from './utils/SideBar'
import { fetchGenArch } from '../../store/thunks/genArch'
import { useDispatch, useSelector } from 'react-redux'
import '../css/historyPage.css'; // Import your custom CSS file
import HistoryContent from './utils/HistoryContent';
import { clearCurrHistoryArch } from '../../store/actions/genArchSlice';
import { clearArchGenPrompt, clearOpenAiCloud, clearOpenAiResp, clearTerraformScript } from "../../store/actions/openAiSlice";

export default function HistoryPage() {
    const dispatch = useDispatch();
    const { currHistoryArch } = useSelector((state) => state.fetchGenArch);
    useEffect(() => {
      dispatch(clearArchGenPrompt());
      dispatch(clearOpenAiCloud());
      dispatch(clearOpenAiResp());
      dispatch(clearTerraformScript());
      dispatch(fetchGenArch());
    }, [currHistoryArch])
    
    return (
      <div className="content-container">
        <div>
          <SideBar />
        </div>
        <div className="content-area">
          <HistoryContent/>
        </div>
      </div>
    );
}
