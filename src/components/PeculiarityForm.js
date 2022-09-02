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
// TODO: handle when abilities is an empty string (don't pass to mutation)
      const input = {
        //   REQUIRED: name
        name: peculiarityName.trim(),
        abilities: abilities.split(";").map((ability) => {
          return ability.trim(); // split string of abilities by ";" & remove leading/trailing spaces
        }),
        
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
        helperText={
          errors.peculiarityName ? "Peculiarity must have a name." : ""
        }
        fullWidth
        {...register("peculiarityName", { required: true })}
        // sx={{...styles.formFields, color: 'red'}}
      />

      {/* abilities () */}
      <TextField
        error={!!errors.abilities}
        margin="normal"
        id="abilities"
        name="abilities"
        label="Abilities"
        variant="outlined"
        helperText={
          errors.abilities
            ? "There must be at least one ability."
            : "Describe all abilities using a semicolon (;) to separate each item."
        }
        fullWidth
        {...register("abilities", { required: false })}
        // sx={{...styles.formFields, color: 'red'}}
      />

      <FormButton text="Create Peculiarity" loading={loading} error={error} />
    </Box>
  );
};
