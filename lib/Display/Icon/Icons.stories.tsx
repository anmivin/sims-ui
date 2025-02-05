import { fn } from "@storybook/test";

import * as icons from "../../icons/index";
import * as Old from "../../icons/Old/index";
import * as Modern from "../../icons/Modern/index";
import React from "react";

export const ActionsData = {};

export default {
  component: (
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
      <icons.BookmarkCloseIcon />
      <icons.BookmarkDoneIcon />
      <icons.BookmarkIcon />
      <icons.BookmarkMinusIcon />
      <icons.BookmarkPlusIcon />
      <icons.BrushIcon />
      <icons.CameraIcon />
      <icons.CameraOffIcon />
      <icons.CameraPlusIcon />
      <icons.ChainIcon />
      <icons.CheckRectIcon />
      <icons.CheckRoundIcon />
      <icons.ChevronDownDoubleIcon />
      <icons.ChevronDownIcon />
      <icons.ChevronHorizontalIcon />
      <icons.ChevronLeftDoubleIcon />
      <icons.ChevronLeftIcon />
      <icons.ChevronRight />
      <icons.ChevronRightDoubleIcon />
      <icons.ChevronUpDoubleIcon />
      <icons.ChevronUpIcon />
      <icons.ChevronVerticalIcon />
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
      <icons.GamePadIcon />
      <icons.GiftIcon />
      <icons.GlobeIcon />
      <icons.GridIcon />
      <icons.HeartBrokenIcon />
      <icons.HeartFilledIcon />
      <icons.HeartIcon />
      <icons.HomeIcon />
      <icons.MailIcon />
      <icons.MarkerIcon />
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
      <icons.SliderIcon />
      <icons.StarIcon />
      <icons.SunIcon />
      <icons.ThumbsUpIcon />
      <icons.ToggleLeftIcon />
      <icons.ToggleRightIcon />
      <icons.ToolIcon />
      <icons.TrashIcon />
      <icons.TreeIcon />
      <icons.TwoHeartsIcon />
      <icons.UploadIcon />
      <icons.UserIcon />
      <Old.CheckBoxCross />
      <Old.CheckBoxUnchecked />
      <Old.CheckIcon />
      <Old.CloseIcon />
      <Old.InfoIcon />
      <Old.RadioCheckIcon />
      <Old.RadioUncheckedIcon />
      <Modern.CheckBoxChecked />
      <Modern.CheckBoxUnchecked />
      <Modern.CheckIcon />
      <Modern.CloseIcon />
      <Modern.RadioCheckIcon />
      <Modern.RadioUncheckedIcon />
    </div>
  ),
  title: "Icons",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};
