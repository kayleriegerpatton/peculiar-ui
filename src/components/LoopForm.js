import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import { useForm } from "react-hook-form";
import { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import { useMutation, useQuery } from "@apollo/client";

import { FormButton } from "./FormButton";
import { SnackbarMessage } from "./SnackbarMessage";
import { styles } from "../styles";
import { CREATE_PECULIARITY } from "../mutations";
import { YMBRYNES } from "../queries";

export const LoopForm = () => {
  // tracks form success for success snackbar message
  const [formSuccess, setFormSuccess] = useState(false)

  const [statusValue, setStatusValue] = useState('Active');
  const [yearNotationValue, setYearNotationValue] = useState('C.E.');

  const {
    data: ymbrynesData,
    loading: ymbrynesLoading,
    error: ymbrynesError,
  } = useQuery(YMBRYNES);

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

  const handleYmbryneChange = (event) => {
    setValue("ymbryne", event.target.value)
  }

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
      ymbryne: ""
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
    loopStatus,
    ymbryne,
  }) => {
    try {
      // concatenate year + year notation, normalize for empty year value
      const year = loopYear.length < 1 ? loopYearNotation : loopYear + " " + loopYearNotation

      const input = {
        city: loopCity.trim(),
        state: loopState.trim(),
        country: loopCountry.trim(),
        day: loopDate.trim(),
        month: loopMonth,
        year: year,
        description: loopDescription.trim(), //required
        ymbryne: ymbryne,
        status: loopStatus, //required
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

      {/* day & month */}
      <Box sx={{flexDirection: "row", display: "flex", alignSelf: "start", minWidth: "421px"}}>
        {/* date */}
        <TextField
          margin="normal"
          id="loopDate"
          name="loopDate"
          label="Day"
          variant="outlined"
          fullWidth
          helperText="Numbers only"
          placeholder="01"
          {...register("loopDate", { required: false, pattern: /^[\d]{2}$/ })}
          error={!!errors.loopDate}
        />

        {/* month */}
        {/* <FormControl > */}
        <TextField
          fullWidth
          sx={{ marginTop: "1rem", marginLeft: "1rem" }}
          select
          id="loopMonth"
          name="loopMonth"
          defaultValue=""
          label="Month"
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
        {/* </FormControl> */}
      </Box>

      {/* year */}
      <Box sx={{ flexDirection: "row", display: "flex", alignSelf: "start", marginTop: "0.5rem" }}>
        <TextField
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
        <FormControl >
          <TextField
            sx={{ width: "100px" }}
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
        <FormControl>
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
      {/* <FormControl fullWidth margin="normal" >
        <TextField
          select
          id="ymbryne"
          name="ymbryne"
          defaultValue=""
          label="Ymbryne"
          onChange={handleYmbryneChange}
          {...register("ymbryne", { required: false })}
          // helperText={errors.loopMonth?.message}
          // error={!!errors.loopMonth}
          rules={{ required: false }}
          variant="outlined"
        >
          {ymbrynesData && ymbrynesData.map((ymbryne) => {
            return <MenuItem id={ymbrynesData.id} value={ymbrynesData.name}>{ymbrynesData.name}</MenuItem>
          })}

        </TextField>
      </FormControl> */}

      <FormButton text="Create Loop" loading={loading} error={error} />

      {/* {formSuccess && <SnackbarMessage message="New loop created." />} */}
    </Box>
  </>
}