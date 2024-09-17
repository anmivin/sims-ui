'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import refType from '@mui/utils/refType';
import composeClasses from '@mui/utils/composeClasses';
import { useFormControl } from '../FormControl';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Typography from '../Typography';
import capitalize from '../utils/capitalize';
import formControlLabelClasses, {
  getFormControlLabelUtilityClasses,
} from './formControlLabelClasses';
import formControlState from '../FormControl/formControlState';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { classes, disabled, labelPlacement, error, required } = ownerState;
  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      `labelPlacement${capitalize(labelPlacement)}`,
      error && 'error',
      required && 'required',
    ],
    label: ['label', disabled && 'disabled'],
    asterisk: ['asterisk', error && 'error'],
  };

  return composeClasses(slots, getFormControlLabelUtilityClasses, classes);
};

export const FormControlLabelRoot = styled('label', {
  name: 'MuiFormControlLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${formControlLabelClasses.label}`]: styles.label },
      styles.root,
      styles[`labelPlacement${capitalize(ownerState.labelPlacement)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    // For correct alignment with the text.
    verticalAlign: 'middle',
    WebkitTapHighlightColor: 'transparent',
    marginLeft: -11,
    marginRight: 16, // used for row presentation of radio/checkbox
    [`&.${formControlLabelClasses.disabled}`]: {
      cursor: 'default',
    },
    [`& .${formControlLabelClasses.label}`]: {
      [`&.${formControlLabelClasses.disabled}`]: {
        color: (theme.vars || theme).palette.text.disabled,
      },
    },
    variants: [
      {
        props: { labelPlacement: 'start' },
        style: {
          flexDirection: 'row-reverse',
          marginRight: -11,
        },
      },
      {
        props: { labelPlacement: 'top' },
        style: {
          flexDirection: 'column-reverse',
        },
      },
      {
        props: { labelPlacement: 'bottom' },
        style: {
          flexDirection: 'column',
        },
      },
      {
        props: ({ labelPlacement }) =>
          labelPlacement === 'start' || labelPlacement === 'top' || labelPlacement === 'bottom',
        style: {
          marginLeft: 16, // used for row presentation of radio/checkbox
        },
      },
    ],
  })),
);

const AsteriskComponent = styled('span', {
  name: 'MuiFormControlLabel',
  slot: 'Asterisk',
  overridesResolver: (props, styles) => styles.asterisk,
})(
  memoTheme(({ theme }) => ({
    [`&.${formControlLabelClasses.error}`]: {
      color: (theme.vars || theme).palette.error.main,
    },
  })),
);

/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
const FormControlLabel = React.forwardRef(function FormControlLabel(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiFormControlLabel' });
  const {
    checked,
    className,
    componentsProps = {},
    control,
    disabled: disabledProp,
    disableTypography,
    inputRef,
    label: labelProp,
    labelPlacement = 'end',
    name,
    onChange,
    required: requiredProp,
    slots = {},
    slotProps = {},
    value,
    ...other
  } = props;

  const muiFormControl = useFormControl();

  const disabled = disabledProp ?? control.props.disabled ?? muiFormControl?.disabled;
  const required = requiredProp ?? control.props.required;

  const controlProps = {
    disabled,
    required,
  };

  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach((key) => {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });

  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['error'],
  });

  const ownerState = {
    ...props,
    disabled,
    labelPlacement,
    required,
    error: fcs.error,
  };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps: {
      ...componentsProps,
      ...slotProps,
    },
  };

  const [TypographySlot, typographySlotProps] = useSlot('typography', {
    elementType: Typography,
    externalForwardedProps,
    ownerState,
  });

  let label = labelProp;
  if (label != null && label.type !== Typography && !disableTypography) {
    label = (
      <TypographySlot
        component="span"
        {...typographySlotProps}
        className={clsx(classes.label, typographySlotProps?.className)}
      >
        {label}
      </TypographySlot>
    );
  }

  return (
    <FormControlLabelRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    >
      {React.cloneElement(control, controlProps)}
      {required ? (
        <div>
          {label}
          <AsteriskComponent ownerState={ownerState} aria-hidden className={classes.asterisk}>
            &thinsp;{'*'}
          </AsteriskComponent>
        </div>
      ) : (
        label
      )}
    </FormControlLabelRoot>
  );
});

FormControlLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component appears selected.
   */
  checked: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The props used for each slot inside.
   * @default {}
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  componentsProps: PropTypes.shape({
    typography: PropTypes.object,
  }),
  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: PropTypes.element.isRequired,
  /**
   * If `true`, the control is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is rendered as it is passed without an additional typography node.
   */
  disableTypography: PropTypes.bool,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * A text or an element to be used in an enclosing label element.
   */
  label: PropTypes.node,
  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement: PropTypes.oneOf(['bottom', 'end', 'start', 'top']),
  /**
   * @ignore
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    typography: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    typography: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};

export default FormControlLabel;

import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme, InternalStandardProps as StandardProps } from '..';
import Typography, { TypographyProps } from '../Typography';
import { FormControlLabelClasses } from './formControlLabelClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface FormControlLabelSlots {
  /**
   * The component that renders the label.
   * This is unused if `disableTypography` is true.
   * @default Typography
   */
  typography: React.ElementType;
}

export type FormControlLabelSlotsAndSlotProps = CreateSlotsAndSlotProps<
  FormControlLabelSlots,
  {
    typography: SlotProps<typeof Typography, {}, FormControlLabelProps>;
  }
>;

export interface FormControlLabelProps
  extends StandardProps<React.LabelHTMLAttributes<HTMLLabelElement>, 'children' | 'onChange'>,
    FormControlLabelSlotsAndSlotProps {
  /**
   * If `true`, the component appears selected.
   */
  checked?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormControlLabelClasses>;
  /**
   * The props used for each slot inside.
   * @default {}
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  componentsProps?: {
    /**
     * Props applied to the Typography wrapper of the passed label.
     * This is unused if disableTypography is true.
     * @default {}
     */
    typography?: TypographyProps;
  };
  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: React.ReactElement<unknown, any>;
  /**
   * If `true`, the control is disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the label is rendered as it is passed without an additional typography node.
   */
  disableTypography?: boolean;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<any>;
  /**
   * A text or an element to be used in an enclosing label element.
   */
  label: React.ReactNode;
  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  name?: string;
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: (event: React.SyntheticEvent, checked: boolean) => void;
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The value of the component.
   */
  value?: unknown;
}

/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 *
 * Demos:
 *
 * - [Checkbox](https://mui.com/material-ui/react-checkbox/)
 * - [Radio Group](https://mui.com/material-ui/react-radio-button/)
 * - [Switch](https://mui.com/material-ui/react-switch/)
 *
 * API:
 *
 * - [FormControlLabel API](https://mui.com/material-ui/api/form-control-label/)
 */
export default function FormControlLabel(props: FormControlLabelProps): React.JSX.Element;
