import { IPage } from "@/interfaces";
import { loadImage } from "@/utils";
import { useEffect, useRef } from "react";
import styles from "./ReadOverlay.module.css";

interface IProps {
  page: IPage;
}

const ReadOverlay: React.FC<IProps> = ({ page }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textBoxCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const main = async () => {
      if (!page || !canvasRef.current || !textBoxCanvasRef.current) return;

      const ctx = canvasRef.current.getContext("2d");
      const img = await loadImage(page.url);
      canvasRef.current.width = img.width;
      canvasRef.current.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const ctx2 = textBoxCanvasRef.current.getContext("2d");
      for (const textBox of page.textBoxes) {
        textBoxCanvasRef.current.width = textBox.width;
        textBoxCanvasRef.current.height = textBox.height;

        ctx2!.font = "italic small-caps bold 20px cursive";

        const words = textBox.translatedText.split(" ");

        const text: string[] = [];
        let line = "";
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          const prevLine = line;
          line += `${word} `;
          const textMetrics = ctx2!.measureText(line.trim());

          if (textMetrics.width > textBox.width) {
            text.push(prevLine.trim());
            line = `${word} `;
          }

          if (i + 1 >= words.length) text.push(line.trim());
        }

        ctx2!.textAlign = "center";
        ctx2!.textBaseline = "top";
        const offsetHeihgt = (textBox.height - text.length * 24) / 2 + 2;
        for (let i = 0; i < text.length; i++) {
          const line = text[i];
          const textMetrics = ctx2!.measureText(line);

          const width =
            textMetrics.width > textBox.width
              ? textBox.width
              : textMetrics.width;

          const x = textBox.width / 2;
          const y = 24 * i + offsetHeihgt;

          ctx2?.fillText(line, x, y, width);
        }
        ctx!.fillStyle = "white";
        ctx?.fillRect(textBox.x, textBox.y, textBox.width, textBox.height);
        ctx?.drawImage(textBoxCanvasRef!.current, textBox.x, textBox.y);
      }
    };
    main();
  }, [page]);

  return (
    <div className={styles.container}>
      <canvas ref={textBoxCanvasRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
};

export default ReadOverlay;
