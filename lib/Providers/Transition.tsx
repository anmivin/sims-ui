import * as React from 'react';

import useTimeout from '../utils/useTimeout';

import getReactNodeRef from '@mui/utils/getReactNodeRef';
import { Transition } from 'react-transition-group';
import { useTheme } from '../zero-styled';

import useForkRef from '../utils/useForkRef';

import {
  TransitionProps as _TransitionProps,
  TransitionActions,
} from 'react-transition-group/Transition';

export type TransitionHandlerKeys =
  | 'onEnter'
  | 'onEntering'
  | 'onEntered'
  | 'onExit'
  | 'onExiting'
  | 'onExited';
export type TransitionHandlerProps = Pick<_TransitionProps, TransitionHandlerKeys>;

export interface EasingProps {
  easing: string | { enter?: string; exit?: string };
}

export type TransitionKeys =
  | 'in'
  | 'mountOnEnter'
  | 'unmountOnExit'
  | 'timeout'
  | 'easing'
  | 'addEndListener'
  | TransitionHandlerKeys;
export interface TransitionProps
  extends TransitionActions,
    Partial<Pick<_TransitionProps & EasingProps, TransitionKeys>>,
    React.HTMLAttributes<HTMLElement> {}

function getScale(value) {
  return `scale(${value}, ${value ** 2})`;
}

const growStyles = {
  entering: {
    opacity: 1,
    transform: getScale(1),
  },
  entered: {
    opacity: 1,
    transform: 'none',
  },
};

const Grow = React.forwardRef(function Grow(props: GrowProps, ref) {
  const {
    addEndListener,
    appear = true,
    children,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = 'auto',
    ...other
  } = props;
  const timer = useTimeout();
  const autoTimeout = React.useRef();
  const theme = useTheme();

  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(nodeRef, getReactNodeRef(children), ref);

  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;

      // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
      if (maybeIsAppearing === undefined) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };

  const handleEntering = normalizedTransitionCallback(onEntering);

  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    reflow(node); // So the animation always start from the start.

    const {
      duration: transitionDuration,
      delay,
      easing: transitionTimingFunction,
    } = getTransitionProps(
      { style, timeout, easing },
      {
        mode: 'enter',
      },
    );

    let duration;
    if (timeout === 'auto') {
      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration;
    } else {
      duration = transitionDuration;
    }

    node.style.transition = [
      theme.transitions.create('opacity', {
        duration,
        delay,
      }),
      theme.transitions.create('transform', {
        duration: isWebKit154 ? duration : duration * 0.666,
        delay,
        easing: transitionTimingFunction,
      }),
    ].join(',');

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });

  const handleEntered = normalizedTransitionCallback(onEntered);

  const handleExiting = normalizedTransitionCallback(onExiting);

  const handleExit = normalizedTransitionCallback((node) => {
    const {
      duration: transitionDuration,
      delay,
      easing: transitionTimingFunction,
    } = getTransitionProps(
      { style, timeout, easing },
      {
        mode: 'exit',
      },
    );

    let duration;
    if (timeout === 'auto') {
      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration;
    } else {
      duration = transitionDuration;
    }

    node.style.transition = [
      theme.transitions.create('opacity', {
        duration,
        delay,
      }),
      theme.transitions.create('transform', {
        duration: isWebKit154 ? duration : duration * 0.666,
        delay: isWebKit154 ? delay : delay || duration * 0.333,
        easing: transitionTimingFunction,
      }),
    ].join(',');

    node.style.opacity = 0;
    node.style.transform = getScale(0.75);

    if (onExit) {
      onExit(node);
    }
  });

  const handleExited = normalizedTransitionCallback(onExited);

  const handleAddEndListener = (next) => {
    if (timeout === 'auto') {
      timer.start(autoTimeout.current || 0, next);
    }
    if (addEndListener) {
      // Old call signature before `react-transition-group` implemented `nodeRef`
      addEndListener(nodeRef.current, next);
    }
  };

  return (
    <Transition
      appear={appear}
      in={inProp}
      nodeRef={nodeRef}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onEntering={handleEntering}
      onExit={handleExit}
      onExited={handleExited}
      onExiting={handleExiting}
      addEndListener={handleAddEndListener}
      timeout={timeout === 'auto' ? null : timeout}
      {...other}
    >
      {(state, childProps) => {
        return React.cloneElement(children, {
          style: {
            opacity: 0,
            transform: getScale(0.75),
            visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
            ...growStyles[state],
            ...style,
            ...children.props.style,
          },
          ref: handleRef,
          ...childProps,
        });
      }}
    </Transition>
  );
});

