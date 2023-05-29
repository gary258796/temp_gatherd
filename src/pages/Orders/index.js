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
import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

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

const Orders = () => {
  const [pass, setPass] = useState(false);
  const [password, setPassword] = useState("");
  const [tabIndex, setTabIndex] = useState("0");
  const [data, setData] = useState({});
  const db = getDatabase(app);
  const dbRef = ref(db);
  const orders = Object.keys(data.orders || {});
  const requests = Object.keys(data.request || {});

  const handleTimeString = (time) => {
    const date = new Date(parseInt(time));
    return `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  };

  const handleOrderCellRender = (value, time) => {
    return (
      <div className={styles.cell} key={value.timestamp}>
        <div className={styles.section}>
          <div className={styles.detail}>
            <p>送出時間</p>
            {handleTimeString(time)}
          </div>
          <div className={styles.detail}>
            <p>體驗名稱</p>
            {value.experience}
          </div>
          <div className={styles.detail}>
            <p>價格</p>
            {value.price}
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
          <div className={styles.detail}>
            <p>人數</p>
            {value.guest}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.detail}>
            <p>付款方式</p>
            {value.paymentMethod}
          </div>
          <div className={styles.detail}>
            <p>末五碼 or Line</p>
            {value.paymentDetail}
          </div>
          <div className={styles.detail}>
            <p>總金額</p>
            {value.guest * value.price}
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
  };

  const handleRequestCell = (value, time) => {
    return (
      <div className={styles.cell} key={value.timestamp}>
        <div className={styles.section}>
          <div className={styles.detail}>
            <p>送出時間</p>
            {handleTimeString(time)}
          </div>
          <div className={styles.detail}>
            <p>體驗名稱</p>
            {value.experience}
          </div>
          <div className={styles.detail}>
            <p>詢問時間</p>
            {value.time}
          </div>
          <div className={styles.detail}>
            <p>價格</p>
            {value.price}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.detail}>
            <p>人數</p>
            {value.guest}
          </div>
          <div className={styles.detail}>
            <p>總金額</p>
            {value.guest * value.price}
          </div>
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
  };

  useEffect(() => {
    get(child(dbRef, "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <div className={styles.container}>
      <ToggleButtonGroup
        color="primary"
        value={tabIndex}
        exclusive
        onChange={(e) => setTabIndex(e.target.value)}
        style={{ marginBottom: "24px" }}
      >
        <ToggleButton value="0">訂單</ToggleButton>
        <ToggleButton value="1">詢問時間</ToggleButton>
      </ToggleButtonGroup>
      {(tabIndex === "0" ? orders : requests).reverse().map((key) => {
        const value = (tabIndex === "0" ? data.orders : data.request)[key];
        return tabIndex === "0"
          ? handleOrderCellRender(value, key)
          : handleRequestCell(value, key);
      })}
      {!pass && (
        <div className={styles.password}>
          <TextField
            className={styles.textfield}
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={() => {
              if (password === "gatherd2023") setPass(true);
            }}
          >
            確定
          </Button>
        </div>
      )}
    </div>
  );
};

export default Orders;
