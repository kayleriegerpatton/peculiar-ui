import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styles } from "../styles";

export const LoopForm = () => {
  return <>
    <Box component="form"
      sx={styles.formWrapper}
    // onSubmit={handleSubmit(onSubmit)}
    >
{/* name */}
<TextField
        // error={!!errors.peculiarityName}
        margin="normal"
        id="peculiarityName"
        name="peculiarityName"
        label="Peculiarity Name*"
        variant="outlined"
        // helperText={errors.peculiarityName?.message}
        fullWidth
        // {...register("peculiarityName", { required: "Peculiarity must have a name." })}
      />
    </Box>
  </>
}