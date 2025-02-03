import * as React from "react";
import clsx from "clsx";
import { getClassNames } from "../../utils/getClassNames";
import {
  HelperText,
  TextfieldArea,
  TextfieldInput,
  TextfieldLabelRoot,
  TextfieldRoot,
  Input,
} from "./TextField.styled";
import { TextfieldProps } from "./TextField.types";

const TextField = React.forwardRef<HTMLDivElement, TextfieldProps>((props, ref) => {
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
    value,
    required,
    variant = "standard",
    ...other
  } = props;

  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <TextfieldRoot
      ref={ref}
      className={clsx(
        variant,
        disabled && getClassNames("SimsUiTextField").disabled,
        error && getClassNames("SimsUiTextField").error,
        fullWidth && getClassNames("SimsUiTextField").fullWidth,
        required && getClassNames("SimsUiTextField").required
      )}
      {...other}
    >
      {label && <TextfieldLabelRoot>{label}</TextfieldLabelRoot>}

      {
        <>
          {multiline ? (
            <TextfieldArea rows={rows} className={clsx("multiline")} />
          ) : (
            <TextfieldInput {...other} className={clsx("inputBase", `input-${variant}`)}>
              {startAdornment}
              <Input
                className={clsx("input")}
                type='text'
                defaultValue={defaultValue}
                disabled={disabled}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={handleChange}
              />
              {endAdornment}
            </TextfieldInput>
          )}
        </>
      }

      {helperText && <HelperText>{helperText}</HelperText>}
    </TextfieldRoot>
  );
});

export default TextField;
