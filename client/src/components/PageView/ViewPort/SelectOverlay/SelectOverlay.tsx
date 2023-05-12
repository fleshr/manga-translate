import { useRef } from "react";
import styles from "./SelectOverlay.module.css";

interface IProps {
  onSelect: (x: number, y: number, width: number, height: number) => void;
}

interface IRect {
  startX: number;
  startY: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const SelectOverlay: React.FC<IProps> = ({ onSelect }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<IRect | null>(null);

  const handleOverlayMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.button !== 0 || !overlayRef.current) return;

    const overlay = overlayRef.current.getBoundingClientRect();
    rectRef.current = {
      startX: e.clientX - overlay.x,
      startY: e.clientY - overlay.y,
      x: e.clientX - overlay.x,
      y: e.clientY - overlay.y,
      width: 0,
      height: 0,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!overlayRef.current || !rectRef.current || !boxRef.current) return;

    const box = boxRef.current;
    const rect = rectRef.current;

    const clientRect = overlayRef.current.getBoundingClientRect();

    const cursorX = e.clientX - clientRect.x - rect.startX;
    const cursorY = e.clientY - clientRect.y - rect.startY;

    let x = cursorX < 0 ? e.clientX - clientRect.x : rect.startX;
    let y = cursorY < 0 ? e.clientY - clientRect.y : rect.startY;

    x = x < 0 ? 0 : x;
    y = y < 0 ? 0 : y;

    let width = cursorX < 0 ? rect.startX - x : cursorX;
    let height = cursorY < 0 ? rect.startY - y : cursorY;

    width = width + x > clientRect.width ? clientRect.width - x : width;
    height = height + y > clientRect.height ? clientRect.height - y : height;

    rectRef.current = { ...rectRef.current, x, y, width, height };

    box.style.left = `${rect.x}px`;
    box.style.top = `${rect.y}px`;
    box.style.width = `${rect.width}px`;
    box.style.height = `${rect.height}px`;
    box.style.display = `block`;
  };

  const handleMouseUp = () => {
    if (!rectRef.current || !boxRef.current) return;

    const rect = rectRef.current;

    boxRef.current.style.display = "none";
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    if (rect.width > 0 && rect.height > 0) {
      onSelect(rect.x, rect.y, rect.width, rect.height);
    }
    rectRef.current = null;
  };

  return (
    <div
      ref={overlayRef}
      className={styles.container}
      onMouseDown={handleOverlayMouseDown}
    >
      <div ref={boxRef} className={styles.box} />
    </div>
  );
};

export default SelectOverlay;
