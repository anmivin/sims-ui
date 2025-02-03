import * as React from "react";
import { SxProps } from "@mui/system";
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
  key: number;
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
    onMouseDown: React.MouseEventHandler;
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
   * Props applied to the [`Chip`](https://mui.com/material-ui/api/chip/) element.
   * @deprecated Use `slotProps.chip` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  ChipProps?: ChipProps<ChipComponent>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AutocompleteClasses>;
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
   * The props used for each slot inside.
   * @deprecated Use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  componentsProps?: {
    clearIndicator?: Partial<IconButtonProps>;
    paper?: PaperProps;
    popper?: Partial<PopperProps>;
    popupIndicator?: Partial<IconButtonProps>;
  };
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
   * Force the visibility display of the popup icon.
   * @default 'auto'
   */
  forcePopupIcon?: true | false | "auto";
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
   * The component used to render the listbox.
   * @default 'ul'
   * @deprecated Use `slotProps.listbox.component` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  ListboxComponent?: React.JSXElementConstructor<React.HTMLAttributes<HTMLElement>>;
  /**
   * Props applied to the Listbox element.
   * @deprecated Use `slotProps.listbox` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  ListboxProps?: ReturnType<ReturnType<typeof useAutocomplete>["getListboxProps"]> & {
    sx?: SxProps<Theme>;
    ref?: React.Ref<Element>;
  };
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
   * The component used to render the body of the popup.
   * @default Paper
   * @deprecated Use `slots.paper` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  PaperComponent?: React.JSXElementConstructor<React.HTMLAttributes<HTMLElement>>;
  /**
   * The component used to position the popup.
   * @default Popper
   * @deprecated Use `slots.popper` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  PopperComponent?: React.JSXElementConstructor<PopperProps>;
  /**
   * The icon to display in place of the default popup icon.
   * @default <ArrowDropDownIcon />
   */
  popupIcon?: React.ReactNode;
  /**
   * If `true`, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
   * @default false
   */
  readOnly?: boolean;
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
  /**
   * The size of the component.
   * @default 'medium'
   */
  size?: OverridableStringUnion<"small" | "medium", AutocompletePropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import integerPropType from "@mui/utils/integerPropType";
import chainPropTypes from "@mui/utils/chainPropTypes";
import composeClasses from "@mui/utils/composeClasses";
import { alpha } from "@mui/system/colorManipulator";
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
import { styled } from "../zero-styled";
import memoTheme from "../utils/memoTheme";
import { useDefaultProps } from "../DefaultPropsProvider";
import autocompleteClasses, { getAutocompleteUtilityClass } from "./autocompleteClasses";
import capitalize from "../utils/capitalize";
import useSlot from "../utils/useSlot";

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

const AutocompleteEndAdornment = styled("div", {
  name: "MuiAutocomplete",
  slot: "EndAdornment",
  overridesResolver: (props, styles) => styles.endAdornment,
})({
  // We use a position absolute to support wrapping tags.
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translate(0, -50%)",
});

const AutocompleteClearIndicator = styled(IconButton, {
  name: "MuiAutocomplete",
  slot: "ClearIndicator",
  overridesResolver: (props, styles) => styles.clearIndicator,
})({
  marginRight: -2,
  padding: 4,
  visibility: "hidden",
});

const AutocompletePopupIndicator = styled(IconButton, {
  name: "MuiAutocomplete",
  slot: "PopupIndicator",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.popupIndicator, ownerState.popupOpen && styles.popupIndicatorOpen];
  },
})({
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

const AutocompletePopper = styled(Popper, {
  name: "MuiAutocomplete",
  slot: "Popper",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${autocompleteClasses.option}`]: styles.option },
      styles.popper,
      ownerState.disablePortal && styles.popperDisablePortal,
    ];
  },
})(
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

const AutocompletePaper = styled(Paper, {
  name: "MuiAutocomplete",
  slot: "Paper",
  overridesResolver: (props, styles) => styles.paper,
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.body1,
    overflow: "auto",
  }))
);

const AutocompleteLoading = styled("div", {
  name: "MuiAutocomplete",
  slot: "Loading",
  overridesResolver: (props, styles) => styles.loading,
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.secondary,
    padding: "14px 16px",
  }))
);

const AutocompleteNoOptions = styled("div", {
  name: "MuiAutocomplete",
  slot: "NoOptions",
  overridesResolver: (props, styles) => styles.noOptions,
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.secondary,
    padding: "14px 16px",
  }))
);

const AutocompleteListbox = styled("ul", {
  name: "MuiAutocomplete",
  slot: "Listbox",
  overridesResolver: (props, styles) => styles.listbox,
})(
  memoTheme(({ theme }) => ({
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
  }))
);

const AutocompleteGroupLabel = styled(ListSubheader, {
  name: "MuiAutocomplete",
  slot: "GroupLabel",
  overridesResolver: (props, styles) => styles.groupLabel,
})(
  memoTheme(({ theme }) => ({
    backgroundColor: (theme.vars || theme).palette.background.paper,
    top: -8,
  }))
);

const AutocompleteGroupUl = styled("ul", {
  name: "MuiAutocomplete",
  slot: "GroupUl",
  overridesResolver: (props, styles) => styles.groupUl,
})({
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
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    ChipProps: ChipPropsProp,
    className,
    clearIcon = <ClearIcon fontSize='small' />,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    clearText = "Clear",
    closeText = "Close",
    componentsProps,
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled = false,
    disabledItemsFocusable = false,
    disableListWrap = false,
    disablePortal = false,
    filterOptions,
    filterSelectedOptions = false,
    forcePopupIcon = "auto",
    freeSolo = false,
    fullWidth = false,
    getLimitTagsText = (more) => `+${more}`,
    getOptionDisabled,
    getOptionKey,
    getOptionLabel: getOptionLabelProp,
    isOptionEqualToValue,
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    limitTags = -1,
    ListboxComponent: ListboxComponentProp,
    ListboxProps: ListboxPropsProp,
    loading = false,
    loadingText = "Loading…",
    multiple = false,
    noOptionsText = "No options",
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open,
    openOnFocus = false,
    openText = "Open",
    options,
    PaperComponent: PaperComponentProp,
    PopperComponent: PopperComponentProp,
    popupIcon = <ArrowDropDownIcon />,
    readOnly = false,
    renderGroup: renderGroupProp,
    renderInput,
    renderOption: renderOptionProp,
    renderTags,
    selectOnFocus = !props.freeSolo,
    size = "medium",
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

  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;
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
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots: {
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
    elementType: AutocompleteListbox,
    externalForwardedProps,
    ownerState,
    className: classes.listbox,
    additionalProps: otherListboxProps,
    ref: listboxRef,
  });

  const [PaperSlot, paperProps] = useSlot("paper", {
    elementType: Paper,
    externalForwardedProps,
    ownerState,
    className: classes.paper,
  });

  const [PopperSlot, popperProps] = useSlot("popper", {
    elementType: Popper,
    externalForwardedProps,
    ownerState,
    className: classes.popper,
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
      className: classes.tag,
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
            size={size}
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
        <span className={classes.tag} key={startAdornment.length}>
          {getLimitTagsText(more)}
        </span>
      );
    }
  }

  const defaultRenderGroup = (params) => (
    <li key={params.key}>
      <AutocompleteGroupLabel
        className={classes.groupLabel}
        ownerState={ownerState}
        component='div'
      >
        {params.group}
      </AutocompleteGroupLabel>
      <AutocompleteGroupUl className={classes.groupUl} ownerState={ownerState}>
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
      { ...optionProps, className: classes.option },
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
            onMouseDown: (event) => {
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
            className: classes.input,
            disabled,
            readOnly,
            ...getInputProps(),
          },
        })}
      </AutocompleteRoot>
      {anchorEl ? (
        <AutocompletePopper as={PopperSlot} {...popperProps}>
          <AutocompletePaper as={PaperSlot} {...paperProps}>
            {loading && groupedOptions.length === 0 ? (
              <AutocompleteLoading className={classes.loading} ownerState={ownerState}>
                {loadingText}
              </AutocompleteLoading>
            ) : null}
            {groupedOptions.length === 0 && !freeSolo && !loading ? (
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
            ) : null}
            {groupedOptions.length > 0 ? (
              <ListboxSlot as={ListboxComponentProp} {...listboxProps}>
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
              </ListboxSlot>
            ) : null}
          </AutocompletePaper>
        </AutocompletePopper>
      ) : null}
    </React.Fragment>
  );
});

export interface FilterOptionsState<Value> {
  inputValue: string;
  getOptionLabel: (option: Value) => string;
}

export function createFilterOptions<Value>(): (
  options: Value[],
  state: FilterOptionsState<Value>
) => Value[];

export type AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo> = Multiple extends true
  ? Array<Value | AutocompleteFreeSoloValueMapping<FreeSolo>>
  : DisableClearable extends true
  ? NonNullable<Value | AutocompleteFreeSoloValueMapping<FreeSolo>>
  : Value | null | AutocompleteFreeSoloValueMapping<FreeSolo>;

export interface UseAutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> {
  /**
   * The default value. Use when the component is not controlled.
   * @default props.multiple ? [] : null
   */
  defaultValue?: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>;
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
   * Used to determine the key for a given option.
   * This can be useful when the labels of options are not unique (since labels are used as keys by default).
   *
   * @param {Value} option The option to get the key for.
   * @returns {string | number}
   */
  getOptionKey?: (option: Value | AutocompleteFreeSoloValueMapping<FreeSolo>) => string | number;
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
  getOptionLabel?: (option: Value | AutocompleteFreeSoloValueMapping<FreeSolo>) => string;
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
  isOptionEqualToValue?: (option: Value, value: Value) => boolean;
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple?: Multiple;
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {Value|Value[]} value The new value of the component.
   * @param {string} reason One of "createOption", "selectOption", "removeOption", "blur" or "clear".
   * @param {string} [details]
   */
  onChange?: (
    event: React.SyntheticEvent,
    value: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Value>
  ) => void;
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} reason Can be: `"toggleInput"`, `"escape"`, `"selectOption"`, `"removeOption"`, `"blur"`.
   */
  onClose?: (event: React.SyntheticEvent, reason: AutocompleteCloseReason) => void;
  /**
   * Callback fired when the input value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`, `"blur"`, `"selectOption"`, `"removeOption"`
   */
  onInputChange?: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen?: (event: React.SyntheticEvent) => void;
  /**
   * If `true`, the component is shown.
   */
  open?: boolean;
  /**
   * If `true`, the popup will open on input focus.
   * @default false
   */
  openOnFocus?: boolean;
  /**
   * A list of options that will be shown in the Autocomplete.
   */
  options: ReadonlyArray<Value>;
  /**
   * If `true`, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
   * @default false
   */
  readOnly?: boolean;
  /**
   * The value of the autocomplete.
   *
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the `isOptionEqualToValue` prop.
   */
  value?: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>;
}

export interface UseAutocompleteParameters<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends UseAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo> {}

export interface AutocompleteChangeDetails<Value = string> {
  option: Value;
}

export type AutocompleteGetTagProps = ({ index }: { index: number }) => {
  key: number;
  "data-tag-index": number;
  tabIndex: -1;
  onDelete: (event: any) => void;
};

export function useAutocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
>(
  props: UseAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>
): UseAutocompleteReturnValue<Value, Multiple, DisableClearable, FreeSolo, false>;

export interface UseAutocompleteRenderedOption<Value> {
  option: Value;
  index: number;
}

export interface UseAutocompleteReturnValue<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  HasGroupBy extends boolean = false
> {
  /**
   * Resolver for the input element's props.
   * @returns props that should be spread on the input element
   */
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement> & {
    ref: React.Ref<HTMLInputElement>;
  };
  /**
   * Resolver for the input label element's props.
   * @returns props that should be spread on the input label element
   */
  getInputLabelProps: () => Omit<React.HTMLAttributes<HTMLLabelElement>, "color">;
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
   * A tag props getter.
   */
  getTagProps: AutocompleteGetTagProps;
  /**
   * Resolver for the listbox component's props.
   * @returns props that should be spread on the listbox component
   */
  getListboxProps: () => React.HTMLAttributes<HTMLUListElement>;
  /**
   * Resolver for the rendered option element's props.
   * @param renderedOption option rendered on the Autocomplete
   * @returns props that should be spread on the li element
   */
  getOptionProps: (
    renderedOption: UseAutocompleteRenderedOption<Value>
  ) => React.HTMLAttributes<HTMLLIElement> & { key: any };
  /**
   * Id for the Autocomplete.
   */
  id: string;
  /**
   * The input value.
   */
  inputValue: string;
  /**
   * The value of the autocomplete.
   */
  value: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>;
  /**
   * If `true`, the component input has some values.
   */
  dirty: boolean;
  /**
   * If `true`, the listbox is being displayed.
   */
  expanded: boolean;
  /**
   * An HTML element that is used to set the position of the component.
   */
  anchorEl: null | HTMLElement;
  /**
   * Setter for the component `anchorEl`.
   * @returns function for setting `anchorEl`
   */
  setAnchorEl: () => void;

  /**
   * The options to render.
   * - If `groupBy` is provided, the options are grouped and represented as `AutocompleteGroupedOption<Value>[]`.
   * - Otherwise, the options are represented as a flat array of `Value[]`.
   */
  groupedOptions: Value[];
}

import {
  unstable_setRef as setRef,
  unstable_useEventCallback as useEventCallback,
  unstable_useControlled as useControlled,
  unstable_useId as useId,
  usePreviousProps,
} from "@mui/utils";

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
function stripDiacritics(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function createFilterOptions(config = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = "any",
    stringify,
    trim = false,
  } = config;

  return (options, { inputValue, getOptionLabel }) => {
    let input = trim ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }

    const filteredOptions = !input
      ? options
      : options.filter((option) => {
          let candidate = (stringify || getOptionLabel)(option);
          if (ignoreCase) {
            candidate = candidate.toLowerCase();
          }
          if (ignoreAccents) {
            candidate = stripDiacritics(candidate);
          }

          return matchFrom === "start" ? candidate.startsWith(input) : candidate.includes(input);
        });

    return typeof limit === "number" ? filteredOptions.slice(0, limit) : filteredOptions;
  };
}

const defaultFilterOptions = createFilterOptions();

const defaultIsActiveElementInListbox = (listboxRef) =>
  listboxRef.current !== null && listboxRef.current.parentElement?.contains(document.activeElement);

const MULTIPLE_DEFAULT_VALUE = [];

function getInputValue(value, multiple, getOptionLabel) {
  if (multiple || value == null) {
    return "";
  }
  const optionLabel = getOptionLabel(value);
  return typeof optionLabel === "string" ? optionLabel : "";
}

function useAutocomplete(props) {
  const {
    clearOnBlur = !props.freeSolo,
    componentName = "useAutocomplete",
    defaultValue = props.multiple ? MULTIPLE_DEFAULT_VALUE : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled: disabledProp,
    filterOptions = defaultFilterOptions,
    filterSelectedOptions = false,
    freeSolo = false,
    getOptionDisabled,
    getOptionKey,
    getOptionLabel: getOptionLabelProp = (option) => option.label ?? option,
    id: idProp,
    inputValue: inputValueProp,
    isOptionEqualToValue = (option, value) => option === value,
    multiple = false,
    onChange,
    onClose,
    onInputChange,
    open: openProp,
    options,
    readOnly = false,
    selectOnFocus = !props.freeSolo,
    value: valueProp,
  } = props;

  const id = useId(idProp);

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

  // Calculate the initial inputValue on mount only.
  // Using useRef since defaultValue doesn't need to update inputValue dynamically.
  const initialInputValue = React.useRef(
    getInputValue(defaultValue, multiple, getOptionLabel)
  ).current;

  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: componentName,
  });
  const [inputValue, setInputValueState] = useControlled({
    controlled: inputValueProp,
    default: initialInputValue,
    name: componentName,
    state: "inputValue",
  });

  const [focused, setFocused] = React.useState(false);

  const resetInputValue = React.useCallback(
    (event, newValue) => {
      // retain current `inputValue` if new option isn't selected and `clearOnBlur` is false
      // When `multiple` is enabled, `newValue` is an array of all selected items including the newly selected item
      const isOptionSelected = multiple ? value.length < newValue.length : newValue !== null;
      if (!isOptionSelected && !clearOnBlur) {
        return;
      }
      const newInputValue = getInputValue(newValue, multiple, getOptionLabel);

      if (inputValue === newInputValue) {
        return;
      }

      setInputValueState(newInputValue);

      if (onInputChange) {
        onInputChange(event, newInputValue);
      }
    },
    [getOptionLabel, inputValue, multiple, onInputChange, setInputValueState, clearOnBlur, value]
  );

  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: componentName,
    state: "open",
  });

  const [inputPristine, setInputPristine] = React.useState(true);

  const inputValueIsSelectedValue =
    !multiple && value != null && inputValue === getOptionLabel(value);

  const popupOpen = open && !readOnly;

  const filteredOptions = popupOpen
    ? filterOptions(
        options.filter((option) => {
          if (
            filterSelectedOptions &&
            (multiple ? value : [value]).some(
              (value2) => value2 !== null && isOptionEqualToValue(option, value2)
            )
          ) {
            return false;
          }
          return true;
        }),
        // we use the empty string to manipulate `filterOptions` to not filter any options
        // i.e. the filter predicate always returns true
        {
          inputValue: inputValueIsSelectedValue && inputPristine ? "" : inputValue,
          getOptionLabel,
        }
      )
    : [];

  const previousProps = usePreviousProps({
    filteredOptions,
    value,
    inputValue,
  });

  React.useEffect(() => {
    const valueChange = value !== previousProps.value;

    if (focused && !valueChange) {
      return;
    }

    resetInputValue(null, value);
  }, [value, resetInputValue, focused, previousProps.value, freeSolo]);

  const handleOpen = () => {
    if (open) {
      return;
    }

    setOpenState(true);
    setInputPristine(true);

  };

  const handleClose = () => {
    if (!open) {
      return;
    }

    setOpenState(false);

    if (onClose) {
      onClose(event);
    }
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
      } else if (origin !== "freeSolo") {
        newValue.splice(itemIndex, 1);
      }
    }

    resetInputValue(event, newValue);

    handleValue(event, newValue);
    if (!disableCloseOnSelect) {
      handleClose(event);
    }
  };

  const handleClear = (event) => {
    ignoreFocus.current = true;
    setInputValueState("");

    if (onInputChange) {
      onInputChange(event, "");
    }

    handleValue(event, multiple ? [] : null);
  };

  const handleKeyDown = (other) => (event) => {
    if (other.onKeyDown) {
      other.onKeyDown(event);
    }

    if (event.defaultMuiPrevented) {
      return;
    }
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
      if (!disableClearable && !multiple) {
        handleValue(event, null);
      }
    } else {
      handleOpen(event);
    }
  };

  const handleOptionClick = (event) => {
    const index = Number(event.currentTarget.getAttribute("data-option-index"));
    selectNewValue(event, filteredOptions[index]);
  };

  const handleTagDelete = (index) => (event) => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    handleValue(event, newValue, {
      option: value[index],
    });
  };

  const handlePopupIndicator = (event) => {
    if (open) {
      handleClose(event);
    } else {
      handleOpen(event);
    }
  };

  // Prevent input blur when interacting with the combobox
  const handleMouseDown = (event) => {
    // Prevent focusing the input if click is anywhere outside the Autocomplete
    if (!event.currentTarget.contains(event.target)) {
      return;
    }
    if (event.target.getAttribute("id") !== id) {
      event.preventDefault();
    }
  };

  // Focus the input when interacting with the combobox
  const handleClick = (event) => {
    // Prevent focusing the input if click is anywhere outside the Autocomplete
    if (!event.currentTarget.contains(event.target)) {
      return;
    }
    inputRef.current.focus();

    if (
      selectOnFocus &&
      firstFocus.current &&
      inputRef.current.selectionEnd - inputRef.current.selectionStart === 0
    ) {
      inputRef.current.select();
    }

    firstFocus.current = false;
  };

  const handleInputMouseDown = (event) => {
    if (!disabledProp && (inputValue === "" || !open)) {
      handlePopupIndicator(event);
    }
  };

  let dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);

  let groupedOptions = filteredOptions;

  return {
    getRootProps: (other = {}) => ({
      ...other,
      onKeyDown: handleKeyDown(other),
      onMouseDown: handleMouseDown,
      onClick: handleClick,
    }),
    getInputLabelProps: () => ({
      id: `${id}-label`,
      htmlFor: id,
    }),
    getInputProps: () => ({
      id,
      value: inputValue,
      onChange: handleInputChange,
      onMouseDown: handleInputMouseDown,
      ref: inputRef,
      disabled: disabledProp,
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
    getTagProps: ({ index }) => ({
      key: index,
      "data-tag-index": index,
      tabIndex: -1,
      ...(!readOnly && { onDelete: handleTagDelete(index) }),
    }),
    getListboxProps: () => ({
      role: "listbox",
      id: `${id}-listbox`,
      "aria-labelledby": `${id}-label`,
      ref: handleListboxRef,
      onMouseDown: (event) => {
        // Prevent blur
        event.preventDefault();
      },
    }),
    getOptionProps: ({ index, option }) => {
      const selected = (multiple ? value : [value]).some(
        (value2) => value2 != null && isOptionEqualToValue(option, value2)
      );
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;

      return {
        key: getOptionKey?.(option) ?? getOptionLabel(option),
        tabIndex: -1,
        role: "option",
        id: `${id}-option-${index}`,
        onClick: handleOptionClick,
        "data-option-index": index,
        "aria-disabled": disabled,
        "aria-selected": selected,
      };
    },
    id,
    inputValue,
    value,
    dirty,
    expanded: popupOpen && anchorEl,
    popupOpen,
    focused: focused || focusedTag !== -1,
    anchorEl,
    setAnchorEl,
    focusedTag,
    groupedOptions,
  };
}

export default useAutocomplete;
