import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive"
import { useState } from "react";

import { FormButton } from "../components/FormButton";
import { SnackbarMessage } from "./SnackbarMessage";
import { styles } from "../styles";
import { CREATE_CHARACTER } from "../mutations";
import { CHARACTERS, LOOPS, PECULIARITIES, BOOKS } from "../queries";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export const CharacterForm = () => {

  const isMobile = useMediaQuery({ query: "(max-width: 599px)" })

  // tracks form success for snackbar message
  const [formSuccess, setFormSuccess] = useState()

  const [species, setSpecies] = useState('')
  const [peculiarityId, setPeculiarityId] = useState()
  const [loopId, setLoopId] = useState()
  const [booksSelection, setBooksSelection] = useState([])
  console.log("booksSelection: ", booksSelection);

  const [showPeculiarities, setShowPeculiarities] = useState(false);
  const [showLoops, setShowLoops] = useState(false);

  const [executeCreateCharacter, { loading, error }] =
    useMutation(CREATE_CHARACTER);

  const {
    data: charactersData,
    loading: charactersLoading,
    error: charactersError,
  } = useQuery(CHARACTERS);

  const {
    data: booksData,
    loading: booksLoading,
    error: booksError,
  } = useQuery(BOOKS)

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
      // fullName: "",
      // species: "",
      // peculiarity: "",
      // imageUrl: "",
      // homeLoop: "",
      // books: [],
      // status: ""
    }
  })

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

  const onSubmit = async ({ fullName, species, peculiarStatus, imageUrl }) => {
    try {
      const input = {
        name: fullName.trim(), // required field
        species: species, // required field
        peculiarity: !!peculiarityId ? peculiarityId.replace(/["]+/g, '') : null, // remove duplicate double quotations around id number
        status: peculiarStatus, // required field
        homeLoop: !!loopId ? loopId.replace(/["]+/g, '') : null, // remove duplicate double quotations around id number
        imageUrl: !!imageUrl ? imageUrl.trim() : undefined,
        books: booksSelection.map((book) => book.id)

      }
      console.log("input:", input);
      const data = await executeCreateCharacter({
        variables: { input }
      })

      if (data) {
        setFormSuccess(true)
        // TODO: reset form
      }
    } catch (error) {
      console.log(error);
      setFormSuccess(false)
    }
  }

  return <Box component="form"
    sx={styles.formWrapper}
    onSubmit={handleSubmit(onSubmit)}
    formSuccess={setFormSuccess}>
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
          {...register("fullName", { required: true, pattern: /[a-zA-Z-'. ]+/ })} //match any number of letters, periods, spaces, and/or hyphens
          {...params}
          name="fullName"
          label="Full name *"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          error={!!errors.fullName}
          helperText={!!errors.fullName ? "Name is required. Only letters and '.- characters are allowed." : ""}
        />
      )}
    />}

    {/* species- dropdown select from enum, Peculiar/Wight/Hollowgast*/}
    <FormControl fullWidth sx={{ marginTop: "1.2rem" }}>
      <InputLabel id="species" error={!!errors.species} required>Species</InputLabel>
      <Select
        fullWidth
        labelId="species"
        label="Species"
        id="species-select"
        value={species}
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
      <FormHelperText error={!!errors.species} >{!!errors.species ? "Species is required." : ""}</FormHelperText>
    </FormControl>

    {/* peculiarity- autocomplete select from db */}
    {peculiaritiesData?.peculiarities && showPeculiarities && < Autocomplete
      sx={{ marginTop: 2 }}
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
          label="Peculiarity *"
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

    {/* imageUrl- input; optional */}
    <TextField
      margin="normal"
      id="image"
      label="Image URL"
      name="imageUrl"
      variant="outlined"
      fullWidth
      sx={{ marginTop: 2.5 }}
      {...register("imageUrl", {
        pattern:
          /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        required: false,
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
      getOptionLabel={(option) => formatLoops(option)}
      renderInput={(params) => (
        <TextField
          {...register("loop", { required: false })}
          {...params}
          name="loop"
          label="Loop"
          margin="normal"
          sx={{ marginTop: 1.5 }}
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        // error={!!errors.loop}
        // helperText={errors.loop ? "Loop is required." : ""}
        />
      )}
      onChange={(e, newValue) => {
        setLoopId(JSON.stringify(newValue.id))
      }}
    />}

    {/* books- multiselect from db */}
    {booksData?.books && <Autocomplete
      multiple
      id="books-checkboxes"
      fullWidth
      onChange={(e, newValue) => {
        setBooksSelection(newValue)
      }}
      options={booksData.books}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...register("books", { validate: (value) => { return booksSelection.length > 0 } })}
          {...params}
          label="Books *"
          margin="normal"
          variant="outlined"
          // onChange={onChange}
          // value={value}
          sx={{ marginTop: 1.5 }}
          error={!!errors.books}
          helperText={errors.books ? "Choose at least one book in which the character appears." : ""}
        />
      )}
    />}

    {/* status- dropdown select from enum, Alive/Dead/Unknown */}
    <Box sx={{ alignSelf: 'flex-start', marginTop: "1.4rem" }}>
      <FormControl error={!!errors.peculiarStatus}>
        <FormLabel id="peculiar-status-radio-buttons-group" required error={!!errors.peculiarStatus}>Status</FormLabel>
        {!isMobile && <RadioGroup
          row
          aria-labelledby="peculiar-status-radio-buttons-group"
          name="peculiar-status-radio-buttons-group"
          sx={{ marginLeft: '0.85em' }}
        >
          <FormControlLabel value="Alive" control={<Radio {...register("peculiarStatus", { required: true })} />} label="Alive" />
          <FormControlLabel value="Dead" control={<Radio {...register("peculiarStatus", { required: true, })} />} label="Dead" />
          <FormControlLabel value="Unknown" control={<Radio {...register("peculiarStatus", { required: true })} />} label="Unknown" />
        </RadioGroup>}
        {isMobile && <RadioGroup
          row
          aria-labelledby="peculiar-status-radio-buttons-group"
          name="peculiar-status-radio-buttons-group"
          sx={{ marginLeft: '0.85em', flexDirection: "column" }}
        >
          <FormControlLabel value="Alive" control={<Radio {...register("peculiarStatus", { required: true })} />} label="Alive" />
          <FormControlLabel value="Dead" control={<Radio {...register("peculiarStatus", { required: true, })} />} label="Dead" />
          <FormControlLabel value="Unknown" control={<Radio {...register("peculiarStatus", { required: true })} />} label="Unknown" />
        </RadioGroup>}
        <FormHelperText>{!!errors.peculiarStatus ? "Peculiar's status is required." : ""}</FormHelperText>
      </FormControl>
    </Box>

    <FormButton loading={loading} error={error} text="Create Character" />
  </Box>

}