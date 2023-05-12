import { ITextBox } from "@/interfaces";
import { usePagesStore } from "@/zustand/pages";
import { useToolsStore } from "@/zustand/tools";
import TextBox from "./TextBox/TextBox";
import styles from "./TextBoxesOverlay.module.css";

interface IProps {
  textBoxes: ITextBox[];
}

const TextBoxesOverlay: React.FC<IProps> = ({ textBoxes }) => {
  const selectTextBox = usePagesStore((state) => state.selectTextBox);
  const removeTextBox = usePagesStore((state) => state.removeTextBox);
  const selectedPage = usePagesStore((state) => state.selectedPage);
  const selectedTextBox = usePagesStore((state) => state.selectedTextBox);
  const selectedTool = useToolsStore((state) => state.selectedTool);

  const handleTextBoxClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => {
    if (selectedTool === "view" && e.button === 0) selectTextBox(id);
    if (selectedTool === "remove" && e.button === 0)
      removeTextBox(selectedPage, id);
  };

  return (
    <div className={styles.container}>
      {textBoxes.map((textBox) => (
        <TextBox
          key={textBox.id}
          textBox={textBox}
          isActive={textBox.id === selectedTextBox}
          onClick={handleTextBoxClick}
        />
      ))}
    </div>
  );
};

export default TextBoxesOverlay;
