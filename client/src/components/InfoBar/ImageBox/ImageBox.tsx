import styles from "./ImageBox.module.css";

interface IProps {
  url: string;
}

const ImageBox: React.FC<IProps> = ({ url }) => {
  return (
    <div>
      <h3 className={styles.heading}>Image</h3>
      <div className={styles.image_box}>
        <img
          className={styles.image}
          width={100}
          height={100}
          src={url}
          alt="Text box image"
        />
      </div>
    </div>
  );
};

export default ImageBox;
