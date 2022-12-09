import { FormButton } from "../components/FormButton";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Box from "@mui/material/Box";
import { Controller, useForm } from "react-hook-form";
import { styles } from "../styles";
import { CREATE_CHARACTER } from "../mutations";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Spinner } from "../components/Spinner";

import { CHARACTERS, PECULIARITIES, LOOPS, BOOKS } from "../queries";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const books = [
  { name: "Miss Peregrine's Home for Peculiar Children (2011)", id: 1 },
  { name: "Hollow City (2014)", id: 2 },
  { name: "Library of Souls (2015)", id: 3 },
  { name: "Tales of the Peculiar (2016)", id: 4 },
  { name: "A Map of Days (2018)", id: 5 },
  { name: "The Conference of the Birds (2020)", id: 6 },
  { name: "The Desolation of Devil's Acre (2021)", id: 7 },
  { name: "Miss Peregrine's Museum of Wonders (2022)", id: 8 },
];

export const CharacterForm = ()=>{

  const [showPeculiarities, setShowPeculiarities] = useState(false);
  const [showLoops, setShowLoops] = useState(false);

  //   const navigate = useNavigate();

  const [executeCreateCharacter, { loading, error }] =
    useMutation(CREATE_CHARACTER);

  const {
    data: characterData,
    loading: characterLoading,
    error: characterError,
  } = useQuery(CHARACTERS);

  const {
    data: booksData,
    loading: booksLoading,
    error: booksError,
  } = useQuery(BOOKS);

  const onSubmit = async ({
    characterName,
    species,
    peculiarity,
    imageUrl,
    status,
    homeLoop,
    books,
  }) => {
    try {
      console.log("Submit form");
      console.log("peculiarity:", peculiarity?.trim());
      const input = {
        //   REQUIRED: name, species, status
        name: characterName.trim(),
        species: species,
        peculiarity: peculiarity.trim(),
        imageUrl: imageUrl.trim(),
        status: status,
        homeLoop: homeLoop,
        //   books: books.map((book)=>book.id)
      };

      console.log(input);
      //   const { data } = await executeCreateCharacter({
      //     variables: {
      //       input: {
      //         name: characterName.trim(),
      //         species: species,
      //         peculiarity: peculiarity.trim(),
      //         imageUrl: imageUrl.trim(),
      //         status: status,
      //         homeLoop: homeLoop,
      //         books: books,
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm();

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


  return <Box
  component="form"
  sx={styles.formWrapper}
  onSubmit={handleSubmit(onSubmit)}
>
  {/* CHARACTER NAME */}

  {characterData && (
    <Autocomplete
      margin="normal"
      id="characterName"
      name="characterName"
      freeSolo
      fullWidth
      sx={{ ...styles.formFields }}
      {...register("characterName", { required: true })}
      options={characterData.characters.map((option) => option.name)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Full Name"
          error={!!errors.characterName}
          helperText={
            errors.characterName
              ? "Please enter the character's full name."
              : ""
          }
        />
      )}
    />
  )}

  {/* SPECIES */}
  <FormControl
    fullWidth
    required
    margin="dense"
    sx={{ ...styles.formFields, marginBottom: "-8px" }}
  >
    <InputLabel
      id="species"
      sx={{ ...styles.formFields, margin: "16px 0px" }}
    >
      Species
    </InputLabel>
    <Select
      id="species"
      label="Species"
      name="species"
      variant="outlined"
      fullWidth
      defaultValue={"Peculiar"}
      //   disabled={loading}
      {...register("species", { required: true })}
      sx={{ ...styles.formFields, margin: "16px 0px" }}
      onChange={async (event) => {
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
  </FormControl>

  {/* PECULIARITY */}
  {showPeculiarities &&
    !peculiaritiesLoading &&
    peculiaritiesData?.peculiarities && (
      <Autocomplete
        margin="normal"
        id="peculiarity"
        fullWidth
        sx={{ ...styles.formFields, margin: "14px 0px 6px" }}
        {...register("peculiarity", { required: false })}
        // error={!!errors.peculiarity}
        options={peculiaritiesData.peculiarities.map((option) => {
          return option.abilities.length
            ? option.name + " (" + option.abilities[0] + ")"
            : option.name;
        })}
        renderInput={(params) => (
          <TextField {...params} label="Peculiarity" />
        )}
      />
    )}

  {/* IMAGE URL */}
  <TextField
    margin="normal"
    id="imageUrl"
    label="Image URL"
    name="imageUrl"
    variant="outlined"
    fullWidth
    sx={{ ...styles.formFields }}
    {...register("imageUrl", { required: false })}
    // {...register("imageUrl", {
    //   pattern:
    //     /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    //   required: true,
    // })}
    // error={!!errors.imageUrl}
    // helperText={errors.imageUrl ? "Must contain a valid URL" : ""}
    disabled={loading}
  ></TextField>

  {/* STATUS */}
  <FormControl
    fullWidth
    margin="dense"
    sx={{ ...styles.formFields, marginBottom: "-8px", marginTop: "0px" }}
  >
    <InputLabel id="status" sx={{ margin: "16px 0px" }}>
      Status
    </InputLabel>
    <Select
      id="status"
      label="Status"
      name="status"
      variant="outlined"
      fullWidth
      {...register("status", { required: true })}
      //   disabled={loading}
      sx={{ ...styles.formFields, margin: "16px 0px" }}
      defaultValue={"Alive"}
    >
      <MenuItem value={"Alive"}>Alive</MenuItem>
      <MenuItem value={"Dead"}>Dead</MenuItem>
      <MenuItem value={"Unknown"}>Unknown</MenuItem>
    </Select>
  </FormControl>

  {/* HOME LOOP */}
  {showLoops && !loopsLoading && loopsData?.loops && (
    <Autocomplete
      margin="normal"
      id="homeLoop-autocomplete"
      fullWidth
      sx={{ ...styles.formFields, margin: "14px 0px 6px" }}
      {...register("homeLoop", { required: false })}
      options={loopsData.loops}
      //   getOptionLabel={(option) => option.city + ", " + option.year}
      onChange={(event, value) => {
        console.log(value.id);
      }}
      renderInput={(params) => (
        <TextField {...params} name="homeLoop" label="Loop" />
      )}
    />
  )}

  {/* BOOKS */}
  {/* <Autocomplete
  multiple
  fullWidth
  sx={{ ...styles.formFields, margin: "14px 0px 6px" }}
  id="books-checkboxes"
  options={books}
  disableCloseOnSelect
  getOptionLabel={(option) => option.name}
  renderOption={(props, option, { selected }) => (
    <li {...props} id={option.id}>
      <Checkbox
        icon={icon}
        checkedIcon={checkedIcon}
        style={{ marginRight: 8 }}
        checked={selected}
      />
      {option.name}
    </li>
  )}
  style={{ ...styles.formFields }}
  renderInput={(params) => <TextField {...params} label="Books" />}
  onChange={(event, values, reason) => {
    console.log("CLICKED");
    console.log(values);
  }}
/> */}

<FormButton loading={loading} error={error} text="Create Character"/>
</Box>
}