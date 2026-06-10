"use client";

import { ButtonHTMLAttributes, MouseEvent } from "react";
import {
  Variant,
  ElementWidths,
  Colors,
  Sizes,
  getBtnColors,
  getElementSizes,
  getElementWidth,
} from "../colors-and-sizes";
import "./button.css";

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
  const colorStyle = getBtnColors(colors, variant, outline);
  const sizeStyle = getElementSizes(sizes, true);
  const widthStyle = getElementWidth(width);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const btnClass = disabled && loadingText ? `btn loading` : "btn";
  const finalClassName = className ? `${btnClass} ${className}` : btnClass;

  return (
    <button
      className={finalClassName}
      style={{ cssText: `${colorStyle} ${sizeStyle.all} ${widthStyle}` } as any}
      disabled={disabled}
      onClick={handleClick}
      {...attributes}
    >
      {disabled && loadingText ? loadingText : children}
    </button>
  );
}
