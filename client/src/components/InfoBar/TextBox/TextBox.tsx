import { useEffect, useRef } from "react";
import styles from "./TextBox.module.css";

interface IProps {
  title: string;
  text: string;
}

const TextBox: React.FC<IProps> = ({ title, text }) => {
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextAreaHeight = () => {
    if (textRef.current) {
      textRef.current.style.height = `${textRef.current.scrollHeight + 2}px`;
    }
  };

  useEffect(() => {
    adjustTextAreaHeight();
  }, []);

  return (
    <div>
      <h3 className={styles.heading}>{title}</h3>
      <textarea
        ref={textRef}
        onInput={adjustTextAreaHeight}
        className={styles.text}
        rows={3}
        value={text}
      />
    </div>
  );
};

export default TextBox;
