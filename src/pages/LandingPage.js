import { Button, IconButton, Stack } from "@mui/material";
import { Title } from "../components/Title";
import PublicIcon from '@mui/icons-material/Public';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

import { useAuth } from "../contexts/AppProvider";
import { styles } from "../styles";
import "./LandingPage.css"

export const LandingPage = () => {
  const { isLoggedIn, user, setUser, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    if (path === "dashboard") {
      navigate(`${user.id}/${path}`, { replace: true })
    } else {
      navigate(path, { replace: true });
    }
  };


  const mobile = useMediaQuery({ query: "(max-width: 749px" });
  return (
    <>
      <div className="landing-section-background">
        <div className="landing-container">
          <div className="landing-text">
            <h2 className="page-title">Extraordinary things began to happen...</h2>
            <p>Just when you thought your life would be nothing but ordinary. Discover the peculiar world created by Ransom Riggs in his Peculiar Children book series, where birds can be headmistresses, children may have powers, and adventure will take you to another place and time entirely. </p>
            <p> Nothing is as it seems.</p>

            {isLoggedIn ? <Button sx={styles.button} component="a" onClick={() => handleNavigation("create")}>Get Peculiar</Button> : <Button sx={styles.button} component="a" onClick={() => handleNavigation("about")}>Learn More</Button>}
          </div>
          {/* <div> */}
          <img alt="" src="https://picsum.photos/650/500"></img>
          {/* </div> */}
        </div>
      </div>

      <div className="join-container">
        <h2 className="page-title">Become Part of Peculiardom</h2>
        <Stack
          direction={mobile ? "column" : "row"}
          spacing={mobile ? 1 : 15}
          justifyContent="center">

          <Stack
            direction={mobile ? "row" : "column"}
            className="icon-stack"
            sx={{ textAlign: "center", alignItems: "center" }}>
            <PersonAddIcon className="round-icon" sx={{ fontSize: "3rem", borderRadius: "100px" }} />
            <p>Explore Characters</p>
          </Stack>

          <Stack
            direction={mobile ? "row" : "column"}
            className="icon-stack"
            sx={{ textAlign: "center", alignItems: "center" }}>
            <AddCircleOutlineIcon className="round-icon" sx={{ fontSize: "3rem", borderRadius: "100px" }} />
            <p>Custom Create</p>
          </Stack>

          <Stack
            direction={mobile ? "row" : "column"}
            className="icon-stack"
            sx={{ textAlign: "center", alignItems: "center" }}>
            <PublicIcon className="round-icon" sx={{ fontSize: "3rem", borderRadius: "100px" }} />
            <p>Discover Loops</p>
          </Stack>
        </Stack>

        {isLoggedIn ? <Button sx={styles.button} component="a" onClick={() => handleNavigation("create")}>Get Started</Button> : <Button sx={styles.button} component="a" onClick={() => handleNavigation("signup")}>Sign Up</Button>}

      </div>
    </>
  )
};