export default Grow;


export interface GrowProps extends Omit<TransitionProps, 'timeout'> {
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear?: boolean;
  /**
   * A single child content element.
   */
  children: React.ReactElement<unknown, any>;
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing?: TransitionProps['easing'];
  /**
   * If `true`, the component will transition in.
   */
  in?: boolean;
  ref?: React.Ref<unknown>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout?: TransitionProps['timeout'] | 'auto';
}




const fadeStyles = {
  entering: {
    opacity: 1,
  },
  entered: {
    opacity: 1,
  },
};

/**
 * The Fade transition is used by the [Modal](/material-ui/react-modal/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
const Fade = React.forwardRef(function Fade(props: FadeProps, ref) {
  const theme = useTheme();
  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const {
    addEndListener,
    appear = true,
    children,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = defaultTimeout,
    ...other
  } = props;

  const enableStrictModeCompat = true;
  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(nodeRef, getReactNodeRef(children), ref);

  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;

      // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
      if (maybeIsAppearing === undefined) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };

  const handleEntering = normalizedTransitionCallback(onEntering);

  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    reflow(node); // So the animation always start from the start.

    const transitionProps = getTransitionProps(
      { style, timeout, easing },
      {
        mode: 'enter',
      },
    );

    node.style.webkitTransition = theme.transitions.create('opacity', transitionProps);
    node.style.transition = theme.transitions.create('opacity', transitionProps);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });

  const handleEntered = normalizedTransitionCallback(onEntered);

  const handleExiting = normalizedTransitionCallback(onExiting);

  const handleExit = normalizedTransitionCallback((node) => {
    const transitionProps = getTransitionProps(
      { style, timeout, easing },
      {
        mode: 'exit',
      },
    );

    node.style.webkitTransition = theme.transitions.create('opacity', transitionProps);
    node.style.transition = theme.transitions.create('opacity', transitionProps);

    if (onExit) {
      onExit(node);
    }
  });

  const handleExited = normalizedTransitionCallback(onExited);

  const handleAddEndListener = (next) => {
    if (addEndListener) {
      // Old call signature before `react-transition-group` implemented `nodeRef`
      addEndListener(nodeRef.current, next);
    }
  };

  return (
    <TransitionComponent
      appear={appear}
      in={inProp}
      nodeRef={enableStrictModeCompat ? nodeRef : undefined}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onEntering={handleEntering}
      onExit={handleExit}
      onExited={handleExited}
      onExiting={handleExiting}
      addEndListener={handleAddEndListener}
      timeout={timeout}
      {...other}
    >
      {(state, childProps) => {
        return React.cloneElement(children, {
          style: {
            opacity: 0,
            visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
            ...fadeStyles[state],
            ...style,
            ...children.props.style,
          },
          ref: handleRef,
          ...childProps,
        });
      }}
    </TransitionComponent>
  );
});


export interface FadeProps extends Omit<TransitionProps, 'children'> {
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear?: boolean;
  /**
   * A single child content element.
   */
  children: React.ReactElement<unknown, any>;
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing?: TransitionProps['easing'];
  /**
   * If `true`, the component will transition in.
   */
  in?: boolean;
  ref?: React.Ref<unknown>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout?: TransitionProps['timeout'];
}
}


export const reflow = (node: Element) => node.scrollTop;

interface ComponentProps {
  easing: string | { enter?: string; exit?: string } | undefined;
  style: React.CSSProperties | undefined;
  timeout: number | { enter?: number; exit?: number };
}

interface Options {
  mode: 'enter' | 'exit';
}

interface TransitionOWnProps {
  duration: string | number;
  easing: string | undefined;
  delay: string | undefined;
}

export function getTransitionProps(props: ComponentProps, options: Options): TransitionOWnProps {
  const { timeout, easing, style = {} } = props;

  return {
    duration:
      style.transitionDuration ??
      (typeof timeout === 'number' ? timeout : timeout[options.mode] || 0),
    easing:
      style.transitionTimingFunction ??
      (typeof easing === 'object' ? easing[options.mode] : easing),
    delay: style.transitionDelay,
  };
}