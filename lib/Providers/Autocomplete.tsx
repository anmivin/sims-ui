import * as React from "react";

import useAutocomplete, { createFilterOptions } from "../useAutocomplete";
import Popper from "../Popper";
import ListSubheader from "../ListSubheader";
import Paper from "../Paper";
import IconButton from "../IconButton";
import Chip from "../Chip";
import inputClasses from "../Input/inputClasses";
import inputBaseClasses from "../InputBase/inputBaseClasses";
import outlinedInputClasses from "../OutlinedInput/outlinedInputClasses";
import filledInputClasses from "../FilledInput/filledInputClasses";
import ClearIcon from "../internal/svg-icons/Close";
import ArrowDropDownIcon from "../internal/svg-icons/ArrowDropDown";

import memoTheme from "../utils/memoTheme";
import { useDefaultProps } from "../DefaultPropsProvider";
import autocompleteClasses, { getAutocompleteUtilityClass } from "./autocompleteClasses";
import capitalize from "../utils/capitalize";
import useSlot from "../utils/useSlot";
import styled from "@emotion/styled";
const useUtilityClasses = (ownerState) => {
  const {
    classes,
    disablePortal,
    expanded,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused,
    popupOpen,
    size,
  } = ownerState;

  const slots = {
    root: [
      "root",
      expanded && "expanded",
      focused && "focused",
      fullWidth && "fullWidth",
      hasClearIcon && "hasClearIcon",
      hasPopupIcon && "hasPopupIcon",
    ],
    inputRoot: ["inputRoot"],
    input: ["input", inputFocused && "inputFocused"],
    tag: ["tag", `tagSize${capitalize(size)}`],
    endAdornment: ["endAdornment"],
    clearIndicator: ["clearIndicator"],
    popupIndicator: ["popupIndicator", popupOpen && "popupIndicatorOpen"],
    popper: ["popper", disablePortal && "popperDisablePortal"],
    paper: ["paper"],
    listbox: ["listbox"],
    loading: ["loading"],
    noOptions: ["noOptions"],
    option: ["option"],
    groupLabel: ["groupLabel"],
    groupUl: ["groupUl"],
  };

  return composeClasses(slots, getAutocompleteUtilityClass, classes);
};

