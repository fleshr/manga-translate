import { ITextBox } from "@/interfaces";
import styles from "./TextBox.module.css";

interface IProps {
  textBox: ITextBox;
  isActive: boolean;
  onClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => void;
}

const TextBox: React.FC<IProps> = ({ textBox, isActive, onClick }) => {
  const { id, x, y, width, height } = textBox;

  return (
    <div
      className={`${styles.container} ${isActive ? styles.selected : ""}`}
      style={{ top: y, left: x, width, height }}
      onClick={(e) => onClick(e, id)}
    >
      <h4 className={styles.heading}>{id}</h4>
    </div>
  );
};

export default TextBox;
