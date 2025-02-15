import { fn } from "@storybook/test";

import * as icons from "./index";
import * as Old from "./Old/index";
import * as Modern from "./Modern/index";

export const ActionsData = {};

export default {
  component: () => (
    <div>
      <icons.AlertBlankIcon />
      <icons.AlertCheckIcon />
      <icons.AlertCloseIcon />
      <icons.AlertDotsIcon />
      <icons.AlertExclamationIcon />
      <icons.AlertHeartIcon />
      <icons.AlertInfoIcon />
      <icons.AlertPlusIcon />
      <icons.AlertQuestionIcon />
      <icons.AwardIcon />
      <icons.BrushIcon />
      <icons.ChainIcon />
      <icons.CheckIcon />
      <icons.ChevronDownIcon />
      <icons.ChevronDoubleDownIcon />
      <icons.ChevronRight />
      <icons.ChevronUpIcon />
      <icons.ClipIcon />
      <icons.ClipTiltedIcon />
      <icons.CloseIcon />
      <icons.CursorIcon />
      <icons.DiamondIcon />
      <icons.DiceIcon />
      <icons.DollarIcon />
      <icons.DoneIcon />
      <icons.DownloadIcon />
      <icons.EditIcon />
      <icons.EraserIcon />
      <icons.EyeIcon />
      <icons.EyeOffIcon />
      <icons.ImageIcon />
      <icons.ImagePlusIcon />
      <icons.HeartBrokenIcon />
      <icons.HeartFilledIcon />
      <icons.HeartIcon />
      <icons.HomeIcon />
      <icons.MailIcon />
      <icons.MoonIcon />
      <icons.MoonStarIcon />
      <icons.PlusIcon />
      <icons.PuzzleIcon />
      <icons.RatingFilledIcon />
      <icons.RatingIcon />
      <icons.RingIcon />
      <icons.RingsCrossedIcon />
      <icons.RingsIcon />
      <icons.SaveIcon />
      <icons.SettingsIcon />
      <icons.StarIcon />
      <icons.SunIcon />
      <icons.ThumbsUpIcon />
      <icons.ToolIcon />
      <icons.TrashIcon />
      <icons.TreeIcon />
      <icons.TwoHeartsIcon />
      <icons.UploadIcon />
      <icons.UserIcon />
      <Old.CheckIcon />
      <Old.CloseIcon />
      <Modern.CheckIcon />
      <Modern.CloseIcon />
    </div>
  ),
  title: "Icon",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const s = {};
