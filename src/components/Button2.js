import type * as Polymorphic from "@radix-ui/react-polymorphic";
import type { ComponentProps } from "react";
import React, { forwardRef } from "react";

import { styled } from "../../theme";
import { onGridPx } from "../../tokens/space";
import { Icon } from "../Icon";
import type { IconType } from "../Icon";
import { LoadingDotsOverlay } from "../LoadingDots";
import { Stack } from "../Stack";

/*
  TODO
  - Link/Routing component
*/

const DEFAULT_TAG = "button";

const BaseButton = styled(DEFAULT_TAG, {
  display: "inline-block",
  verticalAlign: "middle",
  position: "relative",

  px: "$3",
  py: "$1",

  fontSize: "$base",
  fontFamily: "$base",
  fontWeight: "600",
  lineHeight: onGridPx(4),
  textDecoration: "none",

  borderRadius: "$1",
  border: "none",
  transition: "$all",
  willChange: "transform",

  "&:active:not([disabled])": {
    transform: "scale(0.98)",
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: "$primary-base",
        color: "$primary-contrast",

        "&:hover:not([disabled])": {
          background: "$primary-hover",
        },
        "&:focus:not([disabled])": {
          background: "$primary-hover",
        },
      },
      secondary: {
        backgroundColor: "$secondary-base",
        color: "$secondary-contrast",

        "&:hover:not([disabled])": {
          background: "$secondary-hover",
        },
        "&:focus:not([disabled])": {
          background: "$secondary-hover",
        },
      },
      danger: {
        backgroundColor: "$danger-base",
        color: "$danger-contrast",

        "&:hover:not([disabled])": {
          background: "$danger-hover",
        },
        "&:focus:not([disabled])": {
          background: "$danger-hover",
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: "$text-base",
        "&:hover:not([disabled])": {
          background: "$surface-dim",
        },
        "&:focus:not([disabled])": {
          background: "$surface-dim",
        },
      },
    },
    state: {
      loading: {},
      normal: {
        "&:disabled": {
          opacity: 0.4,
        },
      },
    },
  },

  defaultVariants: {
    state: "normal",
  },
});

interface BaseButtonProps
  extends Omit<ComponentProps<typeof BaseButton>, "states"> {
  loading?: boolean;
}

interface TextButtonProps extends BaseButtonProps {
  icon?: undefined;
  iconPosition?: undefined;
}

interface IconButtonProps extends BaseButtonProps {
  icon?: IconType;
  iconPosition?: "left" | "right";
}

export type ButtonProps = TextButtonProps | IconButtonProps;

type PolymorphicButton = Polymorphic.ForwardRefComponent<
  typeof DEFAULT_TAG,
  ButtonProps
>;

const isIconButton = (icon: IconType | undefined): icon is IconType => {
  return icon !== undefined;
};

export const Button = forwardRef(
  (
    {
      css,
      children,
      disabled = false,
      icon = undefined,
      iconPosition = undefined,
      loading = false,
      variant = "primary",
      ...buttonProps
    },
    ref
  ) => {
    const sharedProps: Partial<ButtonProps> = {
      disabled: disabled || loading,
      state: loading ? "loading" : "normal",
      variant,
    };

    if (isIconButton(icon)) {
      const hasChildren = children !== undefined;
      const iconEl = <Icon size={4} type={icon} />;
      return (
        <BaseButton
          ref={ref}
          {...sharedProps}
          {...buttonProps}
          css={{
            // TODO: fix use of `any` here. This is a known issue with Stitches, and something they plan to fix.
            // Reference: https://discord.com/channels/752614004387610674/752795957674115092/845290551280271450
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(css as any),
            display: "inline-flex",
            flexWrap: "wrap",
            ...(hasChildren
              ? {}
              : {
                  px: "$1",
                }),
          }}
        >
          <Stack
            css={{
              visibility: loading ? "hidden" : "visible",
            }}
            gap={hasChildren ? 2 : 0}
            horizontal
          >
            {iconPosition !== "right" && iconEl}
            {hasChildren && <span>{children}</span>}
            {iconPosition === "right" && iconEl}
          </Stack>
          {loading && <LoadingDotsOverlay />}
        </BaseButton>
      );
    } else {
      return (
        <BaseButton ref={ref} css={css} {...sharedProps} {...buttonProps}>
          <span style={{ visibility: loading ? "hidden" : "visible" }}>
            {children}
          </span>
          {loading && <LoadingDotsOverlay />}
        </BaseButton>
      );
    }
  }
) as PolymorphicButton;

Button.defaultProps = {
  as: "button",
};