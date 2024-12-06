import * as React from "react";
import styled from "@emotion/styled";

import Person from "../internal/svg-icons/Person";

import useSlot from "../utils/useSlot";

const AvatarRoot = styled("div")({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 40,
  height: 40,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(20),
  lineHeight: 1,
  borderRadius: "50%",
  overflow: "hidden",
  userSelect: "none",
  variants: [
    {
      props: { variant: "rounded" },
      style: {
        borderRadius: (theme.vars || theme).shape.borderRadius,
      },
    },
    {
      props: { variant: "square" },
      style: {
        borderRadius: 0,
      },
    },
    {
      props: { colorDefault: true },
      style: {
        color: (theme.vars || theme).palette.background.default,
        ...(theme.vars
          ? {
              backgroundColor: theme.vars.palette.Avatar.defaultBg,
            }
          : {
              backgroundColor: theme.palette.grey[400],
              ...theme.applyStyles("dark", { backgroundColor: theme.palette.grey[600] }),
            }),
      },
    },
  ],
});

const AvatarImg = styled("img")({
  width: "100%",
  height: "100%",
  textAlign: "center",
  // Handle non-square image.
  objectFit: "cover",
  // Hide alt text.
  color: "transparent",
  // Hide the image broken icon, only works on Chrome.
  textIndent: 10000,
});

const AvatarFallback = styled(Person)({
  width: "75%",
  height: "75%",
});

function useLoaded({ src }) {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!src) {
      return undefined;
    }

    setLoaded(false);

    let active = true;
    const image = new Image();
    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded("loaded");
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded("error");
    };
    /*     image.crossOrigin = crossOrigin;
    image.referrerPolicy = referrerPolicy; */
    image.src = src;

    return () => {
      active = false;
    };
  }, [src]);

  return loaded;
}

const Avatar = React.forwardRef(function Avatar(props: AvatarOwnProps, ref) {
  const { alt, children: childrenProp, sizes, src, variant = "circular", ...other } = props;

  let children = null;

  // Use a hook instead of onError on the img element to support server-side rendering.
  const loaded = useLoaded({ src });
  const hasImg = src;
  const hasImgNotFailing = hasImg && loaded !== "error";

  const ownerState = {
    ...props,
    colorDefault: !hasImgNotFailing,
    variant,
  };

  const [ImgSlot, imgSlotProps] = useSlot("img", {
    className: classes.img,
    elementType: AvatarImg,
    externalForwardedProps: {
      slots,
      slotProps: { img: { ...imgProps, ...slotProps.img } },
    },
    additionalProps: { alt, src, srcSet, sizes },
    ownerState,
  });

  if (hasImgNotFailing) {
    children = <ImgSlot {...imgSlotProps} />;
    // We only render valid children, non valid children are rendered with a fallback
    // We consider that invalid children are all falsy values, except 0, which is valid.
  } else if (!!childrenProp || childrenProp === 0) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = <AvatarFallback ownerState={ownerState} className={classes.fallback} />;
  }

  return (
    <AvatarRoot as='div' ref={ref} {...other} ownerState={ownerState}>
      {children}
    </AvatarRoot>
  );
});

export default Avatar;

export interface AvatarOwnProps {
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt?: string;
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
   */
  children?: React.ReactNode;

  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes?: string;
  /**
   * The `src` attribute for the `img` element.
   */
  src?: string;

  /**
   * The shape of the avatar.
   * @default 'circular'
   */
  variant?: OverridableStringUnion<"circular" | "rounded" | "square", AvatarPropsVariantOverrides>;
}
