import Tooltip from "./Tooltip";
import { TooltipProps } from "./Tooltip.types";

export default {
  component: (props: TooltipProps) => (
    <Tooltip {...props}>
      <div style={{ margin: "20px", padding: "4px", border: "1px solid black" }}>привет</div>
    </Tooltip>
  ),
  title: "Tooltip",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
};

export const Old = {
  args: {
    variant: "old",
    text: "ldkl ajejjvlf ajfalo scjja",
  },
};

export const Modern = {
  args: {
    variant: "modern",
    text: "ldkl ajejjvlf ajfalo scjja",
  },
};
