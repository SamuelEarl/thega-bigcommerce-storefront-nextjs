"use client";

import { useEffect, type ComponentProps } from "react";
import { RiCloseLine } from "@remixicon/react";
import styles from "./Modal.module.css";

// EXAMPLE USAGE:
// function ModalExample() {
//   return (
//     <ModalOverlay>
//       <ModalContent>
//         <ModalHeader
//           showCloseButton={true}
//           title="Some Title"
//           description="Some description"
//         />
//         <ModalBody>
//           <div>
//             Modal content goes here
//           </div>
//         </ModalBody>
//         <ModalFooter>
//           <Button onClick={() => setOpen(false)}>
//             Close
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </ModalOverlay>
//   );
// }

function ModalOverlay({ isOpen, children }: ComponentProps<"div"> & { isOpen: boolean }) {
  useEffect(() => {
    if (!isOpen) return;

    // Save original overflow style to restore it later
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Lock the scroll
    document.body.style.overflow = "hidden";

    // Clean up and restore original styles when unmounted or unlocked
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  return (
    <div className={`${styles["modal-overlay"]}`} data-state={isOpen ? "open" : "closed"}>
      {children}
    </div>
  );
}

function ModalContent({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles["modal-content"]}`}>
      {children}
    </div>
  );
}

type ModalHeaderProps = {
  showCloseButton?: boolean;
  title: string;
  description?: string;
  onClick?: () => void;
};

function ModalHeader({ showCloseButton = true, title, description, onClick }: ModalHeaderProps) {
  return (
    <div className={`${styles["modal-header"]}`}>
      {showCloseButton && (
        <div className={styles["header-top"]}>
          <button className={styles["modal-close"]} onClick={onClick}>
            <RiCloseLine size={24} />
            <span className="sr-only">Close</span>
          </button>
        </div>
      )}
      <div className={styles["header-bottom"]}>
        <h2 className={styles["modal-title"]}>{title}</h2>
        {description && <p className={styles["modal-description"]}>{description}</p>}
      </div>
    </div>
  );
}

function ModalBody({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles["modal-body"]}`}>
      {children}
    </div>
  );
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles["modal-footer"]}`}>
      {children}
    </div>
  );
}

export {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
};
