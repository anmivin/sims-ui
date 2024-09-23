import * as React from "react";
import Popper from "./Popper";
import IconButton from "../Inputs/IconButton/IconButton";
import styled from "@emotion/styled";

const AutocompleteRoot = styled("div")({
  "-tag": {
    margin: 3,
    maxWidth: "calc(100% - 6px)",
  },

  "-endAdornment": {
    right: 9,
  },
  "-multiple": {
    flexWrap: "wrap",
  },
});

const AutocompleteEndAdornment = styled("div")({
  // We use a position absolute to support wrapping tags.
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
  "-popupOpen": {
    transform: "rotate(180deg)",
  },
});

const AutocompletePopper = styled(Popper)({
  zIndex: 10,
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
  },
});

const AutocompleteGroupUl = styled("ul")({
  padding: 0,
  "-option": {
    paddingLeft: 24,
  },
});

const Autocomplete = (props) => {
  const {
    ChipProps: ChipPropsProp,
    defaultValue = props.multiple ? [] : null,
    disabled = false,
    filterOptions,
    filterSelectedOptions = false,
    forcePopupIcon = "auto",
    freeSolo = false,
    fullWidth = false,
    getLimitTagsText = (more) => `+${more}`,
    getOptionDisabled,
    getOptionLabel: getOptionLabelProp,
    isOptionEqualToValue,
    groupBy,
    id: idProp,
    inputValue: inputValueProp,
    limitTags = -1,
    loading = false,
    multiple = false,
    onChange,
    onInputChange,
    open,
    options,
    value: valueProp,
    ...other
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const {
    getRootProps,
    getInputProps,
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
  } = useAutocomplete({ ...props, componentName: "Autocomplete" });

  const hasClearIcon = !disabled && dirty;
  const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;

  const { onMouseDown: handleInputMouseDown } = getInputProps();
  const { ref: listboxRef, ...otherListboxProps } = getListboxProps();

  const defaultGetOptionLabel = (option) => option.label ?? option;
  const getOptionLabel = getOptionLabelProp || defaultGetOptionLabel;

  // If you modify this, make sure to keep the `AutocompleteOwnerState` type in sync.
  const ownerState = {
    ...props,
    disablePortal,
    expanded,
    focused,
    fullWidth,
    getOptionLabel,
    hasClearIcon,
    hasPopupIcon,
    inputFocused: focusedTag === -1,
    popupOpen,
  };

  const externalForwardedProps = {
    slots: {
      listbox: ListboxComponentProp,
      paper: PaperComponentProp,
      popper: PopperComponentProp,
      ...slots,
    },
    slotProps: {
      chip: ChipPropsProp,
      listbox: ListboxPropsProp,
      ...componentsProps,
      ...slotProps,
    },
  };

  const [ListboxSlot, listboxProps] = useSlot("listbox", {
    elementType: "ul",
    externalForwardedProps,
    ownerState,
    className: "listbox",
    additionalProps: otherListboxProps,
    ref: listboxRef,
  });

  const [PaperSlot, paperProps] = useSlot("paper", {
    elementType: Paper,
    externalForwardedProps,
    ownerState,
    className: "paper",
  });

  const [PopperSlot, popperProps] = useSlot("popper", {
    elementType: Popper,
    externalForwardedProps,
    ownerState,
    className: "popper",
    additionalProps: {
      disablePortal,
      style: { width: anchorEl ? anchorEl.clientWidth : null },
      role: "presentation",
      anchorEl,
      open: popupOpen,
    },
  });

  let startAdornment;

  if (multiple && value.length > 0) {
    const getCustomizedTagProps = (params) => ({
      className: "tag",
      disabled,
      ...getTagProps(params),
    });

    if (renderTags) {
      startAdornment = renderTags(value, getCustomizedTagProps, ownerState);
    } else {
      startAdornment = value.map((option, index) => {
        const { key, ...customTagProps } = getCustomizedTagProps({ index });
        return (
          <Chip
            key={key}
            label={getOptionLabel(option)}
            {...customTagProps}
            {...externalForwardedProps.slotProps.chip}
          />
        );
      });
    }
  }

  if (limitTags > -1 && Array.isArray(startAdornment)) {
    const more = startAdornment.length - limitTags;
    if (!focused && more > 0) {
      startAdornment = startAdornment.splice(0, limitTags);
      startAdornment.push(
        <span className='tag' key={startAdornment.length}>
          {getLimitTagsText(more)}
        </span>
      );
    }
  }

  const defaultRenderGroup = (params) => (
    <li key={params.key}>
      <AutocompleteGroupLabel className='groupLabel' ownerState={ownerState} component='div'>
        {params.group}
      </AutocompleteGroupLabel>
      <AutocompleteGroupUl className='groupUl' ownerState={ownerState}>
        {params.children}
      </AutocompleteGroupUl>
    </li>
  );

  const renderGroup = renderGroupProp || defaultRenderGroup;
  const defaultRenderOption = (props2, option) => {
    // Need to clearly apply key because of https://github.com/vercel/next.js/issues/55642
    const { key, ...otherProps } = props2;
    return (
      <li key={key} {...otherProps}>
        {getOptionLabel(option)}
      </li>
    );
  };
  const renderOption = renderOptionProp || defaultRenderOption;

  const renderListOption = (option, index) => {
    const optionProps = getOptionProps({ option, index });

    return renderOption(
      { ...optionProps, className: "option" },
      option,
      {
        selected: optionProps["aria-selected"],
        index,
        inputValue,
      },
      ownerState
    );
  };

  const clearIndicatorSlotProps = externalForwardedProps.slotProps.clearIndicator;
  const popupIndicatorSlotProps = externalForwardedProps.slotProps.popupIndicator;

  const renderAutocompletePopperChildren = (children) => (
    <AutocompletePopper as={PopperSlot} {...popperProps}>
      <AutocompletePaper as={PaperSlot} {...paperProps}>
        {children}
      </AutocompletePaper>
    </AutocompletePopper>
  );

  let autocompletePopper = null;
  if (groupedOptions.length > 0) {
    autocompletePopper = renderAutocompletePopperChildren(
      <AutocompleteListbox as={ListboxSlot} {...listboxProps}>
        {groupedOptions.map((option, index) => {
          if (groupBy) {
            return renderGroup({
              key: option.key,
              group: option.group,
              children: option.options.map((option2, index2) =>
                renderListOption(option2, option.index + index2)
              ),
            });
          }
          return renderListOption(option, index);
        })}
      </AutocompleteListbox>
    );
  } else if (loading && groupedOptions.length === 0) {
    autocompletePopper = renderAutocompletePopperChildren(
      <AutocompleteLoading className={classes.loading} ownerState={ownerState}>
        {loadingText}
      </AutocompleteLoading>
    );
  } else if (groupedOptions.length === 0 && !freeSolo && !loading) {
    autocompletePopper = renderAutocompletePopperChildren(
      <AutocompleteNoOptions
        className={classes.noOptions}
        ownerState={ownerState}
        role='presentation'
        onMouseDown={(event) => {
          // Prevent input blur when interacting with the "no options" content
          event.preventDefault();
        }}
      >
        {noOptionsText}
      </AutocompleteNoOptions>
    );
  }

  return (
    <React.Fragment>
      <AutocompleteRoot
        ref={ref}
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        {...getRootProps(other)}
      >
        {renderInput({
          id,
          disabled,
          fullWidth: true,
          size: size === "small" ? "small" : undefined,
          InputLabelProps: getInputLabelProps(),
          InputProps: {
            ref: setAnchorEl,
            className: classes.inputRoot,
            startAdornment,
            onClick: (event) => {
              if (event.target === event.currentTarget) {
                handleInputMouseDown(event);
              }
            },
            ...((hasClearIcon || hasPopupIcon) && {
              endAdornment: (
                <AutocompleteEndAdornment>
                  {hasClearIcon ? (
                    <AutocompleteClearIndicator {...getClearProps()} {...clearIndicatorSlotProps}>
                      {clearIcon}
                    </AutocompleteClearIndicator>
                  ) : null}

                  {hasPopupIcon ? (
                    <AutocompletePopupIndicator
                      {...getPopupIndicatorProps()}
                      disabled={disabled}
                      {...popupIndicatorSlotProps}
                    >
                      {popupIcon}
                    </AutocompletePopupIndicator>
                  ) : null}
                </AutocompleteEndAdornment>
              ),
            }),
          },
          inputProps: {
            className: "input",
            disabled,
            ...getInputProps(),
          },
        })}
      </AutocompleteRoot>
      {anchorEl ? autocompletePopper : null}
    </React.Fragment>
  );
};

export default Autocomplete;

export interface AutocompleteProps extends UseAutocompleteProps {
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * If `true`, the component is in a loading state.
   * This shows the `loadingText` in place of suggestions (only if there are no suggestions to show, for example `options` are empty).
   * @default false
   */
  loading?: boolean;
  /**
   * Text to display when in a loading state.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Loading…'
   */
  loadingText?: React.ReactNode;
  /**
   * The maximum number of tags that will be visible when not focused.
   * Set `-1` to disable the limit.
   * @default -1
   */
  limitTags?: number;
  /**
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'No options'
   */
  noOptionsText?: React.ReactNode;
}

export interface CreateFilterOptionsConfig<Value> {
  ignoreAccents?: boolean;
  ignoreCase?: boolean;
  limit?: number;
  matchFrom?: "any" | "start";
  stringify?: (option: Value) => string;
  trim?: boolean;
}

export interface FilterOptionsState<Value> {
  inputValue: string;
  getOptionLabel: (option: Value) => string;
}

export interface AutocompleteGroupedOption<Value = string> {
  key: number;
  index: number;
  group: string;
  options: Value[];
}

export type AutocompleteFreeSoloValueMapping<FreeSolo> = FreeSolo extends true ? string : never;

export interface UseAutocompleteProps {
  /**
   * If `true`, the portion of the selected suggestion that the user hasn't typed,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   * @default false
   */
  autoComplete?: boolean;
  /**
   * If `true`, the first option is automatically highlighted.
   * @default false
   */
  autoHighlight?: boolean;
  /**
   * If `true`, the selected option becomes the value of the input
   * when the Autocomplete loses focus unless the user chooses
   * a different option or changes the character string in the input.
   *
   * When using the `freeSolo` mode, the typed value will be the input value
   * if the Autocomplete loses focus without highlighting an option.
   * @default false
   */
  autoSelect?: boolean;
  /**
   * The default value. Use when the component is not controlled.
   * @default props.multiple ? [] : null
   */
  defaultValue?: any[];
  /**
   * If `true`, the popup won't close when a value is selected.
   * @default false
   */
  disableCloseOnSelect?: boolean;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, hide the selected options from the list box.
   * @default false
   */
  filterSelectedOptions?: boolean;
  /**
   * Used to determine the disabled state for a given option.
   *
   * @param {Value} option The option to test.
   * @returns {boolean}
   */
  getOptionDisabled?: (option: any) => boolean;

  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide an id it will fall back to a randomly generated one.
   */
  id?: string;
  /**
   * The input value.
   */
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
  isOptionEqualToValue?: (option: any, value: any) => boolean;
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple?: boolean;
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {Value|Value[]} value The new value of the component.
   * @param {string} reason One of "createOption", "selectOption", "removeOption", "blur" or "clear".
   * @param {string} [details]
   */
  onChange?: () => void;
  /**
   * Callback fired when the input value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`, `"blur"`, `"selectOption"`, `"removeOption"`
   */
  onInputChange?: () => void;
  /**
   * A list of options that will be shown in the Autocomplete.
   */
  options: any[];
  /**
   * The value of the autocomplete.
   *
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the `isOptionEqualToValue` prop.
   */
  value?: any;
}

export interface UseAutocompleteParameters extends UseAutocompleteProps {}

export interface UseAutocompleteRenderedOption<Value> {
  option: Value;
  index: number;
}

export interface UseAutocompleteReturnValue {
  /**
   * The input value.
   */
  inputValue: string;
  /**
   * The value of the autocomplete.
   */
  value: any;
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
}

export const createFilterOptions = () => {
  return (options, { inputValue, getOptionLabel }) => {
    const input = inputValue.trim().toLowerCase();
    const filteredOptions = !input
      ? options
      : options.filter((option) => {
          const candidate = getOptionLabel(option).toLowerCase();

          return candidate.includes(input);
        });

    return filteredOptions;
  };
};

const defaultFilterOptions = createFilterOptions();

const MULTIPLE_DEFAULT_VALUE = [];

function useAutocomplete(props: UseAutocompleteParameters) {
  const {
    defaultValue = props.multiple ? MULTIPLE_DEFAULT_VALUE : null,
    disableCloseOnSelect = false,
    disabled: disabledProp,
    isOptionEqualToValue = (option, value) => option === value,
    multiple = false,
    onChange,
    onInputChange,
    options,
  } = props;

  const getOptionLabel = (option) => {
    return option.label ?? option;
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [value, setValueState] = React.useState(defaultValue);
  const [inputValue, setInputValueState] = React.useState("");

  const resetInputValue = React.useCallback(
    (event, newValue) => {
      const isOptionSelected = multiple ? value.length < newValue.length : newValue !== null;
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
        onInputChange(event, newInputValue);
      }
    },
    [getOptionLabel, inputValue, multiple, onInputChange, setInputValueState, value]
  );

  const [open, setOpenState] = React.useState(false);

  const [inputPristine, setInputPristine] = React.useState(true);

  const inputValueIsSelectedValue =
    !multiple && value != null && inputValue === getOptionLabel(value);

  const popupOpen = open;

  const filteredOptions = popupOpen
    ? defaultFilterOptions(options, {
        inputValue: inputValueIsSelectedValue && inputPristine ? "" : inputValue,
        getOptionLabel,
      })
    : [];

  const handleOpen = () => {
    if (open) {
      return;
    }

    setOpenState(true);
    setInputPristine(true);

    if (onOpen) {
      onOpen();
    }
  };

  const handleClose = () => {
    if (!open) {
      return;
    }

    setOpenState(false);
  };

  const handleValue = (event, newValue) => {
    if (multiple) {
      if (value.length === newValue.length && value.every((val, i) => val === newValue[i])) {
        return;
      }
    } else if (value === newValue) {
      return;
    }

    if (onChange) {
      onChange(event, newValue);
    }

    setValueState(newValue);
  };

  const selectNewValue = (event, option) => {
    let newValue = option;

    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];

      const itemIndex = newValue.findIndex((valueItem) => isOptionEqualToValue(option, valueItem));

      if (itemIndex === -1) {
        newValue.push(option);
      }
    }

    resetInputValue(event, newValue);

    handleValue(event, newValue);
    if (!disableCloseOnSelect && (!event || (!event.ctrlKey && !event.metaKey))) {
      handleClose();
    }
  };

  const handleClear = (event) => {
    setInputValueState("");

    if (onInputChange) {
      onInputChange(event, "");
    }

    handleValue(event, multiple ? [] : null);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (inputValue !== newValue) {
      setInputValueState(newValue);
      setInputPristine(false);

      if (onInputChange) {
        onInputChange(event, newValue, "input");
      }
    }

    if (newValue === "") {
      if (!multiple) {
        handleValue(event, null);
      }
    } else {
      handleOpen();
    }
  };

  const handleOptionClick = (event) => {
    const index = Number(event.currentTarget.getAttribute("data-option-index"));
    selectNewValue(event, filteredOptions[index]);
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
    // Prevent focusing the input if click is anywhere outside the Autocomplete
    if (!event.currentTarget.contains(event.target)) {
      return;
    }

    firstFocus.current = false;
  };

  let dirty = multiple ? value.length > 0 : value !== null;

  return {
    getRootProps: (other = {}) => ({
      ...other,
      onClick: handleClick,
    }),
    getInputProps: () => ({
      value: inputValue,
      onChange: handleInputChange,
      disabled: disabledProp,
    }),
    getClearProps: () => ({
      onClick: handleClear,
    }),
    getPopupIndicatorProps: () => ({
      onClick: handlePopupIndicator,
    }),
    getOptionProps: ({ index, option }) => {
      return {
        key: getOptionLabel(option),
        onClick: handleOptionClick,
      };
    },
    inputValue,
    value,
    dirty,
    expanded: popupOpen && anchorEl,
    popupOpen,
    anchorEl,
    setAnchorEl,
  };
}
export default useAutocomplete;
