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
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";


export const CharacterForm = () => {
  // tracks form success for snackbar message
  const [formSuccess, setFormSuccess] = useState()

  const [species, setSpecies] = useState('');
  const [peculiarityId, setPeculiarityId] = useState()
  const [loopId, setLoopId] = useState()

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

  const onSubmit = async ({ fullName, species, peculiarStatus, imageUrl }) => {
    try {
      const input = {
        name: fullName.trim(), // required field
        species: species, // required field
        // remove duplicate double quotations around id number
        peculiarity: !!peculiarityId ? peculiarityId.replace(/["]+/g, '') : null,
        status: peculiarStatus, // required field
        // remove duplicate double quotations around id number
        homeLoop: !!loopId ? loopId.replace(/["]+/g, '') : null,
        imageUrl: imageUrl.trim(),
      }

      const data = await executeCreateCharacter({
        variables: { input }
      })

      if (data) {
        setFormSuccess(true)
        // refresh form or whole page
      }
    } catch (error) {
      console.log(error);
      setFormSuccess(false)
    }
  }

  const formatLoops = (loopData) => {
    const options = []
    if (!!loopData.city) { options.push(loopData.city) }
    if (!!loopData.state) { options.push(loopData.state) }
    if (!!loopData.country) { options.push(loopData.country) }
    if (!!loopData.description) { options.push(loopData.description) }
    // return the first 1-2 items in array plus the year, truncating for potentially long descriptions
    return options[1] && !!loopData.year ? (options[0] + ", " + options[1] + ", " + loopData?.year).substring(0, 50)
      : options[1] ? (options[0] + ", " + options[1]).substring(0, 50)
        : options[0].substring(0, 50)
  }

  return <Box component="form"
    sx={styles.formWrapper}
    onSubmit={handleSubmit(onSubmit)}>

    {formSuccess && <SnackbarMessage message="New character created." status="success" />}
    {formSuccess === false && <SnackbarMessage message="Failed to create character. Please try again." status="error" />}

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
          label="Full name*"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          error={!!errors.fullName}
          helperText={errors.fullName ? "Name is required. Only letters and '.- characters are allowed." : ""}
        />
      )}
    />}

    <Box sx={{...styles.flexContainer, justifyContent: 'left'}}>
      {/* species- dropdown select from enum, Peculiar/Wight/Hollowgast*/}
      <FormControl sx={{ margin: "1.2rem 1rem 0rem 0rem", minWidth: 150 }}>
        <InputLabel id="species">Species*</InputLabel>
        <Select
        fullWidth
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
        sx={{minWidth: 500, marginLeft: 1}}
        fullWidth
        id="peculiarityName"
        disableClearable
        options={peculiaritiesData.peculiarities}
        getOptionLabel={option => option.abilities.length > 0 ? option.name + " (" + option.abilities[0] + ")" : option.name}
        renderInput={(params) => (
          <TextField
            {...register("peculiarityName", { required: true })}
            {...params}
            name="peculiarityName"
            label="Peculiarity*"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            error={!!errors.peculiarityName}
            helperText={errors.peculiarityName ? "Peculiarity name is required." : ""}
          />
        )}
        onChange={(e, newValue) => {
          setPeculiarityId(JSON.stringify(newValue.id))
        }}
      />}
    </Box>

    {/* imageUrl- input */}
    <TextField
      margin="normal"
      id="image"
      label="Image URL"
      name="imageUrl"
      variant="outlined"
      fullWidth
      sx={{ ...styles.formFields }}
      {...register("imageUrl", {
        pattern:
          /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        required: true,
      })}
      error={!!errors.imageUrl}
      helperText={errors.imageUrl ? "Must contain a valid URL." : ""}
      disabled={loading}
    ></TextField>

    {/* homeLoop-autocomplete select from db */}
    {loopsData?.loops && showLoops && < Autocomplete
      fullWidth
      id="loop"
      disableClearable
      options={loopsData.loops}
      // TODO: handle no city, etc.
      getOptionLabel={(option) => formatLoops(option)}
      renderInput={(params) => (
        <TextField
          {...register("loop", { required: false })}
          {...params}
          name="loop"
          label="Loop*"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
      onChange={(e, newValue) => {
        setLoopId(JSON.stringify(newValue.id))
      }}
    />}

    {/* books- multiselect from db */}

    {/* status- dropdown select from enum, Alive/Dead/Unknown */}
    <Box sx={{ alignSelf: 'flex-start', marginTop: "1.4rem" }}>
      <FormControl error={!!errors.peculiarStatus}>
        <FormLabel id="peculiar-status-radio-buttons-group" error={!!errors.peculiarStatus}>Status*</FormLabel>
        <RadioGroup
          row
          aria-labelledby="peculiar-status-radio-buttons-group"
          name="peculiar-status-radio-buttons-group"
          // onChange={handlePeculiarStatusChange}
          sx={{ marginLeft: '0.85em' }}
        >
          <FormControlLabel value="Alive" control={<Radio {...register("peculiarStatus", { required: true })} />} label="Alive" />
          <FormControlLabel value="Dead" control={<Radio {...register("peculiarStatus", { required: true, })} />} label="Dead" />
          <FormControlLabel value="Unknown" control={<Radio {...register("peculiarStatus", { required: true })} />} label="Unknown" />
        </RadioGroup>
        <FormHelperText>{!!errors.peculiarStatus ? "Peculiar's status is required." : ""}</FormHelperText>
      </FormControl>
    </Box>

    <FormButton loading={loading} error={error} text="Create Character" />
  </Box>

}