import * as React from "react";

import { darken, lighten } from "@mui/system/colorManipulator";
import styled from "@emotion/styled";
import memoTheme from "../utils/memoTheme";
import { useDefaultProps } from "../mui/mui-material/src/DefaultPropsProvider";
import useSlot from "../utils/useSlot";
import capitalize from "../utils/capitalize";
import createSimplePaletteValueFilter from "../utils/createSimplePaletteValueFilter";
import Paper from "../mui/mui-material/src/Paper";

import IconButton from "../IconButton";
import SuccessOutlinedIcon from "../internal/svg-icons/SuccessOutlined";
import ReportProblemOutlinedIcon from "../internal/svg-icons/ReportProblemOutlined";
import ErrorOutlineIcon from "../internal/svg-icons/ErrorOutline";
import InfoOutlinedIcon from "../internal/svg-icons/InfoOutlined";
import CloseIcon from "../internal/svg-icons/Close";


const AlertRoot = styled(Paper)(
{
    const getColor = theme.palette.mode === "light" ? darken : lighten;
    const getBackgroundColor = theme.palette.mode === "light" ? lighten : darken;
    return {
      ...theme.typography.body2,
      backgroundColor: "transparent",
      display: "flex",
      padding: "6px 16px",
      variants: [
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter(["light"]))
          .map(([color]) => ({
            props: { colorSeverity: color, variant: "standard" },
            style: {
              color: theme.vars
                ? theme.vars.palette.Alert[`${color}Color`]
                : getColor(theme.palette[color].light, 0.6),
              backgroundColor: theme.vars
                ? theme.vars.palette.Alert[`${color}StandardBg`]
                : getBackgroundColor(theme.palette[color].light, 0.9),
              [`& .${alertClasses.icon}`]: theme.vars
                ? { color: theme.vars.palette.Alert[`${color}IconColor`] }
                : {
                    color: theme.palette[color].main,
                  },
            },
          })),
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter(["light"]))
          .map(([color]) => ({
            props: { colorSeverity: color, variant: "outlined" },
            style: {
              color: theme.vars
                ? theme.vars.palette.Alert[`${color}Color`]
                : getColor(theme.palette[color].light, 0.6),
              border: `1px solid ${(theme.vars || theme).palette[color].light}`,
              [`& .${alertClasses.icon}`]: theme.vars
                ? { color: theme.vars.palette.Alert[`${color}IconColor`] }
                : {
                    color: theme.palette[color].main,
                  },
            },
          })),
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter(["dark"]))
          .map(([color]) => ({
            props: { colorSeverity: color, variant: "filled" },
            style: {
              fontWeight: theme.typography.fontWeightMedium,
              ...(theme.vars
                ? {
                    color: theme.vars.palette.Alert[`${color}FilledColor`],
                    backgroundColor: theme.vars.palette.Alert[`${color}FilledBg`],
                  }
                : {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? theme.palette[color].dark
                        : theme.palette[color].main,
                    color: theme.palette.getContrastText(theme.palette[color].main),
                  }),
            },
          })),
      ],
    };
  }
);

const AlertIcon = styled("div")({
  marginRight: 12,
  padding: "7px 0",
  display: "flex",
  fontSize: 22,
  opacity: 0.9,
});

const AlertMessage = styled("div")({
  padding: "8px 0",
  minWidth: 0,
  overflow: "auto",
});

const AlertAction = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  padding: "4px 0 0 16px",
  marginLeft: "auto",
  marginRight: -8,
});

const defaultIconMapping = {
  success: <SuccessOutlinedIcon fontSize='inherit' />,
  warning: <ReportProblemOutlinedIcon fontSize='inherit' />,
  error: <ErrorOutlineIcon fontSize='inherit' />,
  info: <InfoOutlinedIcon fontSize='inherit' />,
};

const Alert = React.forwardRef(function Alert(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: "MuiAlert" });
  const {
    action,
    children,
    className,
    closeText = "Close",
    color,
    icon,
    iconMapping = defaultIconMapping,
    onClose,
    role = "alert",
    severity = "success",
    variant = "standard",
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    severity,
    variant,
    colorSeverity: color || severity,
  };


  const externalForwardedProps = {
    slots: {
      closeButton: components.CloseButton,
      closeIcon: components.CloseIcon,
      ...slots,
    },
    slotProps: {
      ...componentsProps,
      ...slotProps,
    },
  };

  const [CloseButtonSlot, closeButtonProps] = useSlot("closeButton", {
    elementType: IconButton,
    externalForwardedProps,
    ownerState,
  });

  const [CloseIconSlot, closeIconProps] = useSlot("closeIcon", {
    elementType: CloseIcon,
    externalForwardedProps,
    ownerState,
  });

  return (
    <AlertRoot
      role={role}
      elevation={0}
      ownerState={ownerState}
      ref={ref}
      {...other}
    >
      {icon !== false ? (
        <AlertIcon>
          {icon || iconMapping[severity] || defaultIconMapping[severity]}
        </AlertIcon>
      ) : null}
      <AlertMessage>
        {children}
      </AlertMessage>
      {action != null ? (
        <AlertAction>
          {action}
        </AlertAction>
      ) : null}
      {action == null && onClose ? (
        <AlertAction>
          <CloseButtonSlot
            size='small'
            aria-label={closeText}
            title={closeText}
            color='inherit'
            onClick={onClose}
            {...closeButtonProps}
          >
            <CloseIconSlot fontSize='small' {...closeIconProps} />
          </CloseButtonSlot>
        </AlertAction>
      ) : null}
    </AlertRoot>
  );
});

export default Alert;

import { OverridableStringUnion } from "@mui/types";
import { PaperProps } from "../mui/mui-material/src/Paper";

export type AlertColor = "success" | "info" | "warning" | "error";

export interface AlertProps extends Omit<PaperProps, "variant">, AlertSlotsAndSlotProps {
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action?: React.ReactNode;

  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText?: string;

  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   * Set to `false` to remove the `icon`.
   */
  icon?: React.ReactNode;

  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping?: Partial<
    Record<OverridableStringUnion<AlertColor, AlertPropsColorOverrides>, React.ReactNode>
  >;
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose?: (event: React.SyntheticEvent) => void;
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant?: OverridableStringUnion<"standard" | "filled" | "outlined", AlertPropsVariantOverrides>;
}
