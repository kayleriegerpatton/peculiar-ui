import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";

import { FormButton } from "../components/FormButton";
import { CREATE_CHARACTER } from "../mutations";
import { CHARACTERS, LOOPS, PECULIARITIES } from "../queries";
import { styles } from "../styles";
import { SnackbarMessage } from "./SnackbarMessage";
import { useState } from "react";


export const CharacterForm = () => {
  // tracks form success for snackbar message
  const [formSuccess, setFormSuccess] = useState()

  const [species, setSpecies] = useState('');
  const [peculiarityId, setPeculiarityId] = useState()
  const [showPeculiarities, setShowPeculiarities] = useState(false);
  const [showLoops, setShowLoops] = useState(false);

  const [executeCreateCharacter, { loading, error }] =
    useMutation(CREATE_CHARACTER);

  const {
    data: charactersData,
    loading: charactersLoading,
    error: charactersError,
  } = useQuery(CHARACTERS);

  const [
    executeGetPeculiarities,
    {
      data: peculiaritiesData,
      loading: peculiaritiesLoading,
      error: peculiaritiesError,
    },
  ] = useLazyQuery(PECULIARITIES);

  const [
    executeGetLoops,
    { data: loopsData, loading: loopsLoading, error: loopsError },
  ] = useLazyQuery(LOOPS);

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

  // const handleSpeciesChange = (event) => {
  //   setSpecies(event.target.value);
  // };

  const onSubmit = async ({ fullName, species }) => {
    try {
      const input = {
        name: fullName.trim(),
        species: species,
        peculiarity: peculiarityId,
      }
      console.log("input:", input);
    } catch (error) {

    }

  }

  return <Box component="form"
    sx={styles.formWrapper}
    onSubmit={handleSubmit(onSubmit)}>

    {/* {formSuccess && <SnackbarMessage message="New character created." status="success" />}
    {formSuccess === false && <SnackbarMessage message="Failed to create character. Please try again." status="error" />} */}

    {/* fullName */}
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
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="species">Species</InputLabel>
      <Select
        labelId="species"
        id="species-select"
        value={species}
        // onChange={handleSpeciesChange}
        {...register("species", { required: true })}
        onChange={async (event) => {
          setSpecies(event.target.value)
          if (event.target.value === "Peculiar") {
            await executeGetPeculiarities();
            await executeGetLoops();

            setShowPeculiarities(true);
            setShowLoops(true);
          } else if (event.target.value === "Wight") {
            await executeGetPeculiarities();
            setShowPeculiarities(true);
          } else {
            setShowPeculiarities(false);
          }
        }}
      >
        <MenuItem value={"Peculiar"}>Peculiar</MenuItem>
        <MenuItem value={"Wight"}>Wight</MenuItem>
        <MenuItem value={"Hollowgast"}>Hollowgast</MenuItem>
      </Select>
      <FormHelperText error={!!errors.species} >Species is required.</FormHelperText>
    </FormControl>

    {/* peculiarity- autocomplete select from db */}
    {peculiaritiesData?.peculiarities && showPeculiarities && < Autocomplete
      fullWidth
      id="peculiarityName"
      disableClearable
      options={peculiaritiesData.peculiarities}
      getOptionLabel={option => option.abilities.length > 0 ? option.name + " (" + option.abilities[0] + ")" : option.name}
      renderInput={(params) => (
        <TextField
          {...register("peculiarityName", { required: true, message: "A unique peculiarity name is required.", pattern: /[a-zA-Z-'. ]+/ })} //match any number of letters, periods, spaces, apostrophes, and/or hyphens
          {...params}
          name="peculiarityName"
          label="Peculiarity"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          error={!!errors.peculiarityName}
          helperText={errors.peculiarityName ? "Peculiarity name is required. Only letters and '.- characters are allowed." : ""}
        />
      )}
      onChange={(e, newValue) => {
        setPeculiarityId(JSON.stringify(newValue.id))
      }}
    />}

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