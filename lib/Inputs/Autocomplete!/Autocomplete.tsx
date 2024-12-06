import * as React from "react";
import TextField from "../TextField/TextField";
import Popover from "../../Surfaces/Popover!/Popover";
import IconButton from "../IconButton/IconButton";
import styled from "@emotion/styled";

export interface FilterOptionsState<Value> {
  inputValue: string;
  getOptionLabel: (option: Value) => string;
}

export interface UseAutocompleteProps<Value> {
  defaultValue?: Value | Value[];
  filterOptions?: (options: Value[], state: FilterOptionsState<Value>) => Value[];
  getOptionDisabled?: (option: Value) => boolean;
  getOptionLabel?: (option: Value) => string;
  inputValue?: string;
  isOptionEqualToValue?: (option: Value, value: Value) => boolean;
  multiple?: boolean;
  onChange?: (value: Value | Value[]) => void;
  onInputChange?: (value: string) => void;
  open?: boolean;
  options: ReadonlyArray<Value>;
  value?: Value | Value[];
}

export interface UseAutocompleteRenderedOption<Value> {
  option: Value;
}

export interface UseAutocompleteReturnValue<Value> {
  getClearProps: () => React.HTMLAttributes<HTMLButtonElement>;
  getPopupIndicatorProps: () => React.HTMLAttributes<HTMLButtonElement>;
  getOptionProps: (
    renderedOption: UseAutocompleteRenderedOption<Value>
  ) => React.HTMLAttributes<HTMLLIElement> & { key: any };
  inputValue: string;
  value: Value | Value[];
  dirty: boolean;
  expanded: boolean;
}

export interface AutocompleteProps<Value>
  extends UseAutocompleteProps<Value>,
    Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange" | "children"> {
  clearText?: string;
  closeText?: string;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: React.ReactNode;
  noOptionsText?: React.ReactNode;
  openText?: string;
}

const createFilterOptions = () => <Value,>(options:Value[], { inputValue, getOptionLabel }:  
  { inputValue: string, getOptionLabel: (option: Value) => string }) => {
    const input = inputValue.trim().toLowerCase();

    const filteredOptions = !input
      ? options
      : options.filter((option) => {
          let candidate = getOptionLabel(option);

          candidate = candidate.toLowerCase();

          return candidate.includes(input);
        });

    return filteredOptions;

};

const defaultFilterOptions = createFilterOptions();

const useAutocomplete = <Value,>(
  props: UseAutocompleteProps<Value>
): UseAutocompleteReturnValue<Value> => {
  const defaultMultiple: Value[] = [];
  const defaultSingle: Value | null = null;
  const {
    defaultValue = props.multiple ? defaultMultiple : defaultSingle,
    filterOptions = defaultFilterOptions,
    getOptionDisabled,
    getOptionLabel = (option) => `${option}`,
    isOptionEqualToValue = (option, value) => option === value,
    multiple = false,
    onChange,
    onInputChange,
    options,
  } = props;

  const [value, setValueState] = React.useState(defaultValue);
  const [inputValue, setInputValueState] = React.useState("");

  const resetInputValue = React.useCallback((newValue) => {
      const isOptionSelected = multiple ? value?.length < newValue.length : newValue !== null;
      if (!isOptionSelected) {
        return;
      }
      let newInputValue;
      if (multiple) {
        newInputValue = "";
      } else if (newValue == null) {
        newInputValue = "";
      } else {
        const optionLabel = getOptionLabel(newValue);
        newInputValue = typeof optionLabel === "string" ? optionLabel : "";
      }

      if (inputValue === newInputValue) {
        return;
      }

      setInputValueState(newInputValue);

      if (onInputChange) {
        onInputChange(newInputValue);
      }
    },
    [getOptionLabel, inputValue, multiple, onInputChange, setInputValueState, value]
  );

  const [open, setOpenState] = React.useState(false);

  const inputValueIsSelectedValue =
    !multiple && value != null && inputValue === getOptionLabel(value);

  const filteredOptions = open
    ? filterOptions(
        options.filter((option) => true),
        {
          inputValue: inputValueIsSelectedValue ? "" : inputValue,
          getOptionLabel,
        }
      )
    : [];

  const handleOpen = React.useCallback(() => {
    if (open) {
      return;
    }

    setOpenState(true);
  }, [open]);

  const handleClose = React.useCallback(() => {
    if (!open) {
      return;
    }

    setOpenState(false);
  }, [open]);

  const handleValue = React.useCallback(
    (newValue) => {
      if (multiple) {
        if (value.length === newValue.length && value.every((val, i) => val === newValue[i])) {
          return;
        }
      } else if (value === newValue) {
        return;
      }

      if (onChange) {
        onChange(newValue);
      }

      setValueState(newValue);
    },
    [multiple, value]
  );

  const selectNewValue = (option) => {
    let newValue = option;

    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];

      const itemIndex = newValue.findIndex((valueItem) => isOptionEqualToValue(option, valueItem));

      if (itemIndex === -1) {
        newValue.push(option);
      } else if (origin !== "freeSolo") {
        newValue.splice(itemIndex, 1);
      }
    }

    resetInputValue(newValue);

    handleValue(newValue);
  };

  const handleClear = () => {
    setInputValueState("");
    if (onInputChange) {
      onInputChange("");
    }
    handleValue(multiple ? [] : null);
  };

  const handleOptionClick = (event) => {
    const index = Number(event.currentTarget.getAttribute("data-option-index"));
    selectNewValue(filteredOptions[index]);
  };

  let dirty = inputValue.length > 0;
  dirty = dirty || (multiple ? value?.length > 0 : value !== null);

  const groupedOptions = filteredOptions;

  return {
    onClickClear: handleClear,
    onClickPopupIndecator: open ? handleClose() :  handleOpen(),
    getOptionProps: ({ option }) => {
      const selected = (multiple ? value : [value]).some(
        (value2) => value2 != null && isOptionEqualToValue(option, value2)
      );
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;

      return {
        key: getOptionLabel(option),
        onClick: handleOptionClick,
        disabled: disabled,
        selected: selected,
      };
    },
    inputValue,
    value,
    dirty,
    expanded: open,
    groupedOptions,
  };
};


