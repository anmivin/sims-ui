import * as React from "react";
import * as Types from "./TextField.types";
import * as Styles from "./TextField.styles";
import clsx from "clsx";

const TextField = React.forwardRef<HTMLDivElement, Types.TextfieldProps>((props, ref) => {
  const {
    defaultValue,
    disabled = false,
    endAdornment,
    error = false,
    fullWidth = false,
    multiline = false,
    label,
    helperText,
    onChange,
    placeholder,
    rows,
    startAdornment,
    required,
    variant = "modern",
    appearence = "standard",
    ...other
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Styles.TextfieldRoot
      ref={ref}
      className={clsx(
        variant,
        disabled && "disabled",
        error && "error",
        fullWidth && "fullWidth",
        required && "required"
      )}
      {...other}
    >
      {label && <Styles.TextfieldLabelRoot>{label}</Styles.TextfieldLabelRoot>}

      {
        <>
          {multiline ? (
            <Styles.TextfieldArea rows={rows} className={clsx("multiline")} />
          ) : (
            <Styles.TextfieldInput {...other} className={clsx(variant, appearence)}>
              {startAdornment}
              <Styles.Input
                type='text'
                defaultValue={defaultValue}
                disabled={disabled}
                placeholder={placeholder}
                required={required}
                onChange={handleChange}
              />
              {endAdornment}
            </Styles.TextfieldInput>
          )}
        </>
      }

      {helperText && <Styles.HelperText>{helperText}</Styles.HelperText>}
    </Styles.TextfieldRoot>
  );
});

export default TextField;
