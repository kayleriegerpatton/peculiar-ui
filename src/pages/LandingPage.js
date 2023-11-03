import { Button, IconButton, Stack } from "@mui/material";
import { Title } from "../components/Title";
import PublicIcon from '@mui/icons-material/Public';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { styles } from "../styles";
import "./LandingPage.css"

export const LandingPage = () => {

  return (
    <>
      {/* <Title title="LANDING PAGE TITLE" /> */}
      <div className="landing-section-background">
        <div className="landing-container">
          <div className="landing-text">
            <h2 className="page-title">Extraordinary things began to happen...</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <Button sx={styles.button}>Get Peculiar</Button>
          </div>
          {/* <div> */}
            <img alt="" src="https://picsum.photos/650/500"></img>
          {/* </div> */}
        </div>
      </div>

      <div className="landing-container">
        <h2 className="page-title">Become Part of Peculiardom</h2>
        <Stack
          direction="row"
          spacing={20}
          justifyContent="center">
          <Stack>
            <PersonAddIcon sx={{ fontSize: "3rem" }} />
            <p>Explore Characters</p>
          </Stack>
          <Stack>
            <AddCircleOutlineIcon sx={{ fontSize: "3rem" }} />
            <p>Custom Create</p>
          </Stack>
          <Stack>
            <PublicIcon sx={{ fontSize: "3rem" }} />
            <p>Discover Loops</p>
          </Stack>
        </Stack>
      </div>
    </>
  )
};
