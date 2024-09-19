type OptionType = {
  value: string;
  title: string;
};

type OptionProps = {
  value: OptionType['value'];
  title: OptionType['title'];
  selected: OptionType['value'];
  groupName: string;
  onChange?: (value: string) => void;
};

const Option = (props: OptionProps) => {
  const {
    value,
    title,
    selected,
    groupName,
    onChange
  } = props;

const handleChange = () => onChange?.(value);

const inputId = `${groupName}_radio_item_with_value__${value}`;
const isChecked = value === selected;

return (
  <div
    className={Styles.item}
    key={value}
    data-checked={isChecked}
  >
    <input
      className={Styles.input}
      type="radio"
      name={groupName}
      id={inputId}
      value={value}
      onChange={handleChange}
    />
    <label className={Styles.label} htmlFor={inputId}>
      {title}
    </label>
  </div>
);
};
export default Option