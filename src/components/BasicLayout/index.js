import Header from "../Header";
import styles from "./index.module.scss";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";

const BasicLayout = (props) => {
  const { user, onLogin } = props;

  return (
    <div className={styles.container}>
      <ScrollToTop />
      <Header user={user} onLogin={onLogin} />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default BasicLayout;
