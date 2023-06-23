import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ReactComponent as LogoIcon } from '../peculiar-bird-icon.svg'

import { useMediaQuery } from 'react-responsive';

export const Footer = () => {
  const mobile = useMediaQuery({ query: "(max-width: 499px" });
  const year = new Date().getFullYear();

  return <footer>
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="center"
      marginBottom="1rem"
    >
      <IconButton
        aria-label="email"
        href="mailto:kayle.patton22@gmail.com"
        target="_blank">
        <EmailIcon fontSize='large' />
      </IconButton>
      <IconButton
        aria-label="github"
        href="https://github.com/kayleriegerpatton"
        target="_blank" >
        <GitHubIcon fontSize='large' />
      </IconButton>
      <IconButton
        aria-label="linkedin"
        href="https://www.linkedin.com/in/kaylerieger/"
        target="_blank">
        <LinkedInIcon fontSize='large' />
      </IconButton>
    </Stack>

    <Stack
      direction={mobile ? "column" : "row"}
      spacing={2}
      alignItems="center"
      justifyContent="center"
      marginBottom="2rem"
    >
      <a href='/'>Home</a> <a href='/about'>About</a> <a href='/signup'>Sign Up</a>
    </Stack>

{/* Logo Group */}
    <Stack
      direction={mobile ? "column" : "row"}
      alignItems="center"
      justifyContent="center"
      spacing={0.5}>
      <LogoIcon fill='white' width="6rem" height="6rem" />
      <div>
        <Typography
          fontFamily={'Amatic SC'}
          fontWeight={'700'}
          fontSize="3.125rem"
          color='white'
          >
            {`The Peculiar Project`}
        </Typography>
        <Typography fontFamily={'Libre Franklin'} color='white'>{`Copyright © ${year} Kayle Rieger Patton `}</Typography>
      </div>
    </Stack>

  </footer>;
};
