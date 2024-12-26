import React, { useEffect } from "react";
import { AppBar, Toolbar, Box, IconButton, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import BrillioLogo from "../../assets/BrillioLogo.png";
import Typography from "@mui/material/Typography";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.auth);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#211747", // Replace with your desired color
      },
    },
  });

  const token = localStorage.getItem("authToken");
  const location = useLocation();
  const navigate = useNavigate();

  const isSignInPage = location.pathname === "/signin";

  const buttonText = isSignInPage ? "Sign Up" : "Sign In";
  const linkPath = isSignInPage ? "/signup" : "/signin";

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/signin");
  };

  useEffect(() => {
    
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Link className="navLink" to="/">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              ></IconButton>

              {/* <img src={BrillioLogo} alt="Logo" style={{ height: "35px" }} /> */}
            </Link>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />

            {userDetails||token ? (
              <>
                <Link
                  className="navLink"
                  to="/"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginRight: "2%",
                  }}
                >
                  <Button color="inherit" variant="outlined">
                    Home
                  </Button>
                </Link>
                <Button
                  color="inherit"
                  variant="outlined"
                  style={{ marginRight: "2%" }}
                >
                  <Link
                    className="navLink"
                    to="/archgen"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Generate Architecture
                  </Link>
                </Button>

                <Link
                  className="navLink"
                  to="/history"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginRight: "2%",
                  }}
                >
                  <Button color="inherit" variant="outlined">
                    History
                  </Button>
                </Link>
                <Link
                  className="navLink"
                  to="/"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <Button
                    color="inherit"
                    onClick={handleSignOut}
                    variant="outlined"
                  >
                    Sign Out
                  </Button>
                </Link>
              </>
            ) : (
              <>
              <Link
                  className="navLink"
                  to="/"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginRight: "2%",
                  }}
                >
                  <Button color="inherit" variant="outlined">
                    Home
                  </Button>
                </Link>
              <Link
                className="navLink"
                to={linkPath}
                style={{ color: "white", textDecoration: "none" }}
              >
                <Button color="inherit" variant="outlined">
                  {buttonText}
                </Button>
              </Link>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
