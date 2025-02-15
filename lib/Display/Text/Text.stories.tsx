import Text from "./Text";
export const ActionsData = {};

export default {
  component: () => (
    <div style={{ display: "flex", flexDirection: "column", width: "200px" }}>
      <Text variant='h1' noWrap>
        ляляляляляля
      </Text>
      <Text variant='h2'>ляляля</Text>
      <Text variant='h3'>ляляля</Text>
      <Text variant='h4'>ляляля</Text>
      <Text variant='h5'>ляляля</Text>
      <Text variant='h6'>ляляля</Text>
      <Text variant='subtitle1'>ляляля</Text>
      <Text variant='subtitle2'>ляляля</Text>
      <Text variant='body1'>ляляля</Text>
      <Text variant='body2'>ляляля</Text>
      <Text variant='body3'>ляляля</Text>
      <Text variant='button'>ляляля</Text>
      <Text variant='caption'>ляляля</Text>
      <Text variant='mini'>ляляля</Text>
    </div>
  ),
  title: "Text",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const s = {
  args: {},
};
