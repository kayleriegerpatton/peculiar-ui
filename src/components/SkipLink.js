import  Button  from "@mui/material/Button"

import { styles } from "../styles"

export const SkipLink = ()=>{
const handleFocus =()=>{
const mainContent = document.getElementById('main-content')
console.log('skip nav clicked', mainContent)
mainContent.focus()
}

  return <Button
  component="button"
  id="skip-nav-link"
  sx={{
    ...styles.navLink,
    transition: "transform 0.3s",
    position: 'absolute',
    left: "46%",
    transform: "translateY(-100%)", //positions off screen
    "&:focus": {
      transform: "translateY(9%)", // centers along vertical axis of navbar
      backgroundColor: "var(--lavender-blue)",
      color: "var(--dark-liver)",
    },
  }}
  href="#main-content"
  onClick={()=>{handleFocus()}}
>
  Skip to Main Content
</Button>
}