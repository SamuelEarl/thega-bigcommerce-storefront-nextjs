// The custom colors structure
export interface Colors {
  bg: string; // background color
  fg: string; // foreground color
  br: string; // border color
  ol: string; // outline color
}

// Button variants
export enum Variant {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
  Alert = "alert",
}

export function getBtnColors(colors: Colors | null, variant: Variant, outline: boolean): string {
  // Case A: Custom colors provided
  if (colors) {
    return `background-color: ${colors.bg}; color: ${colors.fg}; border-color: ${colors.br}; outline-color: ${colors.ol};`;
  }

  // Case B: Use pre-defined CSS variables based on variant
  if (outline) {
    return `background-color: transparent; color: var(--${variant}-bg); border-color: var(--${variant}-bg); outline-color: var(--${variant}-bg);`;
  } else {
    return `background-color: var(--${variant}-bg); color: var(--${variant}-fg); border-color: var(--${variant}-bg); outline-color: var(--${variant}-bg);`;
  }
}

// The Sizes input structure
export interface Sizes {
  fs?: number; // Font size
  fw?: string; // Font weight
  pv?: number; // Padding vertical
  ph?: number; // Padding horizontal
}

export const defaultSizes: Sizes = {
  fs: 4,
  fw: "normal",
  pv: 2,
  ph: 3,
};

// The ElementSizes return structure
export interface ElementSizes {
  all: string;
  fs: string;
  fw: string;
  pv: string;
  ph: string;
}

export function getElementSizes(sizes: Sizes | null, isBtn: boolean): ElementSizes {
  // -- Font Size Logic --
  const fsVal = sizes?.fs ?? -1;
  const fontSize = fsVal > -1 ? `var(--size-${fsVal});` : `var(--size-${defaultSizes.fs})`;

  // -- Font Weight Logic --
  const fontWeight = sizes?.fw ?? defaultSizes.fw!;

  // -- Padding Logic --
  const pvVal = sizes?.pv ?? -1;
  const paddingV = pvVal > -1 ? `var(--size-${pvVal})` : `var(--size-${defaultSizes.pv})`;

  const phVal = sizes?.ph ?? -1;
  const paddingH = phVal > -1 ? `var(--size-${phVal})` : `var(--size-${defaultSizes.ph})`;

  // -- Construct the 'all' string --
  let all = `font-size: ${fontSize} font-weight: ${fontWeight}; padding: ${paddingV} ${paddingH};`;

  // -- Gap Logic --
  const gap = fsVal > -1 ? `var(--size-${fsVal})` : `var(--size-${defaultSizes.fs})`;

  // If the element that is retrieving the size styles is a button, then add a `gap` (flexbox) style.
  if (isBtn) {
    all += ` gap: ${gap};`;
  }

  // -- Return the object --
  return {
    all,
    fs: fontSize,
    fw: fontWeight,
    pv: paddingV,
    ph: paddingH,
  };
}

export enum ElementWidths {
  Auto = "auto",
  Full = "full",
}

export function getElementWidth(width: ElementWidths): string {
  switch (width) {
    case ElementWidths.Full:
      return "width: 100%;";
    case ElementWidths.Auto:
      return "width: auto;";
  }
}
