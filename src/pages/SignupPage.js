import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { styles } from "../styles";
import { FormButton } from "../components/FormButton";
import { SnackbarMessage } from "../components/SnackbarMessage";
import { useForm } from "react-hook-form";
import { CREATE_USER } from "../mutations";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Title } from "../components/Title";
import { RequiredNote } from "../components/RequiredNote";
import { Button, Stack, Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";

export const SignupPage = () => {
  const [executeSignup, { loading, error }] =
    useMutation(CREATE_USER);

  const [formFailure, setFormFailure] = useState()
  const mobile = useMediaQuery({ query: "(max-width: 1023px" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()

  const navigate = useNavigate()

  const onSubmit = async ({ firstName, lastName, username, email, password, profileImage }) => {
    try {
      const input = {
        firstName: firstName.trim(), // required
        lastName: lastName.trim(), // required
        username: username.trim(), // required
        email: email.trim(), // required
        password: password, // required
        profileImage: !!profileImage ? profileImage.trim() : undefined // leave undefined in order for default image to be stored
      }

      const { data } = await executeSignup({
        variables: {
          input
        },
      });
      if (data) {
        navigate("/login", { replace: true })
      }
    } catch (err) {
      // show fail message
      setFormFailure(true)
    }
  };

  return (
    <Stack
      justifyContent="center"
      sx={{ display: "flex", flexDirection: "row" }}
    >
      <Box
        sx={{ width: { xs: "100%", sm: "100%", md: "50%", lg: "50%", xl: "50%" }, alignContent: "center" }}>
        <Title title="Sign up" />
        <RequiredNote />
        <Box
          component="form"
          sx={styles.formWrapper}
          onSubmit={handleSubmit(onSubmit)}
        // formFailure={setFormFailure} //not sure what this is for...
        >
          {error && <SnackbarMessage message="Failed to create user. Please try again." status="error" />}

          {/* firstName */}
          <TextField
          autoFocus
            sx={{ maxWidth: "21rem" }}
            error={!!errors.firstName}
            margin="normal"
            id="firstName"
            name="firstName"
            label="First Name*"
            variant="outlined"
            helperText={errors.firstName?.message}
            fullWidth
            {...register("firstName", { required: { value: true, message: "First name is required." }, pattern: { value: /^[a-zA-Z-' ]+$/, message: "Name may only contain letters(a-z), dashes/hyphens(-), and/or apostrophes(')." }, maxLength: { value: 100, message: "Name must contain a maximum of 100 characters." } })} //match any number of letters, spaces, and/or hyphens
          />

          {/* lastName */}
          <TextField
            sx={{ maxWidth: "21rem" }}
            error={!!errors.lastName}
            margin="normal"
            id="lastName"
            name="lastName"
            label="Last Name*"
            variant="outlined"
            helperText={errors.lastName?.message}
            fullWidth
            {...register("lastName", { required: { value: true, message: "Last name is required." }, pattern: { value: /^[a-zA-Z-' ]+$/, message: "Name may only contain letters(a-z), dashes/hyphens(-), and/or apostrophes(')." }, maxLength: { value: 100, message: "Name must contain a maximum of 100 characters." } })} //match any number of letters, spaces, and/or hyphens
          />

          {/* username */}
          <TextField
            sx={{ maxWidth: "21rem" }}
            error={!!errors.username}
            margin="normal"
            id="username"
            name="username"
            label="Username*"
            variant="outlined"
            helperText={errors.username?.message}
            fullWidth
            {...register("username", { required: { value: true, message: "Username is required." }, pattern: { value: /^[\w!@$&*-]+$/, message: "Username may only contain letters(a-z), numbers(0-9), and/or the following special characters: !@$&*-_'" }, maxLength: { value: 50, message: "Username may only contain a maximum of 50 characters." } })}
          />

          {/* email */}
          <TextField
            sx={{ maxWidth: "21rem" }}
            type={"email"}
            error={!!errors.email}
            margin="normal"
            id="email"
            name="email"
            label="Email*"
            variant="outlined"
            helperText={errors.email?.message}
            fullWidth
            {...register("email", { required: { value: true, message: "Email is required." }, pattern: { value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, message: "Email is invalid." } })} //match email format
          />

          {/* profile image */}
          <TextField
            sx={{ maxWidth: "21rem" }}
            // type={"url"} // shows browser tooltip with error message
            error={!!errors.image}
            margin="normal"
            id="image"
            name="image"
            label="Profile Image"
            variant="outlined"
            helperText={errors.image?.message}
            fullWidth
            {...register("image", {
              required: false, pattern:
                { value: /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/, message: "Image url is invalid." }
            })} // match url format
          />

          {/* password */}
          <TextField
            sx={{ maxWidth: "21rem" }}
            type={"password"}
            error={!!errors.password}
            margin="normal"
            id="password"
            name="password"
            label="Password*"
            variant="outlined"
            helperText={errors.password?.message}
            fullWidth
            {...register("password", { required: { value: true, message: "Password is required." }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, message: "Password must contain at least one uppercase letter, lowercase letter, number, and special character !@$%*?&" }, minLength: { value: 8, message: "Password must contain at least 8 characters." } })} // match at least 1: uppercase, lowercase, number, and special character
          />

          {/* password confirmation */}
          <TextField
            sx={{ maxWidth: "21rem" }}
            type={"password"}
            error={!!errors.passwordConfirmation}
            margin="normal"
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="Confirm Password*"
            variant="outlined"
            helperText={errors.passwordConfirmation?.message}
            fullWidth
            {...register("passwordConfirmation", { required: { value: true, message: "Please confirm your password." }, validate: (value) => getValues("password") === value || "Passwords do not match." })}
          />

          <FormButton text="Sign Up" loading={loading} error={error} />
          <Typography sx={{ marginTop: "1rem" }}>
            Already have an account? <a href="/login">Log in</a>
          </Typography>
        </Box>
      </Box>
      {/* TODO: On larger viewports, display side image */}
      {!mobile &&
        <Box component="aside" sx={{ border: "1px solid", width: "40%", marginLeft: "2rem" }}>
          <h1>Image here</h1>
        </Box>}
    </Stack>
  )
}