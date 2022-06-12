import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";
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

import { CHARACTERS, PECULIARITIES, LOOPS } from "../queries";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { margin } from "@mui/system";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const books = [
  "Miss Peregrine's Home for Peculiar Children (2011)",
  "Hollow City (2014)",
  "Library of Souls (2015)",
  "Tales of the Peculiar (2016)",
  "A Map of Days (2018)",
  "The Conference of the Birds (2020)",
  "The Desolation of Devil's Acre (2021)",
  "Miss Peregrine's Museum of Wonders (2022)",
];

export const CreatePage = () => {
  const [showPeculiarities, setShowPeculiarities] = useState(false);

  const navigate = useNavigate();

  const [executeCreateCharacter, { loading, error }] =
    useMutation(CREATE_CHARACTER);

  const {
    data: characterData,
    loading: characterLoading,
    error: characterError,
  } = useQuery(CHARACTERS);

  const {
    data: loopData,
    loading: loopLoading,
    error: loopError,
  } = useQuery(LOOPS);

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
      //   const input = {
      //     name: characterName.trim(),
      //     species: species,
      //     peculiarity: peculiarity.trim(),
      //     imageUrl: imageUrl.trim(),
      //     status: status,
      //     homeLoop: homeLoop,
      //     books: books,
      //   };

      //   console.log(input);
      const { data } = await executeCreateCharacter({
        variables: {
          input: {
            name: characterName.trim(),
            species: species,
            peculiarity: peculiarity.trim(),
            imageUrl: imageUrl.trim(),
            status: status,
            homeLoop: homeLoop,
            books: books,
          },
        },
      });
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
    watch,
    control,
  } = useForm();
  const [
    executeGetPeculiarities,
    {
      data: peculiarityData,
      loading: peculiarityLoading,
      error: peculiarityError,
    },
  ] = useLazyQuery(PECULIARITIES);

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {characterLoading && <Spinner />}
      <h1>Create page here</h1>
      {/* NEW CHARACTER; independent of new loop and peculiarity */}
      {/* CHARACTER NAME */}
      {characterData && (
        <Autocomplete
          margin="normal"
          id="characterName"
          freeSolo
          fullWidth
          sx={styles.formFields}
          {...register("characterName", { required: true })}
          error={!!errors.characterName}
          options={characterData.characters.map((option) => option.name)}
          renderInput={(params) => <TextField {...params} label="Full Name" />}
        />
      )}

      {/* SPECIES */}
      <FormControl
        fullWidth
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
          {...register("species", { required: true })}
          error={!!errors.species}
          //   disabled={loading}
          sx={{ ...styles.formFields, margin: "16px 0px" }}
          onChange={async (event) => {
            //   if event value is "Peculiar" or "Wight", query peculiarity data & display additional form fields
            if (
              event.target.value === "Peculiar" ||
              event.target.value === "Wight"
            ) {
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
        !peculiarityLoading &&
        peculiarityData?.peculiarities && (
          <Autocomplete
            margin="normal"
            id="peculiarity"
            freeSolo
            fullWidth
            sx={{ ...styles.formFields, margin: "14px 0px 6px" }}
            {...register("peculiarity", { required: false })}
            error={!!errors.peculiarity}
            options={peculiarityData.peculiarities.map((option) => {
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
        sx={styles.formFields}
        {...register("imageUrl", { required: false })}
        error={!!errors.imageUrl}
        // disabled={loading}
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
          error={!!errors.status}
          //   disabled={loading}
          sx={{ margin: "16px 0px" }}
        >
          <MenuItem value={"Alive"}>Alive</MenuItem>
          <MenuItem value={"Dead"}>Dead</MenuItem>
          <MenuItem value={"Unknown"}>Unknown</MenuItem>
        </Select>
      </FormControl>
      {showPeculiarities &&
        !peculiarityLoading &&
        peculiarityData?.peculiarities && (
          /* HOME LOOP TODO: only appear if peculiar species is selected */
          <TextField
            margin="normal"
            id="homeLoop"
            label="Loop"
            name="homeLoop"
            variant="outlined"
            fullWidth
            sx={styles.formFields}
            {...register("homeLoop", { required: false })}
            error={!!errors.homeLoop}
            // disabled={loading}
          ></TextField>
        )}

      {/* BOOKS */}
      <Controller
        control={control}
        name="books"
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            fullWidth
            options={books}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Books"
                margin="normal"
                variant="outlined"
                onChange={onChange}
                value={value}
              />
            )}
            onChange={(event, values, reason) => onChange(values)}
            value={value || []}
          />
        )}
      />

      <LoadingButton
        loading={loading}
        loadingIndicator="Loading..."
        variant="contained"
        type="submit"
        sx={loading ? styles.loadingButton : { ...styles.postButton, mt: 2 }}
        startIcon={error && <ErrorIcon />}
        color={error ? "error" : "primary"}
      >
        Create Character
      </LoadingButton>
    </Box>
  );
};
