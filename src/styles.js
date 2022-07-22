export const styles = {
  container: {
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 3,
    paddingBottom: 2,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 4,
    paddingTop: 3,
  },
  formFields: {
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
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "var(--dark-liver)",
      boxShadow: "none",
    },
  },

  button: {
    my: 2,
    mx: 3,
    color: "white",
    fontWeight: 700,
    backgroundColor: "var(--gold-fusion)",
    "&:hover": {
      backgroundColor: "var(--lavender-blue)",
      color: "var(--dark-liver)",
      borderColor: "#a4a7dc",
    },
  },
};
