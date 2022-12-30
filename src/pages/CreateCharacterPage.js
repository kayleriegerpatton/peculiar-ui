import { Title } from "../components/Title";
import { CharacterForm } from "../components/CharacterForm";
import { RequiredNote } from "../components/RequiredNote";

export const CreateCharacterPage = () => {

  return (
    <>
      <Title title="Create a New Character" />
      <RequiredNote/>
      <CharacterForm/>
    </>
  );
};
