import styles from "./PageItem.module.css";

interface IPros {
  id: number;
  imageUrl: string;
  isSelected: boolean;
  onClick: () => void;
}

const PageItem: React.FC<IPros> = ({ id, imageUrl, isSelected, onClick }) => {
  return (
    <li
      className={`${styles.container} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <h4 className={styles.heading}>{id}</h4>
      <img
        className={styles.image}
        src={imageUrl}
        width={95}
        height={135}
        alt={`Page ${id}`}
      />
    </li>
  );
};

export default PageItem;
