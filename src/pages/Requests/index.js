import styles from "./index.module.scss";
import { child, get, getDatabase, ref } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../constants/FirebaseStorage";
import { useEffect } from "react";
import { useState } from "react";

const Image = (props) => {
  const { path, className } = props;
  const [src, setSrc] = useState("");
  const storage = getStorage(app);

  useEffect(() => {
    if (!path) return;
    getDownloadURL(storageRef(storage, path))
      .then((url) => {
        setSrc(url);
      })
      .catch((error) => {});
  }, [path]);

  return <img className={className} src={src} alt="" />;
};

const Requests = () => {
  const [requests, setRequests] = useState({});
  const db = getDatabase(app);
  const dbRef = ref(db);
  const keys = Object.keys(requests);

  useEffect(() => {
    get(child(dbRef, "/request"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setRequests(snapshot.val());
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <div className={styles.container}>
      {keys.reverse().map((key) => {
        const value = requests[key];
        return (
          <div className={styles.cell}>
            <div className={styles.section}>
              <div className={styles.detail}>
                <p>體驗名稱</p>
                {value.experience}
              </div>
              <div className={styles.detail}>
                <p>價格</p>
                {value.price}
              </div>
              <div className={styles.detail}>
                <p>人數</p>
                {value.guest}
              </div>
              <div className={styles.detail}>
                <p>總金額</p>
                {value.guest * value.price}
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.detail}>
                <p>姓名</p>
                {value.name}
              </div>
              <div className={styles.detail}>
                <p>手機</p>
                {value.phone}
              </div>
              <div className={styles.detail}>
                <p>Email</p>
                {value.email}
              </div>
              <div className={styles.detail}>
                <p>體驗時間</p>
                {value.time}
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.detail}>
                <p>給Host的話</p>
                {value.memo}
              </div>
              <div className={styles.detail}>
                <p>備註</p>
                {value.inquiry || "-"}
              </div>
              <div className={styles.detail}>
                <p>其他人的 Email</p>
                {value.othersEmail || "-"}
              </div>
            </div>
            <div className={styles.images}>
              <p>生活照</p>
              <Image path={value.userImagePath} className={styles.image} />
              <p>身分證</p>
              <Image path={value.identifyImagePath} className={styles.image} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
