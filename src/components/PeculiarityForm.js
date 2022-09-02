import { useMutation } from "@apollo/client";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { CREATE_PECULIARITY } from "../mutations";
import { styles } from "../styles";
import { FormButton } from "./FormButton";

export const PeculiarityForm = () => {
  const [executeCreatePeculiarity, { loading, error }] =
    useMutation(CREATE_PECULIARITY);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm();

  const onSubmit = async ({ peculiarityName, abilities }) => {
    try {
      console.log("Submit form");
      const input = {
        //   REQUIRED: name
        name: peculiarityName.trim(),
        // abilities: abilities,
      };

      console.log(input);
      //   const { data } = await executeCreatePeculiarity({
      //     variables: {
      //       input: {
      //         name: peculiarityName.trim(),
      //         abilities: abilities,
      //       },
      //     },
      //   });
      //   if (data) {
      //     navigate("/marketplace", { replace: true });
      //   }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      component="form"
      sx={styles.formWrapper}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* name */}
      <TextField
        error={!!errors.peculiarityName}
        margin="normal"
        id="peculiarityName"
        name="peculiarityName"
        label="Peculiarity Name*"
        variant="outlined"
        // defaultValue="Peculiarity Name"
        helperText={errors.peculiarityName ? "Peculiarity must have a name." : ""}
        fullWidth
        {...register("peculiarityName", { required: true })}
        // sx={{...styles.formFields, color: 'red'}}
      />
      {/* abilities () */}
      <FormButton text="Create Peculiarity" loading={loading} error={error} />
    </Box>
  );
};
