'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import capitalize from '../utils/capitalize';
import formHelperTextClasses, { getFormHelperTextUtilityClasses } from './formHelperTextClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, contained, size, disabled, error, filled, focused, required } = ownerState;
  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      error && 'error',
      size && `size${capitalize(size)}`,
      contained && 'contained',
      focused && 'focused',
      filled && 'filled',
      required && 'required',
    ],
  };

  return composeClasses(slots, getFormHelperTextUtilityClasses, classes);
};

const FormHelperTextRoot = styled('p', {
  name: 'MuiFormHelperText',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.size && styles[`size${capitalize(ownerState.size)}`],
      ownerState.contained && styles.contained,
      ownerState.filled && styles.filled,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.secondary,
    ...theme.typography.caption,
    textAlign: 'left',
    marginTop: 3,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    [`&.${formHelperTextClasses.disabled}`]: {
      color: (theme.vars || theme).palette.text.disabled,
    },
    [`&.${formHelperTextClasses.error}`]: {
      color: (theme.vars || theme).palette.error.main,
    },
    variants: [
      {
        props: {
          size: 'small',
        },
        style: {
          marginTop: 4,
        },
      },
      {
        props: ({ ownerState }) => ownerState.contained,
        style: {
          marginLeft: 14,
          marginRight: 14,
        },
      },
    ],
  })),
);

const FormHelperText = React.forwardRef(function FormHelperText(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiFormHelperText' });
  const {
    children,
    className,
    component = 'p',
    disabled,
    error,
    filled,
    focused,
    margin,
    required,
    variant,
    ...other
  } = props;

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['variant', 'size', 'disabled', 'error', 'filled', 'focused', 'required'],
  });

  const ownerState = {
    ...props,
    component,
    contained: fcs.variant === 'filled' || fcs.variant === 'outlined',
    variant: fcs.variant,
    size: fcs.size,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required,
  };

  // This issue explains why this is required: https://github.com/mui/material-ui/issues/42184
  delete ownerState.ownerState;

  const classes = useUtilityClasses(ownerState);

  return (
    <FormHelperTextRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
      ownerState={ownerState}
    >
      {children === ' ' ? (
        // notranslate needed while Google Translate will not fix zero-width space issue
        <span className="notranslate">&#8203;</span>
      ) : (
        children
      )}
    </FormHelperTextRoot>
  );
});

FormHelperText.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled: PropTypes.bool,
  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused: PropTypes.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense']),
  /**
   * If `true`, the helper text should use required classes key.
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
  /**
   * The variant to use.
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['filled', 'outlined', 'standard']),
    PropTypes.string,
  ]),
};

export default FormHelperText;

import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../mui/mui-material/src/styles';
import { FormHelperTextClasses } from './formHelperTextClasses';

export interface FormHelperTextPropsVariantOverrides {}

export interface FormHelperTextOwnProps {
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FormHelperTextClasses>;
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled?: boolean;
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled?: boolean;
  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused?: boolean;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense';
  /**
   * If `true`, the helper text should use required classes key.
   */
  required?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The variant to use.
   */
  variant?: OverridableStringUnion<
    'standard' | 'outlined' | 'filled',
    FormHelperTextPropsVariantOverrides
  >;
}

export interface FormHelperTextTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'p',
> {
  props: AdditionalProps & FormHelperTextOwnProps;
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Text Field](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [FormHelperText API](https://mui.com/material-ui/api/form-helper-text/)
 */
declare const FormHelperText: OverridableComponent<FormHelperTextTypeMap>;

export type FormHelperTextProps<
  RootComponent extends React.ElementType = FormHelperTextTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<FormHelperTextTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default FormHelperText;
