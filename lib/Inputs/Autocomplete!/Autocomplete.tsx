import * as React from "react";
import TextField from "../TextField/TextField";
import Popover from "../../Surfaces/Popover/Popover";
import IconButton from "../IconButton/IconButton";
import styled from "@emotion/styled";

export interface FilterOptionsState<Value> {
  inputValue: string;
  getOptionLabel: (option: Value) => string;
}

export const usePreviousProps = <T,>(value: T) => {
  const ref = React.useRef<T | {}>({});
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current as Partial<T>;
};

export interface UseAutocompleteProps<Value> {
  defaultValue?: Value | Value[];
  /**
   * A function that determines the filtered options to be rendered on search.
   *
   * @default createFilterOptions()
   * @param {Value[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {Value[]}
   */
  filterOptions?: (options: Value[], state: FilterOptionsState<Value>) => Value[];
  /**
   * Used to determine the disabled state for a given option.
   *
   * @param {Value} option The option to test.
   * @returns {boolean}
   */
  getOptionDisabled?: (option: Value) => boolean;
  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   *
   * If used in free solo mode, it must accept both the type of the options and a string.
   *
   * @param {Value} option
   * @returns {string}
   * @default (option) => option.label ?? option
   */
  getOptionLabel?: (option: Value) => string;
  inputValue?: string;
  /**
   * Used to determine if the option represents the given value.
   * Uses strict equality by default.
   * ⚠️ Both arguments need to be handled, an option can only match with one value.
   *
   * @param {Value} option The option to test.
   * @param {Value} value The value to test against.
   * @returns {boolean}
   */
  isOptionEqualToValue?: (option: Value, value: Value) => boolean;
  multiple?: boolean;
  /**
   * Callback fired when the value changes.
   *
   * @param {Value|Value[]} value The new value of the component.
   */
  onChange?: (value: Value | Value[]) => void;
  /**
   * Callback fired when the input value changes.
   *
   * @param {string} value The new value of the text input.
   */
  onInputChange?: (value: string) => void;
  open?: boolean;
  options: ReadonlyArray<Value>;
  value?: Value | Value[];
}

export interface UseAutocompleteRenderedOption<Value> {
  option: Value;
}

export interface UseAutocompleteReturnValue<Value> {
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: (externalProps?: any) => React.HTMLAttributes<HTMLDivElement>;
  /**
   * Resolver for the `clear` button element's props.
   * @returns props that should be spread on the *clear* button element
   */
  getClearProps: () => React.HTMLAttributes<HTMLButtonElement>;
  /**
   * Resolver for the popup icon's props.
   * @returns props that should be spread on the popup icon
   */
  getPopupIndicatorProps: () => React.HTMLAttributes<HTMLButtonElement>;
  /**
   * Resolver for the rendered option element's props.
   * @param renderedOption option rendered on the Autocomplete
   * @returns props that should be spread on the li element
   */
  getOptionProps: (
    renderedOption: UseAutocompleteRenderedOption<Value>
  ) => React.HTMLAttributes<HTMLLIElement> & { key: any };
  /**
   * The input value.
   */
  inputValue: string;
  /**
   * The value of the autocomplete.
   */
  value: Value | Value[];
  /**
   * If `true`, the component input has some values.
   */
  dirty: boolean;
  /**
   * If `true`, the listbox is being displayed.
   */
  expanded: boolean;
  /**
   * If `true`, the popup is open on the component.
   */
  popupOpen: boolean;
  /**
   * An HTML element that is used to set the position of the component.
   */
  anchorEl: null | HTMLElement;
  /**
   * Setter for the component `anchorEl`.
   * @returns function for setting `anchorEl`
   */
  setAnchorEl: () => void;
}

