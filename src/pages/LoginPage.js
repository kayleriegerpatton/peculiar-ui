
import { useMutation } from "@apollo/client"
import { Container, TextField } from "@mui/material"
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form"
import { FormButton } from "../components/FormButton"
import { RequiredNote } from "../components/RequiredNote"
import { Title } from "../components/Title"
import { LOGIN_USER } from "../mutations/index"
import { useAuth } from "../contexts/AppProvider"
import { useNavigate } from "react-router-dom"
import { SnackbarMessage } from "../components/SnackbarMessage";
import { styles } from "../styles";
import { useState } from "react";

export const LoginPage = () => {
  const { setIsLoggedIn, isLoggedIn, user, setUser } = useAuth()
  // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token") || false);
  const [executeLogin, { loading, error }] = useMutation(LOGIN_USER);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  const onSubmit = async ({ email, password }) => {
    try {
      const { data } = await executeLogin({
        variables: {
          input: {
            email: email.toLowerCase().trim(),
            password,
          },
        },
      });
  
      if (data) {
        console.log("loginUser:", data);
        const { token, user } = data.loginUser;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Login successful. StoredToken:", localStorage.getItem("token"));
  
        setIsLoggedIn(true);
        setUser({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
          savedCharacters: user.savedCharacters,
          createdCharacters: user.createdCharacters
        })
  
        // navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <Title title="Log In" />
      {isLoggedIn && <Title title="logged in!" />}
      {!isLoggedIn && <Title title="logged out!" />}
      <RequiredNote />
      <Box
        component="form"
        sx={styles.formWrapper}
        onSubmit={handleSubmit(onSubmit)}
      // formFailure={setFormFailure} //not sure what this is for...
      >
        {error && <SnackbarMessage message="Failed to log in user. Please try again." status="error" />}
        {/* email */}

        <TextField
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

        {/* password */}
        <TextField
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
        <FormButton text="Log In" loading={loading} error={error} />
      </Box>
    </Container>
  )
}