import Typography from "@mui/material/Typography";
import { styles } from "../styles";

export const RequiredNote = ()=>{
  return <Typography sx={styles.note}><span style={{color: 'red'}}>*</span> Indicates a required field.</Typography>
}