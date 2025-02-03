export interface AutocompleteClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** State class applied to the root element if the listbox is displayed. */
  expanded: string;
  /** State class applied to the root element if focused. */
  focused: string;
  /** Styles applied to the option elements if they are keyboard focused. */
  focusVisible: string;
  /** Styles applied to the tag elements, for example the chips. */
  tag: string;
  /** Styles applied to the tag elements, for example the chips if `size="small"`. */
  tagSizeSmall: string;
  /** Styles applied to the tag elements, for example the chips if `size="medium"`. */
  tagSizeMedium: string;
  /** Styles applied when the popup icon is rendered. */
  hasPopupIcon: string;
  /** Styles applied when the clear icon is rendered. */
  hasClearIcon: string;
  /** Styles applied to the Input element. */
  inputRoot: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the input element if the input is focused. */
  inputFocused: string;
  /** Styles applied to the endAdornment element. */
  endAdornment: string;
  /** Styles applied to the clear indicator. */
  clearIndicator: string;
  /** Styles applied to the popup indicator. */
  popupIndicator: string;
  /** Styles applied to the popup indicator if the popup is open. */
  popupIndicatorOpen: string;
  /** Styles applied to the popper element. */
  popper: string;
  /** Styles applied to the popper element if `disablePortal={true}`. */
  popperDisablePortal: string;
  /** Styles applied to the Paper component. */
  paper: string;
  /** Styles applied to the listbox component. */
  listbox: string;
  /** Styles applied to the loading wrapper. */
  loading: string;
  /** Styles applied to the no option wrapper. */
  noOptions: string;
  /** Styles applied to the option elements. */
  option: string;
  /** Styles applied to the group's label elements. */
  groupLabel: string;
  /** Styles applied to the group's ul elements. */
  groupUl: string;
}

export type AutocompleteClassKey = keyof AutocompleteClasses;

export function getAutocompleteUtilityClass(slot: string): string {
  return generateUtilityClass("MuiAutocomplete", slot);
}

const autocompleteClasses: AutocompleteClasses = generateUtilityClasses("MuiAutocomplete", [
  "root",
  "expanded",
  "fullWidth",
  "focused",
  "focusVisible",
  "tag",
  "tagSizeSmall",
  "tagSizeMedium",
  "hasPopupIcon",
  "hasClearIcon",
  "inputRoot",
  "input",
  "inputFocused",
  "endAdornment",
  "clearIndicator",
  "popupIndicator",
  "popupIndicatorOpen",
  "popper",
  "popperDisablePortal",
  "paper",
  "listbox",
  "loading",
  "noOptions",
  "option",
  "groupLabel",
  "groupUl",
]);

export default function generateUtilityClasses<T extends string>(
  componentName: string,
  slots: T[],
  globalStatePrefix = "Mui"
): Record<T, string> {
  const result: Record<string, string> = {};

  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
  });

  return result;
}

import ClassNameGenerator from "../ClassNameGenerator";

export type GlobalStateSlot = keyof typeof globalStateClasses;

export const globalStateClasses = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected",
};

export default function generateUtilityClass(
  componentName: string,
  slot: string,
  globalStatePrefix = "Mui"
): string {
  const globalStateClass = globalStateClasses[slot as GlobalStateSlot];
  return globalStateClass
    ? `${globalStatePrefix}-${globalStateClass}`
    : `${ClassNameGenerator.generate(componentName)}-${slot}`;
}

export function isGlobalState(slot: string) {
  return globalStateClasses[slot as GlobalStateSlot] !== undefined;
}

const defaultGenerator = (componentName: string) => componentName;

const createClassNameGenerator = () => {
  let generate = defaultGenerator;
  return {
    configure(generator: typeof generate) {
      generate = generator;
    },
    generate(componentName: string) {
      return generate(componentName);
    },
    reset() {
      generate = defaultGenerator;
    },
  };
};

const ClassNameGenerator = createClassNameGenerator();

export default ClassNameGenerator;
