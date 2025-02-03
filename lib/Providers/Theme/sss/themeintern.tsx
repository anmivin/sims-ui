import { Theme } from "@emotion/react";

export const themeInternalLight = {
  button: {
    primary: "#7FD1E0",
    secondary: "darkBlue",
  },
  form: {
    input: {
      primary: "white",
      borderColor: "#7FD1E0",
    },
    select: {
      primary: "white",
      borderColor: "#7FD1E0",
    },
  },
  layout: {
    backgrounds: {
      primary: "white",
      secondary: "#f4f4f0",
    },
    text: {
      primary: "black",
    },
  },
};

export const themeInternalDark = {
  button: {
    primary: "#233B80",
    secondary: "royalBlue",
  },
  form: {
    input: {
      primary: "#233B80",
      borderColor: "#1F275E",
    },
    select: {
      primary: "#233B80",
      borderColor: "#1F275E",
    },
  },
  layout: {
    backgrounds: {
      primary: "#121212",
      secondary: "#a6a6a6",
    },
    text: {
      primary: "white",
    },
  },
};

export const themeInternal = (parentTheme: Theme): Theme => ({
  ...parentTheme,
  button: {
    ...parentTheme.color,
    padding: "5px 10px",
    borderRadius: "5px",
  },
  form: {
    ...parentTheme.form,
    input: {
      ...parentTheme.form.input,
      padding: "5px 10px",
      borderRadius: "5px",
      borderWidth: "1px",
      border: "solid",
    },
    select: {
      ...parentTheme.form.select,
      padding: "5px 10px",
      borderRadius: "5px",
      borderWidth: "1px",
      border: "solid",
    },
  },
});
