import styles from "./index.module.scss";
import { child, get, getDatabase, ref } from "firebase/database";
import { app } from "../../constants/FirebaseStorage";
import { useEffect } from "react";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { MENUS } from "../../constants/menus";

const Orders = () => {
  const [pass, setPass] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const db = getDatabase(app);
  const dbRef = ref(db);
  const orders = Object.keys(data.orders || {});

  const handleTimeString = (time) => {
    const date = new Date(parseInt(time));
    return `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  };

  const handleOrderCellRender = (value, time) => {
    const menu = MENUS.find((menu) => menu.id === value.experienceId);
    const timeData = menu?.cn.availableTimes.find((t) => t.id === value.time);
    return (
      <div className={styles.cell} key={time}>
        <div className={styles.section}>
          <div className={styles.detail}>
            <p>送出時間</p>
            {handleTimeString(time)}
          </div>
          <div className={styles.detail}>
            <p>體驗名稱</p>
            {menu?.cn.name}
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
            {timeData.date}
            {timeData.time}
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
            <p>備註</p>
            {value.inquiry || "-"}
          </div>
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
      {orders.reverse().map((key) => {
        const value = data.orders[key];
        return handleOrderCellRender(value, key);
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
