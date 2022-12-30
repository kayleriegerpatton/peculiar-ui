import Typography from "@mui/material/Typography";
import { styles } from "../styles";

export const Title = (props) => {
  return (
      <Typography sx={styles.title}>{props.title}</Typography>
  );
};