const AutocompleteRoot = styled("div")({
  ".clearIndicator": {
    visibility: "visible",
  },
  ".inputRoot": {
    ".hasPopupIcon .hasClearIcon": {
      paddingRight: 52 + 4,
    },
    ".input": {
      width: 0,
      minWidth: 30,
      flexGrow: 1,
      textOverflow: "ellipsis",
      opacity: 0,
    },
  },
  ".root": {
    paddingBottom: 1,
    "& .MuiInput-input": {
      padding: "4px 4px 4px 0px",
    },
  },
  ".multiple": {
    ".inputRoot": {
      flexWrap: "wrap",
    },
  },
});

const AutocompleteEndAdornment = styled("div")({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translate(0, -50%)",
});

const AutocompleteClearIndicator = styled(IconButton)({
  marginRight: -2,
  padding: 4,
  visibility: "hidden",
});

const AutocompletePopupIndicator = styled(IconButton)({
  padding: 2,
  marginRight: -2,
  ".popupOpen": {
    transform: "rotate(180deg)",
  },
});

const AutocompletePopper = styled(Popover)({
  zIndex: 100,
});

const AutocompletePaper = styled("div")({
  width: '400px',
  overflow: "auto",
});

const AutocompleteNoOptions = styled("div")({
  color: "",
  padding: "14px 16px",
});

const AutocompleteListbox = styled("div")({
  listStyle: "none",
  margin: 0,
  padding: "8px 0",
  maxHeight: "40vh",
  overflow: "auto",
  position: "relative",
  "-option": {
    minHeight: 48,
    display: "flex",
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
    cursor: "pointer",
    paddingTop: 6,
    boxSizing: "border-box",
    outline: "0",
    WebkitTapHighlightColor: "transparent",
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    '&[aria-disabled="true"]': {
      opacity: 0.5,
      pointerEvents: "none",
    },
    '&[aria-selected="true"]': {
      backgroundColor: "",
    },
  },
});

const AutocompleteListItem = styled("li")({});

const Autocomplete = <Value,>(props: AutocompleteProps<Value>) => {
  const {
    clearText = "Clear",
    closeText = "Close",
    defaultValue = props.multiple ? [] : null,
    disabled = false,
    filterOptions,
    getOptionDisabled,
    getOptionLabel: getOptionLabelProp,
    isOptionEqualToValue,
    inputValue: inputValueProp,
    loading = false,
    loadingText = "Loading…",
    multiple = false,
    noOptionsText = "No options",
    onChange,
    onInputChange,
    open,
    openText = "Open",
    options,
    value: valueProp,
    ...other
  } = props;

  const {
    getPopupIndicatorProps,
    getClearProps,
    getOptionProps,
    value,
    dirty,
    expanded,
    inputValue,
  } = useAutocomplete({ ...props });

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const hasClearIcon = !disabled && dirty;
  const hasPopupIcon = true;

  const defaultGetOptionLabel = (option) => option.label ?? option;
  const getOptionLabel = getOptionLabelProp || defaultGetOptionLabel;

  let startAdornment;
  if (multiple && value.length > 0) {
    startAdornment = value.map((option, index) => {
      return <p key={index}>{getOptionLabel(option)}</p>;
    });
  }

  const renderOption = (props, option) => {
    const { key, ...otherProps } = props;
    return (
      <AutocompleteListItem key={key} {...otherProps}>
        {getOptionLabel(option)}
      </AutocompleteListItem>
    );
  };

  const renderListOption = (option) => {
    const optionProps = getOptionProps({ option });

    return renderOption(optionProps, option);
  };


React.useEffect(() => console.log(options), [options])
  return (
    <React.Fragment>
      <AutocompleteRoot >
        <TextField
       ref={setAnchorEl}
          defaultValue={inputValue}
          disabled={disabled}
          fullWidth
          startAdornment={startAdornment}
          endAdornment={
            <AutocompleteEndAdornment>
              {hasClearIcon ? (
                <AutocompleteClearIndicator {...getClearProps()} aria-label={clearText}>
                  {<>clearIcon</>}
                </AutocompleteClearIndicator>
              ) : null}

              {hasPopupIcon ? (
                <AutocompletePopupIndicator
                  {...getPopupIndicatorProps()}
                  disabled={disabled}
                  aria-label={expanded ? closeText : openText}
                >
                  {<>popupIcon</>}
                </AutocompletePopupIndicator>
              ) : null}
            </AutocompleteEndAdornment>
          }
        />
      </AutocompleteRoot>
      <AutocompletePopper open={expanded} anchorEl={anchorEl} anchorOrigin = {{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin = {{
      vertical: "top",
      horizontal: "left",
    }}>
      <AutocompletePaper>{!options.length ? (<AutocompleteNoOptions>{noOptionsText}</AutocompleteNoOptions>) : 
      (      <AutocompleteListbox>
        {options.map((option) => {
          return renderListOption(option);
        })}
      </AutocompleteListbox>)}</AutocompletePaper>
    </AutocompletePopper>
    </React.Fragment>
  );
};

export default Autocomplete;
