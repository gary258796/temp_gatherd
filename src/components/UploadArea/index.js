import { useRef } from "react";
import styles from "./index.module.scss";

const UploadArea = (props) => {
  const { children, onChange, src, className } = props;
  const ref = useRef(null);

  const handleOnClick = () => {
    ref.current.click();
  };

  return (
    <>
      <div className={`${styles.box} ${className}`} onClick={handleOnClick}>
        {children}
        {src && <img src={src} alt="" />}
      </div>
      <input
        ref={ref}
        type="file"
        onChange={onChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default UploadArea;
