import type { ComponentProps } from "react";
import { RiCloseLine } from "@remixicon/react";
import styles from "./modal.module.css";

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

function ModalOverlay({ children }: ComponentProps<"div">) {
  return (
    <div className={`${styles["modal-overlay"]}`}>
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
            <RiCloseLine />
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
