import * as React from "react";
import * as Styles from "./Autocomplete.styles";
import * as Types from "./Autocomplete.types";
import TextField from "../TextField/TextField";
import ChevronDownIcon from "../../icons/ChevronDownIcon";
import { useAutocomplete } from "./useAutocomplete";

const Autocomplete = <Value extends Types.ValueType>(props: Types.AutocompleteProps<Value>) => {
  const {
    defaultValue,
    disabled,
    getOptionDisabled,
    getOptionLabel = (option: Value) => option.label,
    inputValue: inputValueProp,
    multiple = false,
    noOptionsText = "No options",
    onChange,
    open = false,
    openText = "Open",
    options,
    value: valueProp,
    variant = "modern",
  } = props;

  const {
    inputValue,
    value,
    dirty,
    expanded,
    filteredOptions,
    valueInput,
    onInputChange,
    onMouseDown,
    onClickClear,
    onClickIndicator,
    getTagProps,
    getOptionProps,
  } = useAutocomplete({
    defaultValue,
    getOptionDisabled,
    getOptionLabel,
    multiple,
    onChange,
    options,
  });

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const hasClearIcon = !disabled && dirty;
  const hasPopupIcon = true;

  let startAdornment;

  if (multiple && value.length > 0) {
    startAdornment = value.map((option, index) => {
      return <p key={index}>{getOptionLabel(option)}</p>;
    });
  }

  const renderOption = (props, option) => {
    const { key, ...otherProps } = props;

    return (
      <Styles.AutocompleteListItem key={key} {...otherProps}>
        {getOptionLabel(option)}
      </Styles.AutocompleteListItem>
    );
  };

  const renderListOption = (option, index) => {
    const optionProps = getOptionProps(option, index);

    return renderOption(optionProps, option);
  };

  return (
    <React.Fragment>
      <Styles.AutocompleteRoot>
        <TextField
          variant={variant}
          ref={setAnchorEl}
          defaultValue={inputValue}
          disabled={disabled}
          fullWidth
          /* value={valueInput} */
          startAdornment={startAdornment}
          onChange={(e) => {
            onInputChange(e.target.value);
          }}
          appearence='filled'
          onMouseDown={() => onMouseDown()}
          endAdornment={
            <Styles.AutocompleteEndAdornment>
              {hasClearIcon ? (
                <Styles.AutocompleteClearIndicator onClick={() => onClickClear()}>
                  {<>clearIcon</>}
                </Styles.AutocompleteClearIndicator>
              ) : null}

              {hasPopupIcon ? (
                <Styles.AutocompletePopupIndicator
                  disabled={disabled}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickIndicator();
                  }}
                >
                  {<ChevronDownIcon />}
                </Styles.AutocompletePopupIndicator>
              ) : null}
            </Styles.AutocompleteEndAdornment>
          }
        />
      </Styles.AutocompleteRoot>
      <Styles.AutocompletePopper
        placement='bottom'
        open={expanded}
        anchorEl={anchorEl}
        /*         onClose={() => setIsOpen(false)}
        onBackdropClick={() => setIsOpen(false)} */
        hideBackdrop
      >
        <Styles.AutocompletePaper>
          {!filteredOptions.length ? (
            <Styles.AutocompleteNoOptions>{noOptionsText}</Styles.AutocompleteNoOptions>
          ) : (
            <Styles.AutocompleteListbox>
              {filteredOptions.map((option, index) => {
                return renderListOption(option, index);
              })}
            </Styles.AutocompleteListbox>
          )}
        </Styles.AutocompletePaper>
      </Styles.AutocompletePopper>
    </React.Fragment>
  );
};

export default Autocomplete;
