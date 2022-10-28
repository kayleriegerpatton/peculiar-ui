import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { styles } from "../styles";
import { FormButton } from "./FormButton";
import { SnackbarMessage } from "./SnackbarMessage";
import { useMutation } from "@apollo/client";
import { CREATE_PECULIARITY } from "../mutations";
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";


export const LoopForm = () => {
  // tracks form success for success snackbar message
  const [formSuccess, setFormSuccess] = useState(false)

  const [statusValue, setStatusValue] = useState('Active');
  const [yearNotationValue, setYearNotationValue] = useState('C.E.');

  const [executeCreateLoop, { loading, error }] = useMutation(CREATE_PECULIARITY)

  const handleStatusChange = (event) => {
    setStatusValue(event.target.value);
  };

  const handleYearNotationChange = (event) => {
    setYearNotationValue(event.target.value);
  };

  const handleMonthChange = (event) => {
    setValue("loopMonth", event.target.value)
  };

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues:
    {
      loopCity: "",
      loopState: "",
      loopCountry: "",
      loopDate: "",
      loopMonth: "Unknown",
      loopYear: "",
      loopDescription: "",
      loopStatus: "Active",
      loopYearNotation: "C.E.",
    }
  })

  const onSubmit = async ({
    loopCity,
    loopState,
    loopCountry,
    loopDate,
    loopMonth,
    loopYear,
    loopYearNotation,
    loopDescription,
    loopStatus
  }) => {
    try {
      // get loop data
      // concatenate year + year notation
      const year = loopYear + " " + loopYearNotation
      console.log("transformed year:", year);

      const input = {
        // REQUIRED: description, status
        city: loopCity.trim(),
        state: loopState.trim(),
        country: loopCountry.trim(),
        day: loopDate.trim(),
        month: loopMonth,
        year: year,
        description: loopDescription.trim(),
        // ymbryne: ,
        status: loopStatus,
      }
      console.log("input:", input);
      // send mutation request
      // const { data } = await executeCreateLoop({
      //   variables: {
      //     input
      //   }
      // })

      // if(data){
      //   // show success message
      //   setFormSuccess(true)
      //   // reset form values
      //   setValue("city", "")
      // }
    } catch (err) {
      console.log(err);
    }
  }

  return <>
    <Box component="form"
      sx={styles.formWrapper}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* city */}
      <TextField
        margin="normal"
        id="loopCity"
        name="loopCity"
        label="City"
        variant="outlined"
        fullWidth
        {...register("loopCity", { required: false })}
      />

      {/* state */}
      <TextField
        margin="normal"
        id="loopState"
        name="loopState"
        label="State"
        variant="outlined"
        fullWidth
        {...register("loopState", { required: false })}
      />

      {/* country */}
      <TextField
        margin="normal"
        id="loopCountry"
        name="loopCountry"
        label="Country"
        variant="outlined"
        fullWidth
        {...register("loopCountry", { required: false })}
      />

      {/* date */}
      <TextField
        margin="normal"
        id="loopDate"
        name="loopDate"
        label="Day"
        variant="outlined"
        fullWidth
        {...register("loopDate", { required: false })}
      />

      {/* month */}
      <FormControl fullWidth margin="normal" >
        <TextField
          select
          id="loopMonth"
          name="loopMonth"
          defaultValue=""
          label="Month*"
          onChange={handleMonthChange}
          {...register("loopMonth", { required: false })}
          // helperText={errors.loopMonth?.message}
          // error={!!errors.loopMonth}
          rules={{ required: false }}
          variant="outlined"
        >
          <MenuItem value={"Unknown"}>Unknown</MenuItem>
          <MenuItem value={"January"}>January</MenuItem>
          <MenuItem value={"February"}>February</MenuItem>
          <MenuItem value={"March"}>March</MenuItem>
          <MenuItem value={"April"}>April</MenuItem>
          <MenuItem value={"May"}>May</MenuItem>
          <MenuItem value={"June"}>June</MenuItem>
          <MenuItem value={"July"}>July</MenuItem>
          <MenuItem value={"August"}>August</MenuItem>
          <MenuItem value={"September"}>September</MenuItem>
          <MenuItem value={"October"}>October</MenuItem>
          <MenuItem value={"November"}>November</MenuItem>
          <MenuItem value={"December"}>December</MenuItem>
        </TextField>
      </FormControl>

      {/* year */}

      <Box fullWidth sx={{ flexDirection: "row", display: "flex", alignSelf: "start" }}>
        <TextField
          margin="normal"
          fullWidth
          sx={{ width: "150px", marginRight: "1rem" }}
          id="loopYear"
          name="loopYear"
          label="Year"
          variant="outlined"
          {...register("loopYear", { required: false, pattern: /^\d{1,5}([s]?)$/gm })} // match at least 1 digit (e.g. 1500s)
          error={!!errors.loopYear}
          helperText={errors.loopYear ? "Year format is invalid. Year must be a number followed by an optional \"s\" (ex. 1500s)." : "Ex: 2020, 1500s."}
        />

        {/* year notation */}
        <FormControl fullWidth margin="normal" sx={{ width: "100px" }} >
          <TextField
            select
            
            id="loopYearNotation"
            name="loopYearNotation"
            defaultValue=""
            // label="Year Notation*"
            aria-labelledby="Year Notation"
            onChange={handleYearNotationChange}
            {...register("loopYearNotation", { required: false })}
            // helperText={errors.loopYearNotation?.message}
            // error={!!errors.loopYearNotation}
            rules={{ required: false }}
            variant="outlined"
          >
            <MenuItem value={"B.C.E."}>B.C.E.</MenuItem>
            <MenuItem value={"C.E."}>C.E.</MenuItem>
          </TextField>
        </FormControl>
      </Box>


      {/* description */}
      <TextField
        margin="normal"
        id="loopDescription"
        name="loopDescription"
        label="Description*"
        variant="outlined"
        helperText={errors.loopDescription ? "Description is required! Try taking a quote directly from its introduction in the book." : "Try taking a quote directly from its introduction in the book!"}
        fullWidth
        multiline
        minRows={5}
        {...register("loopDescription", { required: true, pattern: /^[a-zA-Z\d. -]+$/ })} // match any letter, number, period or dash
        error={!!errors.loopDescription}
        sx={{ marginBottom: '1rem' }}
      />

      {/* status */}
      <Box sx={{ alignSelf: 'flex-start', marginLeft: '0.85em' }}>
        <FormControl fullWidth>
          <FormLabel id="loop-status-radio-buttons-group">Status</FormLabel>
          <RadioGroup
            row
            aria-labelledby="loop-status-radio-buttons-group"
            name="loop-status-radio-buttons-group"
            value={statusValue}
            onChange={handleStatusChange}
          >
            <FormControlLabel value="Active" control={<Radio {...register("loopStatus")} />} label="Active" />
            <FormControlLabel value="Collapsed" control={<Radio {...register("loopStatus")} />} label="Collapsed" />
            <FormControlLabel value="Unknown" control={<Radio {...register("loopStatus")} />} label="Unknown" />
          </RadioGroup>
        </FormControl>
      </Box>

      {/* ymbryne */}

      <FormButton text="Create Loop" loading={loading} error={error} />

      {/* {formSuccess && <SnackbarMessage message="New peculiarity created." />} */}
    </Box>
  </>
}