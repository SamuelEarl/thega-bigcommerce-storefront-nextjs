"use client";

import { useState, type ComponentProps } from "react";
import styles from "./checkbox.module.css";

export function Checkbox({ onChange, children }: ComponentProps<"input">) {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <label className={styles["checkbox-label-wrapper"]}>
        <input
          type="checkbox"
          className={styles["checkbox-input"]}
          onChange={onChange}
        />
        {children}
        <span
          className={styles["checkbox-checkmark"]}
        // onKeyUp={(e) => {
        //   if (e.key === "Space") {
        //     console.log("Space key pressed");
        //     e.preventDefault();
        //     setChecked(!checked);
        //     // (e.target as HTMLInputElement).value = !e.target.value;
        //   }
        // }}
        // checked={checked}
        ></span>
      </label>
    </div>
  );
}
