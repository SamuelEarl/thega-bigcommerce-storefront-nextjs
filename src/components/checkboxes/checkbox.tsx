"use client";

// Checkbox styles are taken from this article:
// https://moderncss.dev/pure-css-custom-checkbox-style/

import { useState, type ComponentProps } from "react";
import styles from "./checkbox.module.css";

export function Checkbox({ onChange, disabled, children }: ComponentProps<"input">) {
  const [checked, setChecked] = useState(false);

  return (
    <label className={`${styles["form-control"]} ${disabled ? styles["form-control--disabled"] : ""}`.trim()}>
      <input
        type="checkbox"
        className={styles["checkbox-input"]}
        disabled={disabled}
        onChange={onChange}
      />
      {children}
    </label>
  );
}
