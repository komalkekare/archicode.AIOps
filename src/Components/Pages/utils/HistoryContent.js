import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HistoryArch from './HistoryArch';
import HistoryCloudArch from './HistoryCloudArch';
import HistoryScript from './HistoryScript';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGenArch } from '../../../store/thunks/genArch';
import { clearCurrHistoryArch, deleteSingleGenArch } from '../../../store/actions/genArchSlice';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function HistoryContent() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const { currHistoryArch } = useSelector((state) => state.fetchGenArch);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = () => {
    dispatch(deleteGenArch(currHistoryArch._id));
    dispatch(deleteSingleGenArch(currHistoryArch._id));
    dispatch(clearCurrHistoryArch());
  }

  useEffect(() => {
  

  }, [currHistoryArch])

  return (
    <>
    
    <Box sx={{ width: '100%' }}>
   
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Architecture Diagram" {...a11yProps(0)} />
          <Tab label="Cloud Native Architecture Diagram" {...a11yProps(1)} />
          <Tab label="Script" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Button
      color="success"
      size="medium"
      variant="contained"
      disabled={currHistoryArch?false:true}
      style={{left:"90%", marginTop:"1%"}}
      onClick={handleDelete}
    >
   Delete
  </Button>
      <CustomTabPanel value={value} index={0}>
        <HistoryArch/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <HistoryCloudArch/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <HistoryScript/>
      </CustomTabPanel>
    </Box>
    </>
  );
}