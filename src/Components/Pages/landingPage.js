import React, { useEffect } from "react";
import LandingBg from "../../assets/bg.jpg";
import Cloud from "../../assets/cloud.png";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import '../css/landingPage.css';
import { clearCurrHistoryArch } from "../../store/actions/genArchSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearArchGenPrompt, clearOpenAiCloud, clearOpenAiResp, clearTerraformScript } from "../../store/actions/openAiSlice";




export default function LandingPage() {

  const { userDetails } = useSelector(state => state.auth);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleExploreMore = async () => {
    navigate("/archgen")
    // if(userDetails || token){
      
    // }else{
    //   navigate("/signin")
    // } 
  }
  useEffect(() => {
    dispatch(clearCurrHistoryArch());
    dispatch(clearArchGenPrompt());
    dispatch(clearOpenAiCloud());
    dispatch(clearOpenAiResp());
    dispatch(clearTerraformScript());

    
  }, [userDetails, token])

  return (
    <div
      style={{
        backgroundImage: `url(${LandingBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw', // Adjusted to 100vw
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center', // Vertically center content
      }}
    >
      <div className="container">
        <div className="row" style={{ padding: '6% 0%' }}>
          <div className="col-md-7 offset-md-5">
            <div
              className="card landingContent"
              style={{ width: '100%', maxWidth: '93%', minHeight: '550px' }}
            >
              <div className="card-body">
                <h1 style={{ textAlign: 'center', paddingTop: '2%', color: 'beige' }}>
                  BU-ArchiCode.AI
                </h1>
                <p style={{ color: 'beige', paddingTop: '1%' }}>
                  Experience the future of cloud architecture with BU-Archicode.AI – where innovation
                  meets automation, and Infrastructure deployment becomes an art of simplicity.
                </p>
                <hr style={{ color: 'beige', paddingBottom: '5%' }} />
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }}
                        src={Cloud}
                        alt="Cloud"
                      />
                    </div>
                    <div className="col-md-6">
                      <p style={{ color: 'beige' }}>
                        Archicode.AI can effortlessly design intricate cloud architectures,
                        automatically generate IAC code tailored to your specifications, and
                        seamlessly deploy your applications onto your chosen cloud platform.
                      </p>
                      {/* <Link to={userDetails||token ? "/archgen" : "/signin"} style={{ color: 'beige' }}> */}
                        <Button
                          color="success"
                          size="medium"
                          variant="contained"
                          style={{ marginTop: '1rem' }} // Adjusted margin
                          onClick={handleExploreMore}
                        >
                          Explore More
                        </Button>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
  );
}
