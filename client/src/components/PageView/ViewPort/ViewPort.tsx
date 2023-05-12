import { canvasToBlob, loadImage } from "@/utils";
import { usePagesStore } from "@/zustand/pages";
import { useToolsStore } from "@/zustand/tools";
import { useEffect, useRef } from "react";
import ReadOverlay from "./ReadOverlay/ReadOverlay";
import SelectOverlay from "./SelectOverlay/SelectOverlay";
import TextBoxesOverlay from "./TextBoxesOverlay/TextBoxesOverlay";
import styles from "./ViewPort.module.css";

const ViewPort = () => {
  const pages = usePagesStore((state) => state.pages);
  const selectedPage = usePagesStore((state) => state.selectedPage);
  const viewPortRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasOverlayRef = useRef<HTMLCanvasElement | null>(null);
  const page = pages.find((page) => page.id === selectedPage);
  const selectedTool = useToolsStore((state) => state.selectedTool);
  const addTextBox = usePagesStore((state) => state.addTextBox);

  useEffect(() => {
    const main = async () => {
      if (!page || !canvasRef.current) return;

      const ctx = canvasRef.current.getContext("2d");

      const img = await loadImage(page.url);

      canvasRef.current.width = img.width;
      canvasRef.current.height = img.height;

      ctx?.drawImage(img, 0, 0);
    };
    main();
  }, [page]);

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.button !== 1 || !viewPortRef.current) return;
    e.preventDefault();

    pos = {
      top: viewPortRef.current.scrollTop,
      left: viewPortRef.current.scrollLeft,
      x: e.clientX,
      y: e.clientY,
    };

    document.documentElement.classList.add("grab-cursor");

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!viewPortRef.current) return;

    const scrollTop = pos.top - (e.clientY - pos.y);
    const scrollLeft = pos.left - (e.clientX - pos.x);

    viewPortRef.current.scrollTop = scrollTop;
    viewPortRef.current.scrollLeft = scrollLeft;
  };

  const handleMouseUp = (e: MouseEvent) => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    document.documentElement.classList.remove("grab-cursor");
  };

  const handleOverlaySelect = async (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    if (!canvasOverlayRef.current || !page) return;

    const canvas = canvasOverlayRef.current;

    canvas.width = width;
    canvas.height = height;

    const ctx2 = canvas.getContext("2d");
    const img = await loadImage(page.url);

    ctx2?.drawImage(img, x, y, width, height, 0, 0, width, height);

    const blob = await canvasToBlob(canvas);
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    addTextBox(selectedPage, url, x, y, width, height);
  };

  return (
    <div
      className={styles.container}
      onMouseDown={handleMouseDown}
      ref={viewPortRef}
    >
      {page && (
        <div
          className={styles.view}
          style={selectedTool === "add" ? { cursor: "crosshair" } : {}}
        >
          <canvas ref={canvasOverlayRef} style={{ display: "none" }} />
          <canvas ref={canvasRef} style={{ display: "block" }} />
          {selectedTool === "read" ? (
            <ReadOverlay page={page} />
          ) : (
            <TextBoxesOverlay textBoxes={page.textBoxes} />
          )}
          {selectedTool === "add" && (
            <SelectOverlay onSelect={handleOverlaySelect} />
          )}
        </div>
      )}
    </div>
  );
};

export default ViewPort;
