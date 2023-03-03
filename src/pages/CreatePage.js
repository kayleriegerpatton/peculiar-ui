import Box from "@mui/material/Box";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import StarsIcon from "@mui/icons-material/Stars";
import TornadoIcon from "@mui/icons-material/Tornado";

import { styles } from "../styles";
import { Title } from "../components/Title";
import { ImageCard } from "../components/ImageCard";

export const CreatePage = () => {
  const cardInfo = [
    {
      buttonText: "Peculiarity", endIcon: <StarsIcon />, image: "https://peculiar-project-assets.s3.amazonaws.com/default-character.png", altText: "Miss Peregrine's Home for Peculiar Children book cover", navigate: "/create/peculiarity"
    },
    {
      buttonText: "Loop", endIcon: <TornadoIcon />, image: "https://peculiar-project-assets.s3.amazonaws.com/default-loop-image-crop.png", altText: "Graphic of Florida with various printed images and doodles", navigate: "/create/loop"
    },
    {
      buttonText: "Character", endIcon: <PersonAddAlt1Icon />, image: "https://peculiar-project-assets.s3.amazonaws.com/default-character.png", altText: "Miss Peregrine's Home for Peculiar Children book cover", navigate: "/create/character"
    }
  ]

  return (
    <>
      <Title title="Add to the Peculiar world..." />
      <Box sx={{ ...styles.flexContainer, justifyContent: 'center', maxWidth: '1000px', margin: 'auto' }}>
        {cardInfo.map((card) => {
          return <ImageCard
            key={card.buttonText}
            endIcon={card.endIcon}
            image={card.image}
            altText={card.altText}
            buttonText={card.buttonText}
            navigate={card.navigate} />
        })}
      </Box>
    </>

  );
};
