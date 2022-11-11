import { FormButton } from "../components/FormButton";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";

import { CREATE_CHARACTER } from "../mutations";
import { CHARACTERS } from "../queries";
import { styles } from "../styles";
import { SnackbarMessage } from "./SnackbarMessage";
import { useState } from "react";


export const CharacterForm = () => {
  // tracks form success for snackbar message
  const [formSuccess, setFormSuccess] = useState()

  const [executeCreateCharacter, { loading, error }] =
    useMutation(CREATE_CHARACTER);

  const {
    data: charactersData,
    loading: charactersLoading,
    error: charactersError,
  } = useQuery(CHARACTERS);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "",
      // species: "",
      // peculiarity: "",
      // imageUrl: "",
      // homeLoop: "",
      // books: [],
      // status: ""
    }
  })

  const onSubmit = async ({ fullName }) => {
    try {
      const input = {
        name: fullName.trim(),
      }
      console.log("input:", input);
      console.log(charactersData);
    } catch (error) {

    }

  }

  return <Box component="form"
    sx={styles.formWrapper}
    onSubmit={handleSubmit(onSubmit)}>

    {/* {formSuccess && <SnackbarMessage message="New character created." status="success" />}
    {formSuccess === false && <SnackbarMessage message="Failed to create character. Please try again." status="error" />} */}

    {/* fullName- autocomplete free entry */}
    {charactersData && < Autocomplete
      freeSolo
      fullWidth
      id="free-solo-2-demo"
      disableClearable
      options={charactersData.characters?.map((character, index) => character.name)}

      renderInput={(params) => (
        <TextField
          {...register("fullName", { required: true, message: "A unique character name is required.", pattern: /[a-zA-Z-'. ]+/ })} //match any number of letters, periods, spaces, and/or hyphens
          {...params}
          name="fullName"
          label="Full name"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          error={!!errors.fullName}
          helperText={errors.fullName ? "Name is required. Only letters and '.- characters are allowed." : ""}
        />
      )}
    />}



    {/* species- dropdown select from enum, Peculiar/Wight/Hollowgast*/}
    {/* peculiarity- autocomplete select from db */}
    {/* imageUrl- input */}
    {/* homeLoop-autocomplete select from db */}
    {/* books- multiselect from db */}
    {/* status- dropdown select from enum, Alive/Dead/Unknown */}
    <FormButton loading={loading} error={error} text="Create Character" />


    {/* <Autocomplete
      freeSolo
      fullWidth
      id="free-solo-demo"
      options={top100Films.map((option) => option.title)}

      renderInput={(params) => <TextField {...params} label="freeSolo" />}
    /> */}
  </Box>

}