'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import capitalize from '../utils/capitalize';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { useDefaultProps } from '../DefaultPropsProvider';
import formLabelClasses, { getFormLabelUtilityClasses } from './formLabelClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, color, focused, disabled, error, filled, required } = ownerState;
  const slots = {
    root: [
      'root',
      `color${capitalize(color)}`,
      disabled && 'disabled',
      error && 'error',
      filled && 'filled',
      focused && 'focused',
      required && 'required',
    ],
    asterisk: ['asterisk', error && 'error'],
  };

  return composeClasses(slots, getFormLabelUtilityClasses, classes);
};

export const FormLabelRoot = styled('label', {
  name: 'MuiFormLabel',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => {
    return {
      ...styles.root,
      ...(ownerState.color === 'secondary' && styles.colorSecondary),
      ...(ownerState.filled && styles.filled),
    };
  },
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.secondary,
    ...theme.typography.body1,
    lineHeight: '1.4375em',
    padding: 0,
    position: 'relative',
    variants: [
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color },
          style: {
            [`&.${formLabelClasses.focused}`]: {
              color: (theme.vars || theme).palette[color].main,
            },
          },
        })),
      {
        props: {},
        style: {
          [`&.${formLabelClasses.disabled}`]: {
            color: (theme.vars || theme).palette.text.disabled,
          },
          [`&.${formLabelClasses.error}`]: {
            color: (theme.vars || theme).palette.error.main,
          },
        },
      },
    ],
  })),
);

const AsteriskComponent = styled('span', {
  name: 'MuiFormLabel',
  slot: 'Asterisk',
  overridesResolver: (props, styles) => styles.asterisk,
})(
  memoTheme(({ theme }) => ({
    [`&.${formLabelClasses.error}`]: {
      color: (theme.vars || theme).palette.error.main,
    },
  })),
);

const FormLabel = React.forwardRef(function FormLabel(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiFormLabel' });
  const {
    children,
    className,
    color,
    component = 'label',
    disabled,
    error,
    filled,
    focused,
    required,
    ...other
  } = props;

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['color', 'required', 'focused', 'disabled', 'error', 'filled'],
  });

  const ownerState = {
    ...props,
    color: fcs.color || 'primary',
    component,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <FormLabelRoot
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {children}
      {fcs.required && (
        <AsteriskComponent ownerState={ownerState} aria-hidden className={classes.asterisk}>
          &thinsp;{'*'}
        </AsteriskComponent>
      )}
    </FormLabelRoot>
  );
});

FormLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the label should use filled classes key.
   */
  filled: PropTypes.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default FormLabel;

import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../mui/mui-material/src/styles';
import { OverridableComponent, OverrideProps, OverridableTypeMap } from '../OverridableComponent';
import { FormLabelClasses } from './formLabelClasses';

export interface FormLabelPropsColorOverrides {}

/**
 * This type is kept for compatibility. Use `FormLabelOwnProps` instead.
 */
export type FormLabelBaseProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export interface FormLabelOwnProps {
  /**
   * The content of the component.
   */
  children?: React.LabelHTMLAttributes<HTMLLabelElement>['children'];
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormLabelClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    FormLabelPropsColorOverrides
  >;
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the label should use filled classes key.
   */
  filled?: boolean;
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused?: boolean;
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface FormLabelTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'label',
> {
  props: AdditionalProps & FormLabelBaseProps & FormLabelOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Checkbox](https://mui.com/material-ui/react-checkbox/)
 * - [Radio Group](https://mui.com/material-ui/react-radio-button/)
 * - [Switch](https://mui.com/material-ui/react-switch/)
 *
 * API:
 *
 * - [FormLabel API](https://mui.com/material-ui/api/form-label/)
 */
declare const FormLabel: OverridableComponent<FormLabelTypeMap>;

export interface ExtendFormLabelTypeMap<TypeMap extends OverridableTypeMap> {
  props: TypeMap['props'] & Pick<FormLabelOwnProps, 'filled' | 'color'>;
  defaultComponent: TypeMap['defaultComponent'];
}

export type FormLabelProps<
  RootComponent extends React.ElementType = FormLabelTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<FormLabelTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default FormLabel;