const AutocompleteRoot = styled("div", {
  name: "MuiAutocomplete",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    const { fullWidth, hasClearIcon, hasPopupIcon, inputFocused, size } = ownerState;

    return [
      { [`& .${autocompleteClasses.tag}`]: styles.tag },
      { [`& .${autocompleteClasses.tag}`]: styles[`tagSize${capitalize(size)}`] },
      { [`& .${autocompleteClasses.inputRoot}`]: styles.inputRoot },
      { [`& .${autocompleteClasses.input}`]: styles.input },
      { [`& .${autocompleteClasses.input}`]: inputFocused && styles.inputFocused },
      styles.root,
      fullWidth && styles.fullWidth,
      hasPopupIcon && styles.hasPopupIcon,
      hasClearIcon && styles.hasClearIcon,
    ];
  },
})({
  [`&.${autocompleteClasses.focused} .${autocompleteClasses.clearIndicator}`]: {
    visibility: "visible",
  },
  /* Avoid double tap issue on iOS */
  "@media (pointer: fine)": {
    [`&:hover .${autocompleteClasses.clearIndicator}`]: {
      visibility: "visible",
    },
  },
  [`& .${autocompleteClasses.tag}`]: {
    margin: 3,
    maxWidth: "calc(100% - 6px)",
  },
  [`& .${autocompleteClasses.inputRoot}`]: {
    [`.${autocompleteClasses.hasPopupIcon}&, .${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 26 + 4,
    },
    [`.${autocompleteClasses.hasPopupIcon}.${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 52 + 4,
    },
    [`& .${autocompleteClasses.input}`]: {
      width: 0,
      minWidth: 30,
    },
  },
  [`& .${inputClasses.root}`]: {
    paddingBottom: 1,
    "& .MuiInput-input": {
      padding: "4px 4px 4px 0px",
    },
  },
  [`& .${inputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
    [`& .${inputClasses.input}`]: {
      padding: "2px 4px 3px 0",
    },
  },
  [`& .${outlinedInputClasses.root}`]: {
    padding: 9,
    [`.${autocompleteClasses.hasPopupIcon}&, .${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9,
    },
    [`.${autocompleteClasses.hasPopupIcon}.${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9,
    },
    [`& .${autocompleteClasses.input}`]: {
      padding: "7.5px 4px 7.5px 5px",
    },
    [`& .${autocompleteClasses.endAdornment}`]: {
      right: 9,
    },
  },
  [`& .${outlinedInputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
    // Don't specify paddingRight, as it overrides the default value set when there is only
    // one of the popup or clear icon as the specificity is equal so the latter one wins
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 6,
    [`& .${autocompleteClasses.input}`]: {
      padding: "2.5px 4px 2.5px 8px",
    },
  },
  [`& .${filledInputClasses.root}`]: {
    paddingTop: 19,
    paddingLeft: 8,
    [`.${autocompleteClasses.hasPopupIcon}&, .${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9,
    },
    [`.${autocompleteClasses.hasPopupIcon}.${autocompleteClasses.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9,
    },
    [`& .${filledInputClasses.input}`]: {
      padding: "7px 4px",
    },
    [`& .${autocompleteClasses.endAdornment}`]: {
      right: 9,
    },
  },
  [`& .${filledInputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
    paddingBottom: 1,
    [`& .${filledInputClasses.input}`]: {
      padding: "2.5px 4px",
    },
  },
  [`& .${inputBaseClasses.hiddenLabel}`]: {
    paddingTop: 8,
  },
  [`& .${filledInputClasses.root}.${inputBaseClasses.hiddenLabel}`]: {
    paddingTop: 0,
    paddingBottom: 0,
    [`& .${autocompleteClasses.input}`]: {
      paddingTop: 16,
      paddingBottom: 17,
    },
  },
  [`& .${filledInputClasses.root}.${inputBaseClasses.hiddenLabel}.${inputBaseClasses.sizeSmall}`]: {
    [`& .${autocompleteClasses.input}`]: {
      paddingTop: 8,
      paddingBottom: 9,
    },
  },
  [`& .${autocompleteClasses.input}`]: {
    flexGrow: 1,
    textOverflow: "ellipsis",
    opacity: 0,
  },
  variants: [
    {
      props: { fullWidth: true },
      style: { width: "100%" },
    },
    {
      props: { size: "small" },
      style: {
        [`& .${autocompleteClasses.tag}`]: {
          margin: 2,
          maxWidth: "calc(100% - 4px)",
        },
      },
    },
    {
      props: { inputFocused: true },
      style: {
        [`& .${autocompleteClasses.input}`]: {
          opacity: 1,
        },
      },
    },
    {
      props: { multiple: true },
      style: {
        [`& .${autocompleteClasses.inputRoot}`]: {
          flexWrap: "wrap",
        },
      },
    },
  ],
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
  variants: [
    {
      props: { popupOpen: true },
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
});

const AutocompletePopper = styled(Popper)(
  memoTheme(({ theme }) => ({
    zIndex: (theme.vars || theme).zIndex.modal,
    variants: [
      {
        props: { disablePortal: true },
        style: {
          position: "absolute",
        },
      },
    ],
  }))
);

const AutocompletePaper = styled(Paper)({
  ...theme.typography.body1,
  overflow: "auto",
});

const AutocompleteLoading = styled("div")({
  color: (theme.vars || theme).palette.text.secondary,
  padding: "14px 16px",
});

const AutocompleteNoOptions = styled("div")({
  color: (theme.vars || theme).palette.text.secondary,
  padding: "14px 16px",
});

const AutocompleteListbox = styled("div")({
  listStyle: "none",
  margin: 0,
  padding: "8px 0",
  maxHeight: "40vh",
  overflow: "auto",
  position: "relative",
  [`& .${autocompleteClasses.option}`]: {
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
    [theme.breakpoints.up("sm")]: {
      minHeight: "auto",
    },
    [`&.${autocompleteClasses.focused}`]: {
      backgroundColor: (theme.vars || theme).palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    '&[aria-disabled="true"]': {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
      pointerEvents: "none",
    },
    [`&.${autocompleteClasses.focusVisible}`]: {
      backgroundColor: (theme.vars || theme).palette.action.focus,
    },
    '&[aria-selected="true"]': {
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
        : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      [`&.${autocompleteClasses.focused}`]: {
        backgroundColor: theme.vars
          ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
          : alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
            ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: (theme.vars || theme).palette.action.selected,
        },
      },
      [`&.${autocompleteClasses.focusVisible}`]: {
        backgroundColor: theme.vars
          ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))`
          : alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity
            ),
      },
    },
  },
});

const AutocompleteGroupLabel = styled(ListSubheader)({
  backgroundColor: (theme.vars || theme).palette.background.paper,
  top: -8,
});

const AutocompleteGroupUl = styled("ul")({
  padding: 0,
  [`& .${autocompleteClasses.option}`]: {
    paddingLeft: 24,
  },
});

export { createFilterOptions };

const Autocomplete = React.forwardRef(function Autocomplete(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: "MuiAutocomplete" });

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    ChipProps: ChipPropsProp,
    className,
    clearIcon = <ClearIcon fontSize='small' />,
    clearOnBlur = !props.freeSolo,
    clearText = "Clear",
    closeText = "Close",
    componentsProps,
    defaultValue = props.multiple ? [] : null,
    disableCloseOnSelect = false,
    disabled = false,
    disablePortal = false,
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
    ListboxComponent: ListboxComponentProp,
    ListboxProps: ListboxPropsProp,
    loading = false,
    loadingText = "Loading…",
    multiple = false,
    noOptionsText = "No options",
    onChange,
    onInputChange,
    open,
    openText = "Open",
    options,
    PaperComponent: PaperComponentProp,
    PopperComponent: PopperComponentProp,
    popupIcon = <ArrowDropDownIcon />,
    renderGroup: renderGroupProp,
    renderInput,
    renderOption: renderOptionProp,
    renderTags,
    slots = {},
    slotProps = {},
    value: valueProp,
    ...other
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const {
    getRootProps,
    getInputProps,
    getInputLabelProps,
    getPopupIndicatorProps,
    getClearProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    value,
    dirty,
    expanded,
    id,
    popupOpen,
    focused,
    focusedTag,
    anchorEl,
    setAnchorEl,
    inputValue,
    groupedOptions,
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
                <AutocompleteEndAdornment className={classes.endAdornment} ownerState={ownerState}>
                  {hasClearIcon ? (
                    <AutocompleteClearIndicator
                      {...getClearProps()}
                      aria-label={clearText}
                      title={clearText}
                      ownerState={ownerState}
                      {...clearIndicatorSlotProps}
                      className={clsx(classes.clearIndicator, clearIndicatorSlotProps?.className)}
                    >
                      {clearIcon}
                    </AutocompleteClearIndicator>
                  ) : null}

                  {hasPopupIcon ? (
                    <AutocompletePopupIndicator
                      {...getPopupIndicatorProps()}
                      disabled={disabled}
                      aria-label={popupOpen ? closeText : openText}
                      title={popupOpen ? closeText : openText}
                      ownerState={ownerState}
                      {...popupIndicatorSlotProps}
                      className={clsx(classes.popupIndicator, popupIndicatorSlotProps?.className)}
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
});

export default Autocomplete;

import { OverridableStringUnion } from "@mui/types";
import { IconButtonProps, InternalStandardProps as StandardProps, Theme } from "@mui/material";
import { ChipProps, ChipTypeMap } from "@mui/material/Chip";
import { PaperProps } from "@mui/material/Paper";
import { PopperProps } from "@mui/material/Popper";
import useAutocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteInputChangeReason,
  AutocompleteValue,
  createFilterOptions,
  UseAutocompleteProps,
  AutocompleteFreeSoloValueMapping,
} from "../useAutocomplete";
import { AutocompleteClasses } from "./autocompleteClasses";
import { CreateSlotsAndSlotProps, SlotProps } from "../utils/types";

export interface AutocompletePaperSlotPropsOverrides {}
export interface AutocompletePopperSlotPropsOverrides {}

export {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteInputChangeReason,
  AutocompleteValue,
  createFilterOptions,
};

export type AutocompleteOwnerState<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
> = AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent> & {
  disablePortal: boolean;
  expanded: boolean;
  focused: boolean;
  fullWidth: boolean;
  getOptionLabel: (option: Value | AutocompleteFreeSoloValueMapping<FreeSolo>) => string;
  hasClearIcon: boolean;
  hasPopupIcon: boolean;
  inputFocused: boolean;
  popupOpen: boolean;
  size: OverridableStringUnion<"small" | "medium", AutocompletePropsSizeOverrides>;
};

export type AutocompleteRenderGetTagProps = ({ index }: { index: number }) => {
  key: number;
  className: string;
  disabled: boolean;
  "data-tag-index": number;
  tabIndex: -1;
  onDelete: (event: any) => void;
};

export interface AutocompleteRenderOptionState {
  inputValue: string;
  index: number;
  selected: boolean;
}

export interface AutocompleteRenderGroupParams {
  key: string;
  group: string;
  children?: React.ReactNode;
}

export interface AutocompleteRenderInputParams {
  id: string;
  disabled: boolean;
  fullWidth: boolean;
  size: "small" | undefined;
  InputLabelProps: ReturnType<ReturnType<typeof useAutocomplete>["getInputLabelProps"]>;
  InputProps: {
    ref: React.Ref<any>;
    className: string;
    startAdornment: React.ReactNode;
    endAdornment: React.ReactNode;
  };
  inputProps: ReturnType<ReturnType<typeof useAutocomplete>["getInputProps"]>;
}

export interface AutocompletePropsSizeOverrides {}

export interface AutocompleteSlots {
  /**
   * The component used to render the listbox.
   * @default 'ul'
   */
  listbox: React.JSXElementConstructor<React.HTMLAttributes<HTMLElement>>;
  /**
   * The component used to render the body of the popup.
   * @default Paper
   */
  paper: React.JSXElementConstructor<PaperProps & AutocompletePaperSlotPropsOverrides>;
  /**
   * The component used to position the popup.
   * @default Popper
   */
  popper: React.JSXElementConstructor<PopperProps & AutocompletePopperSlotPropsOverrides>;
}

export type AutocompleteSlotsAndSlotProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
> = CreateSlotsAndSlotProps<
  AutocompleteSlots,
  {
    chip: SlotProps<
      React.ElementType<Partial<ChipProps<ChipComponent>>>,
      {},
      AutocompleteOwnerState<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
    >;
    clearIndicator: SlotProps<
      React.ElementType<Partial<IconButtonProps>>,
      {},
      AutocompleteOwnerState<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
    >;
    /**
     * Props applied to the Listbox element.
     */
    listbox: SlotProps<
      React.ElementType<
        ReturnType<ReturnType<typeof useAutocomplete>["getListboxProps"]> & {
          sx?: SxProps<Theme>;
          ref?: React.Ref<Element>;
        }
      >,
      {},
      AutocompleteOwnerState<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
    >;
    paper: SlotProps<
      React.ElementType<Partial<PaperProps>>,
      AutocompletePaperSlotPropsOverrides,
      AutocompleteOwnerState<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
    >;
    popper: SlotProps<
      React.ElementType<Partial<PopperProps>>,
      AutocompletePopperSlotPropsOverrides,
      AutocompleteOwnerState<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
    >;
    popupIndicator: SlotProps<
      React.ElementType<Partial<IconButtonProps>>,
      {},
      AutocompleteOwnerState<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
    >;
  }
>;

export interface AutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
> extends UseAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>,
    StandardProps<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange" | "children">,
    AutocompleteSlotsAndSlotProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent> {
  /**
   * The icon to display in place of the default clear icon.
   * @default <ClearIcon fontSize="small" />
   */
  clearIcon?: React.ReactNode;
  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Clear'
   */
  clearText?: string;
  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText?: string;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the `Popper` content will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: boolean;
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The label to display when the tags are truncated (`limitTags`).
   *
   * @param {number} more The number of truncated tags.
   * @returns {ReactNode}
   * @default (more) => `+${more}`
   */
  getLimitTagsText?: (more: number) => React.ReactNode;

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
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLDivElement> & { defaultMuiPrevented?: boolean }
  ) => void;
  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Open'
   */
  openText?: string;

  /**
   * The icon to display in place of the default popup icon.
   * @default <ArrowDropDownIcon />
   */
  popupIcon?: React.ReactNode;
  /**
   * Render the group.
   *
   * @param {AutocompleteRenderGroupParams} params The group to render.
   * @returns {ReactNode}
   */
  renderGroup?: (params: AutocompleteRenderGroupParams) => React.ReactNode;
  /**
   * Render the input.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {object} props The props to apply on the li element.
   * @param {Value} option The option to render.
   * @param {object} state The state of each option.
   * @param {object} ownerState The state of the Autocomplete component.
   * @returns {ReactNode}
   */
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement> & { key: any },
    option: Value,
    state: AutocompleteRenderOptionState,
    ownerState: AutocompleteOwnerState<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
  ) => React.ReactNode;
  /**
   * Render the selected value.
   *
   * @param {Value[]} value The `value` provided to the component.
   * @param {function} getTagProps A tag props getter.
   * @param {object} ownerState The state of the Autocomplete component.
   * @returns {ReactNode}
   */
  renderTags?: (
    value: Value[],
    getTagProps: AutocompleteRenderGetTagProps,
    ownerState: AutocompleteOwnerState<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
  ) => React.ReactNode;
}

export default function Autocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
>(
  props: AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
): React.JSX.Element;