export const createFilterOptions = () => {
  return (options, { inputValue, getOptionLabel }) => {
    let input = inputValue.trim().toLowerCase();

    const filteredOptions = !input
      ? options
      : options.filter((option) => {
          let candidate = (stringify || getOptionLabel)(option);

          candidate = candidate.toLowerCase();

          return candidate.includes(input);
        });

    return filteredOptions;
  };
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
    getOptionLabel: getOptionLabelProp = (option) => option.label ?? option,
    isOptionEqualToValue = (option, value) => option === value,
    multiple = false,
    onChange,
    onInputChange,
    options,
  } = props;

  let getOptionLabel = getOptionLabelProp;

  getOptionLabel = (option) => {
    const optionLabel = getOptionLabelProp(option);
    if (typeof optionLabel !== "string") {
      return String(optionLabel);
    }
    return optionLabel;
  };

  const ignoreFocus = React.useRef(false);
  const firstFocus = React.useRef(true);
  const inputRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [value, setValueState] = React.useState(defaultValue);
  const [inputValue, setInputValueState] = React.useState("");

  const resetInputValue = React.useCallback(
    (newValue) => {
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

  const popupOpen = open;

  const filteredOptions = popupOpen
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
    ignoreFocus.current = true;
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

  const handlePopupIndicator = () => {
    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  // Focus the input when interacting with the combobox
  const handleClick = (event) => {
    if (!event.currentTarget.contains(event.target)) {
      return;
    }
    firstFocus.current = false;
  };

  let dirty = inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);

  let groupedOptions = filteredOptions;

  return {
    getRootProps: (other = {}) => ({
      ...other,
      onClick: handleClick,
    }),
    getClearProps: () => ({
      tabIndex: -1,
      type: "button",
      onClick: handleClear,
    }),
    getPopupIndicatorProps: () => ({
      tabIndex: -1,
      type: "button",
      onClick: handlePopupIndicator,
    }),
    getOptionProps: ({ option }) => {
      const selected = (multiple ? value : [value]).some(
        (value2) => value2 != null && isOptionEqualToValue(option, value2)
      );
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;

      return {
        key: getOptionLabel(option),
        tabIndex: -1,
        onClick: handleOptionClick,
        disabled: disabled,
        selected: selected,
      };
    },
    inputValue,
    value,
    dirty,
    expanded: !!(popupOpen && anchorEl),
    popupOpen,
    anchorEl,
    setAnchorEl,
    groupedOptions,
  };
};

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
  overflow: "auto",
});

const AutocompleteLoading = styled("div")({
  color: "",
  padding: "14px 16px",
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
    className,
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
    getRootProps,
    getPopupIndicatorProps,
    getClearProps,
    getOptionProps,
    value,
    dirty,
    expanded,
    popupOpen,
    anchorEl,
    setAnchorEl,
    inputValue,
  } = useAutocomplete({ ...props });

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

  const renderAutocompletePopperChildren = (children) => (
    <AutocompletePopper open={expanded}>
      <AutocompletePaper>{children}</AutocompletePaper>
    </AutocompletePopper>
  );

  let autocompletePopper: React.ReactElement | null = null;
  if (options.length > 0) {
    autocompletePopper = renderAutocompletePopperChildren(
      <AutocompleteListbox>
        {options.map((option) => {
          return renderListOption(option);
        })}
      </AutocompleteListbox>
    );
  } else if (loading && options.length === 0) {
    autocompletePopper = renderAutocompletePopperChildren(
      <AutocompleteLoading>{loadingText}</AutocompleteLoading>
    );
  } else if (options.length === 0 && !loading) {
    autocompletePopper = renderAutocompletePopperChildren(
      <AutocompleteNoOptions>{noOptionsText}</AutocompleteNoOptions>
    );
  }

  return (
    <React.Fragment>
      <AutocompleteRoot {...getRootProps(other)}>
        <TextField
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
                  aria-label={popupOpen ? closeText : openText}
                >
                  {<>popupIcon</>}
                </AutocompletePopupIndicator>
              ) : null}
            </AutocompleteEndAdornment>
          }
        />
      </AutocompleteRoot>
      {anchorEl ? autocompletePopper : null}
    </React.Fragment>
  );
};

export default Autocomplete;
