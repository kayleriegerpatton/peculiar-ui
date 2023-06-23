
export const styles = {
  flexContainer: {
    display: "flex",
    "@media only screen and (max-width: 899px)": {
      flexDirection: "column",
    },
  },

  header: {
    paddingTop: 3,
    paddingBottom: 2,
  },

  h4: {
    fontFamily: "Libre Franklin",
    fontWeight: 700,
    fontSize: "1.625rem"
  },

  title: {
    fontFamily: "Oranienbaum",
    fontSize: "2.5rem",
    marginBottom: "2rem",
    textAlign: "center",
  },

  note: {
    // fontFamily: "Roboto",
    fontWeight: '200',
    fontSize: "1rem",
    textAlign: "center",
  },

  formWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 4,
    paddingTop: 3,
    maxWidth: '42rem',
    margin: 'auto'
  },

  // TODO: FIX: styles not rendering across all form fields
  formFields: {
    color: 'red',
    "& label.MuiFocused": {
      color: "var(--dark-liver)",
    },
    "& .MuiOutlinedInputRoot": {
      "&.Mui-focused fieldset": {
        borderColor: "var(--lavender-blue)",
      },
    },
    "&:before": {
      borderColor: "var(--lavender-blue)",
    },
  },

  errorContainer: {
    marginTop: 2,
    color: "#d32f2f",
    textAlign: "center",
  },

  loadingButton: {
    marginTop: 3,
    marginBottom: 2,
    color: "#fff",
    backgroundColor: "var(--gold-fusion)",
    fontWeight: 700,
    "&:hover": {
      backgroundColor: "var(--lavender-blue)",
      color: "var(--dark-liver)",
      borderColor: "#a4a7dc",
      boxShadow: "none",
    },
    "&:focus": {
      backgroundColor: "var(--lavender-blue)",
      color: "var(--dark-liver)",
      borderColor: "#a4a7dc",
    },
  },

  button: {
    my: 2,
    mx: 3,
    color: "white",
    fontWeight: 700,
    minWidth: "200px",
    backgroundColor: "var(--gold-fusion)",
    "&:hover": {
      backgroundColor: "var(--lavender-blue)",
      color: "var(--dark-liver)",
      borderColor: "#a4a7dc",
    },
    "&:focus": {
      backgroundColor: "var(--lavender-blue)",
      color: "var(--dark-liver)",
      borderColor: "#a4a7dc",
    },
  },

  navLink: {
    color: "var(--dark-liver)",
    fontFamily: "Oranienbaum",
    textTransform: "lowercase",
    fontSize: "1.2rem",
    "&:hover": {
      backgroundColor: "var(--lavender-blue)",
      color: "var(--dark-liver)",
    },
    "&:focus": {
      backgroundColor: "var(--lavender-blue)",
      color: "var(--dark-liver)",
    },
  },

  notification: {
    fontWeight: 200,
    fontSize: "1rem",
    marginBottom: "2rem",
    textAlign: "center",
  }
};
