import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { styles } from "../styles";

export const ImageCard = (props) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path, { replace: true });
  };
  const mobile = useMediaQuery({ query: "(max-width: 899px" });

  return <Stack sx={{ alignItems: "center" }}>
    {!mobile && (
      <Avatar
        alt={props.altText}
        src={props.image}
        variant="rounded"
        sx={{ width: "90%", height: "70%" }}
      />
    )}
    <Button
      variant="outlined"
      endIcon={props.endIcon}
      size="large"
      fullWidth={false}
      sx={styles.button}
      onClick={() => handleNavigation(props.navigate)}
    >
      {props.buttonText}
    </Button>
  </Stack>
}