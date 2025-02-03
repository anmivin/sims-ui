export const getClassNames = (element: string) => {
  return {
    disabled: `${element}_disabled`,
    error: `${element}_error`,
    fullWidth: `${element}_fullWidth`,
    required: `${element}_required`,
  };
};
