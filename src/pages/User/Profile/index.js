import styles from "./index.module.scss";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { app } from "../../../constants/FirebaseStorage";
import LoadingModal from "../../../components/LoadingModal";

const Profile = (props) => {
  const { user } = props;
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const db = getDatabase(app);
  const dbRef = ref(db);
  const path = `phone/${user?.email.split("@")[0]}`;

  const savePhone = async () => {
    if (phone.length !== 10) {
      alert("手機格式有誤");
      return;
    }
    setLoading(true);
    await set(ref(db, path), phone);
    setLoading(false);
  };

  useEffect(() => {
    get(child(dbRef, path))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPhone(snapshot.val());
        }
      })
      .catch((error) => {});
  }, []);

  if (!user) return <Navigate to={"../"} />;

  return (
    <div className={styles.container}>
      <p className={styles.title}>個人資料</p>
      <div>
        <div className={styles.info}>
          <h5>姓名</h5>
          <h6>{user.name}</h6>
        </div>
        <div className={styles.info}>
          <h5>電子信箱</h5>
          <h6>{user.email}</h6>
        </div>
        <div className={styles.info}>
          <h5>手機</h5>
          <input
            value={phone}
            type="number"
            pattern="[0-9]*"
            onChange={(e) =>
              setPhone((v) => (e.target.validity.valid ? e.target.value : v))
            }
          />
        </div>
      </div>
      <button onClick={savePhone} className={styles.button}>
        儲存
      </button>
      {loading && <LoadingModal />}
    </div>
  );
};

export default Profile;
