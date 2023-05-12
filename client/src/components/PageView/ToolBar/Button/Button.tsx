import { useCallback, useEffect, useRef } from "react";
import styles from "./Button.module.css";

interface IProps extends React.PropsWithChildren {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isActive?: boolean;
  title?: string;
  hotKey?: string;
}

const Button: React.FC<IProps> = ({
  children,
  isActive,
  onClick,
  title,
  hotKey,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!hotKey || !buttonRef.current) return;
    if (e.code === hotKey) buttonRef.current.click();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <button
      ref={buttonRef}
      title={title}
      type="button"
      className={`${styles.button} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
