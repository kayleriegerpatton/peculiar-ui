import { Button, IconButton, Stack } from "@mui/material";
import { Title } from "../components/Title";
import PublicIcon from '@mui/icons-material/Public';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const LandingPage = () => {

  return (
    <>
      <Title title="LANDING PAGE TITLE" />
      <div className="landing-section-background">
        <div className="landing-container">
          <h2>Extraordinary things began to happen...</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <Button>Get peculiar</Button>
        </div>
        <div>
          <img alt="" src="https://peculiar-project-assets.s3.eu-west-1.amazonaws.com/ymbryne-council-symbol.jpeg"></img>
        </div>
      </div>

      <div className="landing-container">
        <h2>Become Part of Peculiardom</h2>
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
