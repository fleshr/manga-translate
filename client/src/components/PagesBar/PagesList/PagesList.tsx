import { usePagesStore } from "@/zustand/pages";
import PageItem from "./PageItem/PageItem";
import styles from "./PagesList.module.css";

const PagesList = () => {
  const pages = usePagesStore((state) => state.pages);
  const selectPage = usePagesStore((state) => state.selectPage);
  const selectedPage = usePagesStore((state) => state.selectedPage);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {pages.map((page) => (
          <PageItem
            key={page.id}
            id={page.id}
            imageUrl={page.url}
            onClick={() => selectPage(page.id)}
            isSelected={page.id === selectedPage}
          />
        ))}
      </ul>
    </div>
  );
};

export default PagesList;
