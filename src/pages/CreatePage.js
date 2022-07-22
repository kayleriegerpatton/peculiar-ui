import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import StarsIcon from "@mui/icons-material/Stars";
import TornadoIcon from "@mui/icons-material/Tornado";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import { styles } from "../styles";

export const CreatePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path, { replace: true });
  };

  return (
    <Box sx={styles.flexContainer}>
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
      <Button
        variant="outlined"
        endIcon={<StarsIcon />}
        fullWidth={false}
        sx={styles.button}
        onClick={() => handleNavigation("/create/peculiarity")}
      >
        Peculiarity
      </Button>
      <Button
        variant="outlined"
        endIcon={<TornadoIcon />}
        fullWidth={false}
        sx={styles.button}
        onClick={() => handleNavigation("/create/loop")}
      >
        Loop
      </Button>
    </Box>
  );
};
