import styles from "./PageView.module.css";
import ToolBar from "./ToolBar/ToolBar";
import ViewPort from "./ViewPort/ViewPort";

const PageView = () => {
  return (
    <div className={styles.container}>
      <ToolBar />
      <ViewPort />
    </div>
  );
};

export default PageView;
