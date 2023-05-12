import { useToolsStore } from "@/zustand/tools";
import { BiDetail, BiPlus, BiPointer, BiTrashAlt } from "react-icons/bi";
import Button from "./Button/Button";
import FilesSelect from "./FilesSelect/FilesSelect";
import styles from "./ToolBar.module.css";

const ToolBar = () => {
  const selectTool = useToolsStore((state) => state.selectTool);
  const selectedTool = useToolsStore((state) => state.selectedTool);

  return (
    <div className={styles.container}>
      <Button
        title="Select (S)"
        hotKey="KeyS"
        isActive={selectedTool === "view"}
        onClick={() => selectTool("view")}
      >
        <BiPointer size={20} />
      </Button>
      <Button
        title="Read (R)"
        hotKey="KeyR"
        isActive={selectedTool === "read"}
        onClick={() => selectTool("read")}
      >
        <BiDetail size={22} />
      </Button>
      <hr className={styles.spacer} />
      <Button
        title="Add (A)"
        hotKey="KeyA"
        isActive={selectedTool === "add"}
        onClick={() => selectTool("add")}
      >
        <BiPlus size={24} />
      </Button>
      <Button
        title="Remove (D)"
        hotKey="KeyD"
        isActive={selectedTool === "remove"}
        onClick={() => selectTool("remove")}
      >
        <BiTrashAlt size={20} />
      </Button>
      <div className={styles.right}>
        <FilesSelect />
      </div>
    </div>
  );
};

export default ToolBar;
