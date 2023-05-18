import styles from "./index.module.scss";

const HostCard = (props) => {
  const { host } = props;

  return (
    <div className={styles.container}>
      <img src={host.hostImage} alt="" />
      <div className={styles.info}>
        <div className={styles.name}>{host.hostName}</div>
        <div className={styles.description}>{host.hostIntroduction}</div>
      </div>
    </div>
  );
};

export default HostCard;
