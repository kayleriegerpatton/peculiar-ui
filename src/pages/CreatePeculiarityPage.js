import { PeculiarityForm } from "../components/PeculiarityForm";
import { Title } from "../components/Title";
import { RequiredNote } from "../components/RequiredNote";

export const CreatePeculiarityPage = () => {
  return <>
    <Title title="Create a New Peculiarity" />
    <RequiredNote/>
    <PeculiarityForm />
  </>;
};
