import * as React from "react";
import * as Styles from "./Autocomplete.styles";
import * as Types from "./Autocomplete.types";

import { useAutocomplete } from "./useAutocomplete";
import clsx from "clsx";

import TextField from "../TextField/TextField";
import { ChevronDownIcon, CloseIcon } from "../../Display/Icon";
import IconButton from "../IconButton/IconButton";

const Autocomplete = <Value extends Types.ValueType>(props: Types.AutocompleteProps<Value>) => {
  const {
    defaultValue,
    disabled,
    getOptionDisabled,
    getOptionLabel = (option: Value) => option.label,
    multiple,
    noOptionsText = "No options",
    onChange,
    options,
    variant = "modern",
  } = props;

  const {
    inputValue,
    value,
    dirty,
    expanded,
    filteredOptions,
    onInputChange,
    onOpen,
    onClose,
    onClickClear,
    onClickIndicator,
    optionProps,
  } = useAutocomplete({
    defaultValue,
    getOptionDisabled,
    getOptionLabel,
    multiple,
    onChange,
    options,
  });

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const renderOption = (props: Types.OptionProps, option: Value) => {
    const { key, selected, ...otherProps } = props;

    return (
      <Styles.AutocompleteOption
        key={key}
        {...otherProps}
        className={clsx(variant, selected && "selected")}
      >
        {getOptionLabel(option)}
      </Styles.AutocompleteOption>
    );
  };

  const renderListOption = (option: Value, index: number) => {
    const props = optionProps(option, index);
    return renderOption(props, option);
  };

  const tags = React.useMemo(() => {
    if (multiple) {
      const typedValue = value as Value[];
      return typedValue.map((option) => getOptionLabel(option)).join(", ");
    }
  }, [multiple, value, getOptionLabel]);

  return (
    <React.Fragment>
      <TextField
        variant={variant}
        ref={setAnchorEl}
        defaultValue={inputValue}
        disabled={disabled}
        fullWidth
        startAdornment={
          <Styles.AutocompleteStartAdornment>{tags}</Styles.AutocompleteStartAdornment>
        }
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
        appearence='primary'
        onClick={onOpen}
        endAdornment={
          <Styles.AutocompleteEndAdornment>
            {!disabled && dirty && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onClickClear();
                }}
              >
                <CloseIcon />
              </IconButton>
            )}

            <IconButton
              disabled={disabled}
              className={clsx(expanded && "open", disabled && "desabled")}
              onClick={(e) => {
                e.stopPropagation();
                onClickIndicator();
              }}
              style={{ transform: expanded ? "rotate(180deg)" : undefined }}
            >
              <ChevronDownIcon />
            </IconButton>
          </Styles.AutocompleteEndAdornment>
        }
      />
      <Styles.AutocompletePopper
        placement='bottom'
        open={expanded}
        onClose={onClose}
        anchorEl={anchorEl}
        textfieldWidth={anchorEl?.offsetWidth}
      >
        <Styles.AutocompletePaper className={clsx(variant)} textfieldWidth={anchorEl?.offsetWidth}>
          {!filteredOptions.length ? (
            <Styles.AutocompleteNoOptions>{noOptionsText}</Styles.AutocompleteNoOptions>
          ) : (
            <>
              {filteredOptions.map((option, index) => {
                return renderListOption(option, index);
              })}
            </>
          )}
        </Styles.AutocompletePaper>
      </Styles.AutocompletePopper>
    </React.Fragment>
  );
};

export default Autocomplete;
