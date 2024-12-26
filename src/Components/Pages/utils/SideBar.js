import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../css/sidebar.css';
import { fetchSingleGenArch } from '../../../store/thunks/genArch';
import Tooltip from '@mui/material/Tooltip';

const SideBar = () => {
  const { genArch, currHistoryArch } = useSelector((state) => state.fetchGenArch);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const dispatch = useDispatch();
  const handleMenuItemClick = (archId) => {
    dispatch(fetchSingleGenArch(archId));
    setSelectedItemId(archId);
  }


  useEffect(() => {

  }, [genArch])


  return (
    <div className="custom-menu">
      <h6 className="sidebar-header">Previous Generations</h6>
      <ul className="list-unstyled">
        {genArch.map(item => (
          <Tooltip key={item._id} title={item.prompt.charAt(0).toUpperCase() + item.prompt.slice(1)} placement="right-end">
          <li  className={`menu-item ${selectedItemId === item._id ? "selected" : ""}`} onClick={() => handleMenuItemClick(item._id)}>
            
            <span className="menu-item-text">{item.prompt.charAt(0).toUpperCase() + item.prompt.slice(1)}</span>
            
          </li>
          </Tooltip>
        ))}
      </ul>
    </div>

  );
};

export default SideBar;
