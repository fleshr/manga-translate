import { usePagesStore } from "@/zustand/pages";
import ImageBox from "./ImageBox/ImageBox";
import styles from "./InfoBar.module.css";
import PositionInfo from "./PositionInfo/PositionInfo";
import TextBox from "./TextBox/TextBox";

const InfoBar = () => {
  const textBox = usePagesStore((state) =>
    state.pages
      .find((page) => page.id === state.selectedPage)
      ?.textBoxes.find((textBox) => textBox.id === state.selectedTextBox)
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Text Box</h2>
      <div className={styles.info}>
        {textBox && (
          <>
            <p className={styles.id}>
              <span>ID</span>
              <span>{textBox.id}</span>
            </p>
            <PositionInfo
              x={textBox.x}
              y={textBox.y}
              width={textBox.width}
              height={textBox.height}
            />
            <TextBox title="Original Text" text={textBox.rawText} />
            <TextBox title="Translated Text" text={textBox.translatedText} />
            <ImageBox url={textBox.url} />
          </>
        )}
      </div>
    </div>
  );
};

export default InfoBar;
