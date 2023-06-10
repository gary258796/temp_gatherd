import styles from "./index.module.scss";
import { Navigate } from "react-router-dom";

const Profile = (props) => {
  const { user } = props;

  if (!user) return <Navigate to={"../"} />;

  return (
    <div className={styles.container}>
      <p className={styles.title}>個人資料</p>
      <div>
        <h5>姓名</h5>
        <h6>{user.name}</h6>
      </div>
      <div>
        <h5>電子信箱</h5>
        <h6>{user.email}</h6>
      </div>
    </div>
  );
};

export default Profile;
