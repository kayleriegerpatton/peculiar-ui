import { Avatar, Button, IconButton, Stack, Typography } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebIcon from '@mui/icons-material/Web';
import { ReactComponent as LogoIcon } from '../peculiar-bird-icon.svg'

export const AboutPage = () => {
  return (
    <>
      <div className="about-container">
        <LogoIcon fill='var(--dark-liver)' width="22rem" height="" id="about-logo" />
        <div className="about-text">
          <h1 className="page-title">About the Peculiar Project</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Check out the project code:</p>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="left"
          >
            <Stack
              direction="column"
            >
              <IconButton
                aria-label="github"
                href="https://github.com/kayleriegerpatton/peculiar-ui"
                target="_blank"
                sx={{ marginBottom: "-5px" }}
              >
                <GitHubIcon sx={{ fontSize: "3rem" }} />
              </IconButton>
              <a className="logo-text" href="mailto:kayle.patton22@gmail.com" target="_blank" rel="noreferrer">UI</a>
            </Stack>
            <Stack>
              <IconButton
                aria-label="github"
                href="https://github.com/kayleriegerpatton/peculiar-api"
                target="_blank"
                sx={{ marginBottom: "-5px" }}
              >
                <GitHubIcon sx={{ fontSize: "3rem" }} />
              </IconButton>
              <a className="logo-text" href="mailto:kayle.patton22@gmail.com" target="_blank" rel="noreferrer">API</a>
            </Stack>
          </Stack>
        </div>
      </div>

        <div className="about-container">
          <div className="about-text">
            <h2 className="page-title">About the Developer</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Get in Touch:</p>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="left">
              <Stack>
                <IconButton
                  aria-label="github"
                  href="https://github.com/kayleriegerpatton"
                  target="_blank"
                  sx={{ marginBottom: "-5px" }}
                >
                  <GitHubIcon sx={{ fontSize: "3rem" }} />
                </IconButton>
                <a className="logo-text" href="https://github.com/kayleriegerpatton" target="_blank" rel="noreferrer">GitHub</a>
              </Stack>
              <Stack>
                <IconButton
                  aria-label="linkedin"
                  href="https://www.linkedin.com/in/kaylerieger/"
                  target="_blank"
                  sx={{ marginBottom: "-5px" }}>
                  <LinkedInIcon sx={{ fontSize: "3rem" }} />
                </IconButton>
                <a className="logo-text" href="https://www.linkedin.com/in/kaylerieger/" target="_blank" rel="noreferrer">LinkedIn</a>
              </Stack>
              <Stack>
                <IconButton
                  aria-label="portfolio"
                  href="http://www.tinyurl.com/krp-portfolio"
                  target="_blank"
                  sx={{ marginBottom: "-5px" }}>
                  <WebIcon sx={{ fontSize: "3rem" }} />
                </IconButton>
                <a className="logo-text" href="http://www.tinyurl.com/krp-portfolio" target="_blank" rel="noreferrer">Portfolio</a>
              </Stack>
              <Stack>
                <IconButton
                  aria-label="email"
                  href="mailto:kayle.patton22@gmail.com"
                  target="_blank"
                  sx={{ marginBottom: "-5px" }}>
                  <EmailIcon sx={{ fontSize: "3rem" }} />
                </IconButton>
                <a className="logo-text" href="mailto:kayle.patton22@gmail.com" target="_blank" rel="noreferrer">Email</a>
              </Stack>
            </Stack>
          </div>
          <div>
            <img alt="Kayle wearing a black blazer and glasses." src="https://peculiar-project-assets.s3.eu-west-1.amazonaws.com/profile.jpeg"></img>
          </div>

        </div>


    </>
  )
}