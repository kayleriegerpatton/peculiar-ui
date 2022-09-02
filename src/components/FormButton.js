import LoadingButton from "@mui/lab/LoadingButton";
import { styles } from "../styles";
import ErrorIcon from "@mui/icons-material/Error";

export const FormButton = (props) => {
  return (
    <LoadingButton
      loading={props.loading}
      loadingIndicator="Loading..."
      variant="contained"
      type="submit"
      sx={props.loading ? styles.loadingButton : { ...styles.loadingButton, mt: 2 }}
      startIcon={props.error && <ErrorIcon />}
      color={props.error ? "error" : "primary"}
    >
      {props.text}
    </LoadingButton>
  );
};
