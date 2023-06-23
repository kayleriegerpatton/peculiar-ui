import { useMutation } from "@apollo/client";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { CREATE_PECULIARITY } from "../mutations";
import { styles } from "../styles";
import { FormButton } from "./FormButton";
import { SnackbarMessage } from "./SnackbarMessage";

export const PeculiarityForm = () => {
  const [executeCreatePeculiarity, { loading, error }] =
    useMutation(CREATE_PECULIARITY);

  const [formSuccess, setFormSuccess] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: { peculiarityName: "", abilities: "" } });

  const onSubmit = async ({ peculiarityName, abilities }) => {
    try {
      const input = {
        name: peculiarityName.trim(), // required
        // only pass empty or populated array as input
        abilities: abilities === undefined ? [] : abilities.split(";").map((ability) => {
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
      // show fail message
      setFormSuccess(false)
    }
  };

  return (
    <Box
      component="form"
      sx={styles.formWrapper}
      onSubmit={handleSubmit(onSubmit)}
      formSuccess={setFormSuccess}
    >
      {formSuccess === true && <SnackbarMessage message="New peculiarity created." status="success" />}
      {error && <SnackbarMessage message="Failed to create peculiarity. Please try again." status="error" />}

      {/* name */}
      <TextField
        autoFocus
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
        {...register("abilities", { required: false })}
      />

      <FormButton text="Create Peculiarity" loading={loading} error={error} />

    </Box>
  );
};
