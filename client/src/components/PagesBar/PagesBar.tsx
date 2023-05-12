import styles from "./PagesBar.module.css";
import PagesList from "./PagesList/PagesList";
import PagesSelector from "./PagesSelector/PagesSelector";

const PagesBar = () => {
  return (
    <div className={styles.container}>
      <PagesSelector />
      <PagesList />
    </div>
  );
};

export default PagesBar;
