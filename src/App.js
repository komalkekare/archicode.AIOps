import React, { useEffect, useState } from "react";

import store from "./store/store";

import { Provider } from "react-redux";
import Navbar from "./Components/Header/nav";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/appRoutes';


function App() {

  
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  useEffect(() => {
 
    setToken(localStorage.getItem("authToken"));
  }, []);

  return (
    <Provider store={store}>
      <React.Fragment>
        <Router>
        <Navbar />
        <AppRoutes token={token}/>
        </Router>
      </React.Fragment>
    </Provider>
  );
}

export default App;
