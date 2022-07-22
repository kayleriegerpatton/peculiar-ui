import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import StarsIcon from "@mui/icons-material/Stars";
import TornadoIcon from "@mui/icons-material/Tornado";
import Box from "@mui/material/Box";

import { styles } from "../styles";

export const CreatePage = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant="outlined"
        endIcon={<PersonAddAlt1Icon />}
        size="large"
        sx={styles.button}
      >
        Character
      </Button>
      <Button variant="outlined" endIcon={<StarsIcon />} sx={styles.button}>
        Peculiarity
      </Button>
      <Button variant="outlined" endIcon={<TornadoIcon />} sx={styles.button}>
        Loop
      </Button>
    </Box>
  );
};
