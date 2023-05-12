import styles from "./PostitionInfo.module.css";

interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const PositionInfo: React.FC<IProps> = ({ x, y, width, height }) => {
  return (
    <div>
      <h3 className={styles.heading}>Position</h3>
      <div className={styles.table}>
        <p>
          <span>X</span>
          <span>{x}</span>
        </p>
        <p>
          <span>Y</span>
          <span>{y}</span>
        </p>
        <p>
          <span>W</span>
          <span>{width}</span>
        </p>
        <p>
          <span>H</span>
          <span>{height}</span>
        </p>
      </div>
    </div>
  );
};

export default PositionInfo;
