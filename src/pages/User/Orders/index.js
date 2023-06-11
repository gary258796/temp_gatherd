import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { child, get, getDatabase, ref } from "firebase/database";
import { app } from "../../../constants/FirebaseStorage";
import { Navigate, useNavigate } from "react-router-dom";
import moment from "moment";
import { MENUS } from "../../../constants/menus";

const Orders = (props) => {
  const { user } = props;
  const navigate = useNavigate();
  const [orders, setOrders] = useState({});
  const db = getDatabase(app);
  const dbRef = ref(db);

  const getDisplayOrders = () => {
    const recentOrders = [];
    const pastOrders = [];
    Object.keys(orders).forEach((key) => {
      const order = orders[key];
      if (order.email === user?.email) {
        const isPastOrder = key > moment().unix() * 1000;
        if (isPastOrder) {
          pastOrders.push({ ...order, key });
        } else {
          recentOrders.push({ ...order, key });
        }
      }
    });
    return { recentOrders, pastOrders };
  };

  const handleOrderRender = (order) => {
    const { key, experience, time, price, guest } = order;
    const menuIndex = MENUS.findIndex((menu) => menu.name === experience);
    const menu = MENUS[menuIndex];
    const { hostName, images } = menu;
    return (
      <div key={key} className={styles.order}>
        <img
          src={images[0]}
          alt=""
          onClick={() => navigate(`../experiences/${menuIndex}`)}
        />
        <div
          className={styles.info}
          onClick={() => navigate(`../experiences/${menuIndex}`)}
        >
          <div className={styles.name}>{experience}</div>
          <div className={styles.host}>主辦者: {hostName}</div>
          <div className={styles.time}>{time}</div>
          <div className={styles.price}>
            ${price} x {guest}人
          </div>
        </div>
        <p onClick={() => window.open("mailto:dinegatherd@gmail.com")}>
          聯絡我們
        </p>
      </div>
    );
  };

  useEffect(() => {
    get(child(dbRef, "/orders"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setOrders(snapshot.val());
        }
      })
      .catch((error) => {});
  }, []);

  const { recentOrders, pastOrders } = getDisplayOrders();

  if (!user) return <Navigate to={"../"} />;

  return (
    <div className={styles.container}>
      <p className={styles.title}>訂單記錄</p>
      <div className={styles.orders}>{recentOrders.map(handleOrderRender)}</div>
      {pastOrders.length > 0 && (
        <>
          <h2>你去過的體驗</h2>
          <div className={styles.orders}>
            {pastOrders.map(handleOrderRender)}
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
