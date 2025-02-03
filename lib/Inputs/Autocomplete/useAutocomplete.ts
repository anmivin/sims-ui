import * as Types from "./Autocomplete.types";
import * as React from "react";

export const useAutocomplete = <Value extends Types.ValueType>(
  props: Types.UseAutocompleteProps<Value>
): Types.UseAutocompleteReturnValue<Value> => {
  const {
    defaultValue = props.multiple ? [] : null,
    getOptionDisabled,
    getOptionLabel = (option) => option.label,
    multiple = true,
    onChange,
    options,
  } = props;

  const [value, setValueState] = React.useState(defaultValue);
  const [inputValue, setInputValueState] = React.useState("");
  const [open, setOpenState] = React.useState(false);
  const isOptionEqualToValue = (option: Value, value: Value) => option.id === value.id;

  const resetSingleInputValue = React.useCallback(
    (newValue: Value) => {
      if (newValue === null) return;

      const optionLabel = getOptionLabel(newValue);

      if (inputValue === optionLabel) return;

      setInputValueState(optionLabel);
    },
    [getOptionLabel, inputValue, setInputValueState]
  );

  const resetMultipleInputValue = React.useCallback(
    (newValue: Value[]) => {
      if (!Array.isArray(value)) return;

      if (value.length >= newValue.length) return;

      if (inputValue === "") return;

      setInputValueState("");
    },
    [inputValue, setInputValueState, value]
  );

  const inputValueIsSelectedValue =
    !multiple && value != null && inputValue === getOptionLabel(value as Value);

  const input = (inputValueIsSelectedValue ? "" : inputValue).trim().toLowerCase();

  const filteredOptions = open
    ? options.filter((option) => (!input ? true : getOptionLabel(option).includes(input)))
    : [];

  const handleSingleValue = React.useCallback(
    (newValue: Value | null) => {
      if (value === newValue) return;
      onChange?.(newValue);
      setValueState(newValue);
    },
    [value]
  );

  const handleMultipleValue = React.useCallback(
    (newValue: Value[]) => {
      if (!Array.isArray(value)) return;
      if (value.length === newValue.length && value.every((val, i) => val === newValue[i])) return;
      onChange?.(newValue);
      setValueState(newValue);
    },
    [value]
  );

  const handleOpen = () => {
    console.log("open");
    !open && setOpenState(true);
  };

  const handleClose = () => {
    console.log("close");
    open && setOpenState(false);
  };

  const selectNewValue = (option: Value) => {
    let newSingleValue = option;
    let newMultipleValue = [option];

    if (multiple) {
      newMultipleValue = Array.isArray(value) ? value.slice() : [];

      const itemIndex = newMultipleValue.findIndex((valueItem) =>
        isOptionEqualToValue(option, valueItem)
      );

      if (itemIndex === -1) {
        newMultipleValue.push(option);
      } else {
        newMultipleValue.splice(itemIndex, 1);
      }
      resetMultipleInputValue(newMultipleValue);
      handleMultipleValue(newMultipleValue);
    } else {
      resetSingleInputValue(newSingleValue);
      handleSingleValue(newSingleValue);
    }

    handleClose();
  };

  const handleClear = () => {
    setInputValueState("");
    multiple ? handleMultipleValue([]) : handleSingleValue(null);
  };

  const handleInputChange = (newValue: string) => {
    if (inputValue !== newValue) setInputValueState(newValue);

    if (newValue === "") {
      if (!multiple) handleSingleValue(null);
    } else {
      handleOpen();
    }
  };

  const handleOptionClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const index = Number(event.currentTarget.getAttribute("data-option-index"));
    selectNewValue(filteredOptions[index]);
  };

  const handleTagDelete = (index: number) => (event) => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    handleValue(newValue, {
      option: value[index],
    });
  };

  const handlePopupIndicator = () => {
    console.log("pop");
    open ? handleClose() : handleOpen();
  };

  let dirty = inputValue.length > 0;
  dirty = dirty || (multiple ? value?.length > 0 : value !== null);

  return {
    inputValue,
    value,
    dirty,
    expanded: open,
    filteredOptions,
    valueInput: inputValue,
    onInputChange: handleInputChange,
    onMouseDown: handleOpen,
    onClickClear: handleClear,
    onClickIndicator: handlePopupIndicator,
    getTagProps: (index) => ({
      key: index,
      "data-tag-index": index,
      onDelete: handleTagDelete(index),
    }),

    getOptionProps: (option, index) => {
      HTMLLIElement;
      const selected = (multiple ? value : [value]).some(
        (value2) => value2 != null && isOptionEqualToValue(option, value2)
      );
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;

      return {
        key: `${getOptionLabel(option)}_${index}`,
        onClick: handleOptionClick,
        "data-option-index": index,
        disabled,
        selected,
      };
    },
  };
};
