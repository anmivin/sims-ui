import React from "react";
import styled from "@emotion/styled";

const AutocompleteContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});
const Input = styled("input")({
  padding: "8px",
  border: "1px solid #ccc",
  width: "100%",
});
const Button = styled("button")({
  padding: "8px",
  border: "1px solid #ccc",
});
const OptionList = styled("div")({
  position: "absolute",
  background: "#fff",
  border: "1px solid #ccc",
  padding: "8px",
});
const Option = styled("div")({
  padding: "8px",
  cursor: "pointer",
});

const Autocomplete = ({ options, onChange }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onChange(option);
  };

  const id = `${Date.now()}`;
  return (
    <AutocompleteContainer>
      <Input id={id} value={inputValue} onChange={handleInputChange} />
      <Button id={`${id}-toggle`} onClick={handleToggleOpen}>
        Toggle
      </Button>
      {open && (
        <OptionList id={`${id}-options`}>
          {options.map((option, index) => (
            <Option
              key={index}
              id={`${id}-option-${index}`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </Option>
          ))}
        </OptionList>
      )}
    </AutocompleteContainer>
  );
};

export default Autocomplete;
