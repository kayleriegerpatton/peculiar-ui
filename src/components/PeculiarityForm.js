import { useMutation } from "@apollo/client";
import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { CREATE_PECULIARITY } from "../mutations";
import { styles } from "../styles";
import { useState } from "react";
import { FormButton } from "./FormButton";
import { SnackbarMessage } from "./SnackbarMessage";

export const PeculiarityForm = () => {
  const [executeCreatePeculiarity, { loading, error }] =
    useMutation(CREATE_PECULIARITY);
  const [formSuccess, setFormSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: { peculiarityName: "", abilities: "" } });

  const onSubmit = async ({ peculiarityName, abilities }) => {
    try {
      const input = {
        //   REQUIRED: name
        name: peculiarityName.trim(),
        // only pass empty or populated array as input
        abilities: abilities === undefined ? [] : abilities.split(";").map((ability) => {
          // split string of abilities by ";" & remove leading/trailing spaces
          return ability.trim()
        }),
      }

      const { data } = await executeCreatePeculiarity({
        variables: {
          input
        },
      });
      if (data) {
        // show success message
        setFormSuccess(true)
        // reset form values
        setValue("peculiarityName", "")
        setValue("abilities", "")
      }
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
        helperText={errors.peculiarityName?.message}
        fullWidth
        {...register("peculiarityName", { required: "Peculiarity must have a name." })}
      />

      {/* abilities () */}
      <TextField
        margin="normal"
        id="abilities"
        name="abilities"
        label="Abilities"
        variant="outlined"
        helperText="Describe all abilities using a semicolon (;) to separate each item."
        fullWidth
        {...register("abilities", {required: false})}
      />

      <FormButton text="Create Peculiarity" loading={loading} error={error} />

      {formSuccess && <SnackbarMessage message="New peculiarity created."/>}
    </Box>
  );
};
