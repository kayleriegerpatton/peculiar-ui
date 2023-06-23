import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebIcon from '@mui/icons-material/Web';

import { ReactComponent as LogoIcon } from '../peculiar-bird-icon.svg'
import { useMediaQuery } from 'react-responsive';
import { styles } from '../styles';

export const Footer = () => {
  const mobile = useMediaQuery({ query: "(max-width: 899px" });
  const year = new Date().getFullYear();

  return <Stack
    component="footer"
    direction={mobile ? "column" : "row-reverse"}
    sx={mobile ? { padding: "3rem", display: "inline-flex", justifyContent: "space-between" } : { display: "inline-flex", justifyContent: "space-between" }}>
    {/* Contact icons */}
    {mobile && <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="flex-start"
      marginBottom="1rem"
    >
      <IconButton
        aria-label="github"
        href="https://github.com/kayleriegerpatton"
        target="_blank"
        sx={{paddingLeft: 0}} >
        <GitHubIcon fontSize='large' />
      </IconButton>

      <IconButton
        aria-label="linkedin"
        href="https://www.linkedin.com/in/kaylerieger/"
        target="_blank">
        <LinkedInIcon fontSize='large' />
      </IconButton>

      <IconButton
        aria-label="portfolio"
        href="http://www.tinyurl.com/krp-portfolio"
        target="_blank" >
        <WebIcon fontSize='large' />
      </IconButton>

      <IconButton
        aria-label="email"
        href="mailto:kayle.patton22@gmail.com"
        target="_blank">
        <EmailIcon fontSize='large' />
      </IconButton>
      {!mobile && <a href='mailto:kayle.patton22@gmail.com'>
        kayle.patton22@gmail.com
      </a>}

    </Stack>}

    {/* Explore links */}
    <Stack
      direction="column"
      spacing={2}
      alignItems="flex-start"
      justifyContent="center"
      marginBottom="2rem"
    >
      <Typography
        color="white"
        component="h4"
        sx={styles.h4}
      >
        {"Explore"}
      </Typography>

      <a href='/' style={{ fontSize: "1.25rem" }}>Home</a>
      <a href='/about' style={{ fontSize: "1.25rem" }}>About</a>
      <a href='/signup' style={{ fontSize: "1.25rem" }}>Sign Up</a>
    </Stack>

    <Stack
      direction="column-reverse"
      alignItems="flex-start"
      spacing={5}
    >

      {/* Contact icons */}
      {!mobile && <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        marginBottom="1rem"
      >
        <IconButton
          aria-label="github"
          href="https://github.com/kayleriegerpatton"
          target="_blank"
          sx={{paddingLeft: 0}}>
          <GitHubIcon sx={{fontSize: "3rem"}} />
        </IconButton>

        <IconButton
          aria-label="linkedin"
          href="https://www.linkedin.com/in/kaylerieger/"
          target="_blank">
          <LinkedInIcon sx={{fontSize: "3rem"}} />
        </IconButton>

        <IconButton
          aria-label="portfolio"
          href="http://www.tinyurl.com/krp-portfolio"
          target="_blank" >
          <WebIcon sx={{fontSize: "3rem"}} />
        </IconButton>

        <IconButton
          aria-label="email"
          href="mailto:kayle.patton22@gmail.com"
          target="_blank">
          <EmailIcon sx={{fontSize: "3rem"}} />
        </IconButton>
        {!mobile && <a href='mailto:kayle.patton22@gmail.com'>
          kayle.patton22@gmail.com
        </a>}

      </Stack>}

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

    </Stack>

  </Stack>;
};
