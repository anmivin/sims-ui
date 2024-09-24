import * as React from 'react';

import styled from '@emotion/styled';
import clsx from 'clsx';

export interface TabOwnProps {
  disabled?: boolean;
  icon?: string | React.ReactElement<unknown>;
  iconPosition?: 'top' | 'bottom' | 'start' | 'end';
  label?: React.ReactNode;
  value?: any;
  onClick?: (val: any) => void
  selected?: boolean
  onChange?: () => void 
}

const TabRoot = styled('button')({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  outline: 0,
  margin: 0,
  border: 0,
  borderRadius: 0,
  cursor: "pointer",
  textDecoration: "none",
  color: "blue",

  "-disabled": {
    pointerEvents: "none",
    cursor: "default",
  },
    maxWidth: 360,
    minWidth: 90,

    minHeight: 48,
    flexShrink: 0,
    padding: '12px 16px',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textAlign: 'center',
    lineHeight: 1.25,
  });

const Tab = (props: TabOwnProps) => {
  const {
    disabled = false,
    icon: iconProp,
    iconPosition = 'top',
    label,
    onClick,
    value,
    selected,
    onChange,
    ...other
  } = props;

  const icon = iconProp;
  const handleClick = () => {
    if (onClick) {
      onClick(value);
    }
  };

  return (
    <TabRoot
      disabled={disabled}
      onClick={handleClick}
      className={clsx('tab', selected && 'selected')}
      {...other}
    >
      {iconPosition === 'top' || iconPosition === 'start' ? (
        <React.Fragment>
          {icon}
          {label}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {label}
          {icon}
        </React.Fragment>
      )}
    </TabRoot>
  );
};

export default Tab;