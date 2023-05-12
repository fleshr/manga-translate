import { usePagesStore } from "@/zustand/pages";
import { ChangeEvent } from "react";
import styles from "./PagesSelector.module.css";

const PagesSelector = () => {
  const totalPages = usePagesStore((state) => state.totalPages);
  const selectedPage = usePagesStore((state) => state.selectedPage);
  const selectPage = usePagesStore((state) => state.selectPage);

  const handleInpuChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const value = +e.target.value;
    if (value >= 1 && value <= totalPages) {
      selectPage(value);
    }
  };

  return (
    <div className={styles.container}>
      <p>
        <input
          onChange={handleInpuChange}
          className={styles.current_page}
          type="number"
          name="current-page"
          id="current-page"
          value={selectedPage ?? 0}
        />
        <span> / {totalPages ?? 0}</span>
      </p>
    </div>
  );
};

export default PagesSelector;
