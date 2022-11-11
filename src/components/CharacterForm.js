import { FormButton } from "../components/FormButton";
import Box from "@mui/material/Box";
import {  useMutation } from "@apollo/client";

import { CREATE_CHARACTER } from "../mutations";

export const CharacterForm = () => {
  const [executeCreateCharacter, { loading, error }] =
    useMutation(CREATE_CHARACTER);
  <Box>

    <FormButton loading={loading} error={error} text="Create Character" />
  </Box>
}