// routes.js
import { Route, Routes } from 'react-router-dom';

import LandingPage from '../Components/Pages/landingPage';
import SignIn from '../Components/Pages/signin';
import ArchGen from '../Components/Pages/archGen';
import SignUp from '../Components/Pages/signup';

import HistoryPage from '../Components/Pages/historyPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



const AppRoutes = () => {

  const { userDetails } = useSelector(state => state.auth);
  const token = localStorage.getItem("authToken");

  useEffect(() => {

    
  }, [userDetails, token])
  
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/signin" element={<SignIn />} /> */}
      <Route path="/archgen" element={<ArchGen />} />
      {/* <Route path="/history" element={userDetails||token ? <HistoryPage />:<SignIn/>} /> */}
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
