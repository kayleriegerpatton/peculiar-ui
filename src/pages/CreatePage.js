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
  // query database to populate form field drop downs

  const onSubmit = async ({
    itemName,
    itemDescription,
    category,
    condition,
    price,
    quantity,
  }) => {
    try {
      //   const { data } = await executeCreateItem({
      //     variables: {
      //       input: {
      //         itemName: itemName.trim(),
      //         itemDescription: itemDescription.trim(),
      //         category: category.trim(),
      //         condition: condition.trim(),
      //         price: parseFloat(price),
      //         quantity: parseInt(quantity.trim(), 10),
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
    watch,
    control,
  } = useForm();
  return (
    <Box
      component="form"
      // sx={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Create page here</h1>
      {/* NEW CHARACTER; independent of new loop and peculiarity */}
      {/* CHARACTER NAME */}
      <TextField
        margin="normal"
        id="characterName"
        label="Full Name"
        name="characterName"
        variant="outlined"
        fullWidth
        autoFocus
        {...register("characterName", { required: true })}
        error={!!errors.characterName}
        // disabled={loading}
      ></TextField>

      {/* SPECIES */}
      <FormControl fullWidth>
        <InputLabel id="species" sx={{ margin: "16px 0px" }}>
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
          sx={{ margin: "16px 0px" }}
        >
          <MenuItem value={"Peculiar"}>Peculiar</MenuItem>
          <MenuItem value={"Wight"}>Wight</MenuItem>
          <MenuItem value={"Hollowgast"}>Hollowgast</MenuItem>
        </Select>
      </FormControl>

      {/* PECULIARITY TODO: Only appear if peculiar or wight species is selected */}
      <TextField
        margin="normal"
        id="peculiarity"
        label="Peculiarity"
        name="peculiarity"
        variant="outlined"
        fullWidth
        autoFocus
        {...register("peculiarity", { required: false })}
        error={!!errors.peculiarity}
        // disabled={loading}
      ></TextField>

      {/* IMAGE URL */}
      <TextField
        margin="normal"
        id="imageUrl"
        label="Image URL"
        name="imageUrl"
        variant="outlined"
        fullWidth
        autoFocus
        {...register("imageUrl", { required: false })}
        error={!!errors.imageUrl}
        // disabled={loading}
      ></TextField>

      {/* STATUS */}
      <FormControl fullWidth>
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

      {/* HOME LOOP TODO: only appear if peculiar species is selected */}
      <TextField
        margin="normal"
        id="homeLoop"
        label="Loop"
        name="homeLoop"
        variant="outlined"
        fullWidth
        autoFocus
        {...register("homeLoop", { required: false })}
        error={!!errors.homeLoop}
        // disabled={loading}
      ></TextField>

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

      {/* NEW PECULIARITY; independent of new loop, may be dependent on new character*/}
      {/* NEW LOOP; can be done without new character or new peculiarity */}
    </Box>
  );
};
