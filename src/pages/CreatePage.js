import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import StarsIcon from "@mui/icons-material/Stars";
import TornadoIcon from "@mui/icons-material/Tornado";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { styles } from "../styles";
import { Title } from "../components/Title";
// import defaultCharacterImg from "../images/default-character.png";
const defaultCharacterImg = "https://peculiar-project-images.s3.amazonaws.com/default-character.png"
const defaultLoopImg = "https://peculiar-project-images.s3.amazonaws.com/default-loop-image-crop.png"

export const CreatePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path, { replace: true });
  };

  const notMobile = useMediaQuery({ query: "(min-width: 900px" });

  return (
    <>
    <Title title="Add to the Peculiar world..."/>
    <Box sx={styles.flexContainer}>
      {/* CHARACTER stack */}
      <Stack sx={{ alignItems: "center" }}>
        {notMobile && (
          <Avatar
            alt="Miss Peregrine's Home for Peculiar Children book cover"
            src={defaultCharacterImg}
            variant="rounded"
            sx={{ width: "80%", height: "80%" }}
          />
        )}
        <Button
          variant="outlined"
          endIcon={<PersonAddAlt1Icon />}
          size="large"
          fullWidth={false}
          sx={styles.button}
          onClick={() => handleNavigation("/create/character")}
        >
          Character
        </Button>
      </Stack>
      {/* LOOP stack */}
      <Stack sx={{ alignItems: "center" }}>
        {notMobile && (
          <Avatar
            alt="Graphic of Florida with various printed images and doodles"
            src={defaultLoopImg}
            variant="rounded"
            sx={{ width: "80%", height: "80%" }}
          />
        )}
        <Button
          variant="outlined"
          endIcon={<TornadoIcon />}
          size="large"
          fullWidth={false}
          sx={styles.button}
          onClick={() => handleNavigation("/create/loop")}
        >
          Loop
        </Button>
      </Stack>
      {/* PECULIARITY stack */}
      <Stack sx={{ alignItems: "center" }}>
        {notMobile && (
          <Avatar
            alt="Miss Peregrine's Home for Peculiar Children book cover"
            src={defaultCharacterImg}
            variant="rounded"
            sx={{ width: "80%", height: "80%" }}
          />
        )}
        <Button
          variant="outlined"
          endIcon={<StarsIcon />}
          size="large"
          fullWidth={false}
          sx={styles.button}
          onClick={() => handleNavigation("/create/peculiarity")}
        >
          Peculiarity
        </Button>
      </Stack>
      
    </Box>
    </>
    
  );
};
