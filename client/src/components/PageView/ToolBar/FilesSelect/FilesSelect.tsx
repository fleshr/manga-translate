import { IPage } from "@/interfaces";
import { usePagesStore } from "@/zustand/pages";
import { ChangeEvent, useRef } from "react";
import { BiFileBlank } from "react-icons/bi";
import Button from "../Button/Button";
import styles from "./FilesSelect.module.css";

const FilesSelect = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setPages = usePagesStore((state) => state.setPages);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;
    if (!files) return;

    const pages: IPage[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const objectUrl = URL.createObjectURL(file);

      pages.push({
        id: i + 1,
        url: objectUrl,
        textBoxes: [],
      });
    }

    setPages(pages);
  };

  return (
    <>
      <Button
        onClick={() => inputRef.current?.click()}
        hotKey="KeyO"
        title="Open files (O)"
      >
        <BiFileBlank size={20} />
      </Button>
      <input
        ref={inputRef}
        className={styles.input}
        onChange={handleInputChange}
        type="file"
        multiple
      />
    </>
  );
};

export default FilesSelect;
