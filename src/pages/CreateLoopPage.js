import { LoopForm } from "../components/LoopForm";
import { Title } from "../components/Title";
import { RequiredNote } from "../components/RequiredNote";

export const CreateLoopPage = () => {
  return <>
    <Title title="Create a New Loop" />
    <RequiredNote />
    <LoopForm />
  </>
};