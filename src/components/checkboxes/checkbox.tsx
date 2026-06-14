"use client";

// Checkbox styles are taken from this article:
// https://moderncss.dev/pure-css-custom-checkbox-style/

import { useState, type ComponentProps } from "react";
import styles from "./checkbox.module.css";


export function Checkbox({ onChange, children, ...props }: ComponentProps<"input">) {
  const [checked, setChecked] = useState(false);

  return (
    <label className={`${styles["form-control"]} ${props.disabled ? styles["form-control--disabled"] : ""}`.trim()}>
      <input
        type="checkbox"
        className={styles["checkbox-input"]}
        {...props}
        checked={checked}
        onChange={(event) => {
          setChecked(event.target.checked);
          onChange?.(event);
        }}
      />
      {children}
    </label>
  );
}
