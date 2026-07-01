"use client";

import { ButtonHTMLAttributes, MouseEvent, useEffect, useRef } from "react";
import {
  Variant,
  ElementWidths,
  Colors,
  Sizes,
  getBtnColors,
  getElementSizes,
  getElementWidth,
} from "../colors-and-sizes";
import styles from "./Button.module.css";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: Variant;
  outline?: boolean;
  width?: ElementWidths;
  colors?: Colors | null;
  sizes?: Sizes | null;
  disabled?: boolean;
  loadingText?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export function Button({
  variant = Variant.Primary,
  outline = false,
  width = ElementWidths.Auto,
  colors = null,
  sizes = null,
  disabled = false,
  loadingText,
  onClick,
  children,
  className = "",
  ...attributes
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const colorStyle = getBtnColors(colors, variant, outline);
  const sizeStyle = getElementSizes(sizes, true);
  const widthStyle = getElementWidth(width);

  // Apply inline styles using setAttribute since React doesn't support CSS string in style prop
  useEffect(() => {
    if (buttonRef.current) {
      const inlineStyles = `${colorStyle} ${sizeStyle.all} ${widthStyle}`;
      buttonRef.current.setAttribute("style", inlineStyles);
    }
  }, [colorStyle, sizeStyle.all, widthStyle]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const btnClass = disabled && loadingText ? `${styles["btn"]} ${styles["loading"]}` : styles["btn"];
  const finalClassName = className ? `${btnClass} ${className}` : btnClass;

  return (
    <button
      ref={buttonRef}
      className={finalClassName}
      disabled={disabled}
      onClick={handleClick}
      {...attributes}
    >
      {disabled && loadingText ? loadingText : children}
    </button>
  );
}
