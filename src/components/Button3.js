import { styled } from "@stitches/react";

// theme.js
const borderRadius = [0, "4px", "8px"];
const spaces = [0, "0.5em", "1em"];

// Button.js
const mainStyles = {
  fontWeight: "bold",
  borderRadius: borderRadius[1],
  padding: `${spaces[1]} ${spaces[2]}`
};

const primaryStyles = {
  ...mainStyles,
  background: "linear-gradient(rgb(189, 227, 0) 0%, rgb(176, 212, 0) 100%)",
  ":not(['aria-disabled'])": {
    "&:hover, &:focus": {
      background: "rgb(176, 212, 0)"
    }
  }
};

const Button = styled("button", {
  background: 0,
  border: 0,
  color: "inherit",
  font: "inherit",
  margin: 0,
  padding: 0,

  variants: {
    variant: {
      primary: primaryStyles,
      secondary: {
        ...mainStyles,
        background:
          "linear-gradient(rgb(217, 217, 217) 0%, rgb(204, 204, 204) 100%)"
      },
      tertiary: {
        ...mainStyles,
        backgroundColor: "white",
        border: "1px solid rgb(204, 204, 204)"
      },
      link: {
        color: "darkcyan",
        textDecoration: "underline"
      },
      unstyled: {}
    },
    ["aria-disabled"]: {
      true: {
        filter: "grayscale(60%)",
        color: "#666"
      },
      false: {
        cursor: "pointer"
      }
    }
  },

  defaultVariants: {
    variant: "primary",
    ["aria-disabled"]: false
  },

  compoundVariants: [
    {
      variant: "primary",
      ["aria-disabled"]: false,
      css: {
        "&:hover, &:focus": {
          background: "rgb(176, 212, 0)"
        }
      }
    },
    {
      variant: "secondary",
      ["aria-disabled"]: false,
      css: {
        "&:hover, &:focus": {
          background: "rgb(209, 209, 209)"
        }
      }
    },
    {
      variant: "tertiary",
      ["aria-disabled"]: false,
      css: {
        "&:hover, &:focus": {
          borderColor: "rgb(153, 153, 153)"
        }
      }
    },
    {
      variant: "link",
      ["aria-disabled"]: false,
      css: {
        "&:hover, &:focus": {
          color: "hsl(180deg 100% 37%)"
        }
      }
    }
  ]
});

Button.displayName = "wui-button";

export { Button };