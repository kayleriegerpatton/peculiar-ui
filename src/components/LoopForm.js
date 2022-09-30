import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { styles } from "../styles";
import { FormButton } from "./FormButton";
import { SnackbarMessage } from "./SnackbarMessage";
import { useMutation } from "@apollo/client";
import { CREATE_PECULIARITY } from "../mutations";
import { ErrorSharp } from "@mui/icons-material";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";


export const LoopForm = () => {
  // tracks form success for success snackbar message
  const [formSuccess, setFormSuccess] = useState(false)

  const [executeCreateLoop, { loading, error }] = useMutation(CREATE_PECULIARITY)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues:
    {
      loopCity: "Unknown",
      loopState: "",
      loopCountry: "Unknown",
      loopDate: "Unknown",
      loopMonth: "Unknown",
      loopYear: "",
      loopDescription: "",
      // loopStatus: "",
    }
  })

  const [statusValue, setStatusValue] = useState('Active');

  const handleChange = (event) => {
    setStatusValue(event.target.value);
  };

  const onSubmit = async ({
    loopCity,
    loopState,
    loopCountry,
    loopDate,
    loopMonth,
    loopYear,
    loopDescription,
    loopStatus
  }) => {
    try {
      // get loop data
      const input = {
        // REQUIRED: description, status
        city: loopCity.trim(),
        state: loopState.trim(),
        country: loopCountry.trim(),
        day: loopDate.trim(),
        month: loopMonth.trim(),
        year: loopYear.trim(),
        description: loopDescription.trim(),
        // ymbryne: ,
        status: loopStatus.trim(),
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
        label="Date"
        variant="outlined"
        fullWidth
        {...register("loopDate", { required: false })}
      />

      {/* month */}
      {/* TODO: enum the month options */}
      <TextField
        margin="normal"
        id="loopMonth"
        name="loopMonth"
        label="Month"
        variant="outlined"
        fullWidth
        {...register("loopMonth", { required: false })}
      />

      {/* year */}
      {/* TODO: handle ce/bce, error handle numbers */}
      <TextField
        margin="normal"
        id="loopYear"
        name="loopYear"
        label="Year"
        variant="outlined"
        fullWidth
        {...register("loopYear", { required: false })}
      />

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
        {...register("loopDescription", { required: true, pattern: /[A-Za-z\d.-]/ })} // match any letter, number, period or dash
        error={!!errors.loopDescription}
        sx={{marginBottom: '1rem'}}
      />

      {/* status */}
      <Box sx={{ alignSelf: 'flex-start', marginLeft: '0.85em' }}>
        <FormControl >
          <FormLabel id="loop-status-radio-buttons-group">Status</FormLabel>
          <RadioGroup
            row
            aria-labelledby="loop-status-radio-buttons-group"
            name="loop-status-radio-buttons-group"
            value={statusValue}
            onChange={handleChange}
          >
            <FormControlLabel value="Active" control={<Radio {...register("loopStatus")} />} label="Active" />
            <FormControlLabel value="Collapsed" control={<Radio {...register("loopStatus")} />} label="Collapsed" />
            <FormControlLabel value="Unknown" control={<Radio {...register("loopStatus")} />} label="Unknown" />
          </RadioGroup>
        </FormControl>
      </Box>

      {/* ymbryne, status */}

      <FormButton text="Create Loop" loading={loading} error={error} />

      {/* {formSuccess && <SnackbarMessage message="New peculiarity created." />} */}
    </Box>
  </>
}