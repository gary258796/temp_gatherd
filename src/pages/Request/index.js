import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.scss";
import { MENUS } from "../../constants/menus";
import { useTranslation } from "react-i18next";
import {
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { app } from "../../constants/FirebaseStorage";
import { getDatabase, ref as databaseRef, set } from "firebase/database";
import Footer from "../../components/Footer";
import { useEffect } from "react";

const Request = () => {
  const { t } = useTranslation();
  const { experienceId } = useParams();
  const navigate = useNavigate();
  const [time, setTime] = useState("");
  const [period, setPeriod] = useState("");
  const [guest, setGuest] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const menu = MENUS[experienceId];

  const personsArray = () => {
    const list = menu.persons.split("-");
    const min = parseInt(list[0]);
    const max = parseInt(list[1]);
    let result = [];
    for (let index = min; index < max + 1; index++) {
      result.push(index);
    }
    return result;
  };

  const checkValid = () => {
    if (!time) {
      alert("日期為必填");
      return false;
    }
    if (!guest) {
      alert("人數為必填");
      return false;
    }
    if (!name) {
      alert("姓名為必填");
      return false;
    }
    if (!email) {
      alert("Email 為必填");
      return false;
    }
    if (!phone) {
      alert("電話為必填");
      return false;
    }
    if (!checked) {
      alert("請同意體驗活動聲明");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!checkValid()) return;
    setLoading(true);
    const params = {
      experience: menu.name,
      price: menu.price,
      time,
      guest,
      email,
      name,
      phone,
      inquiry,
    };
    const db = getDatabase(app);
    await set(databaseRef(db, "request/" + new Date().getTime()), params);
    setLoading(false);
    setSuccess(true);
  };

  useEffect(() => {
    setGuest(personsArray()[0]);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.checkout}>
          <div className={styles.pageTitle}>詢問預訂時間</div>
          <div className={styles.content}>
            <div className={styles.forms}>
              <div className={styles.section}>
                <div className={styles.title}>預訂時間</div>
                <div className={styles.description}>
                  請提供想要的體驗時間及人數，我們會在三天內與美食創作家詢問後用
                  Email 與你聯絡
                </div>
                <FormControl className={styles.input} fullWidth>
                  <InputLabel>時段*</InputLabel>
                  <Select
                    value={period}
                    label="時段"
                    onChange={(e) => setPeriod(e.target.value)}
                  >
                    <MenuItem value="晚上 19:00-21:30">
                      晚上 19:00-21:30
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  className={styles.input}
                  label="日期*"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <div className={styles.description}>例：2023/05/01</div>
                <FormControl className={styles.input} fullWidth>
                  <InputLabel>人數*</InputLabel>
                  <Select
                    value={guest}
                    label="人數"
                    onChange={(e) => setGuest(e.target.value)}
                  >
                    {personsArray().map((count) => (
                      <MenuItem value={count} key={count}>
                        {count}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className={styles.section}>
                <div className={styles.title}>關於你</div>
                <TextField
                  className={styles.input}
                  label="Email*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className={styles.flex}>
                  <TextField
                    className={styles.input}
                    label="姓名*"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    className={styles.input}
                    label="電話*"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <TextField
                  className={styles.input}
                  label="備註"
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                />
                <div className={styles.description}>
                  如有忌口食物或任何其他需求請於此提出
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.title}>體驗活動聲明*</div>
                <div
                  className={styles.description}
                  style={{ fontSize: "16px" }}
                >
                  {
                    "經勾選同意即視為已知悉，並同意本約定條款的所有約定。\n\n1. 如造成體驗場地家具設備損壞，將判斷情節之嚴重性，必須支付該物品購買金額50%至100%之費用。\n\n2. 如活動結束卻不離開體驗空間而造成損失或損害，應就本平台或該他人之損失及損害負全部責任。"
                  }
                </div>
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                同意
              </div>
              <button className={styles.send} onClick={handleSubmit}>
                送出
              </button>
            </div>
            <div className={styles.block}>
              <div className={styles.summary}>
                <div className={styles.menu}>
                  <img src={menu.images[0]} alt="" className={styles.image} />
                  <div className={styles.info}>
                    <div>
                      <div className={styles.location}>{`${menu.location}・${
                        menu.duration
                      } ${t("menu.hour")}`}</div>
                      <div className={styles.name}>{menu.name}</div>
                    </div>
                    <div className={styles.host}>{menu.hostName}</div>
                  </div>
                </div>
                <div className={styles.detail}>
                  <div className={styles.title}>價格詳情</div>
                  <div className={styles.flex}>
                    <div>
                      {menu.price} TWD x {guest || 0} 人
                    </div>
                    <div>{menu.price * (guest || 0)} TWD</div>
                  </div>
                </div>
                <div className={styles.detail}>
                  <div className={styles.title}>取消政策</div>
                  <div className={styles.flex}>
                    若需取消訂單，會於下訂成功的郵件中附上取消表單，在訂單日期三天前皆可取消訂單，如在訂單日期三天內取消訂單你將需支付總費用的
                    50%。
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading && (
            <div className={styles.modalContainer}>
              <div className={styles.modal}>
                <CircularProgress />
              </div>
            </div>
          )}
          {success && (
            <div className={styles.modalContainer}>
              <div className={styles.modal}>
                <div className={styles.title}>詢問預訂時間送出成功！</div>
                <div className={styles.subtitle}>
                  將在三天內與美食創作家詢問後用 Email 與你聯絡
                </div>
                <button onClick={() => navigate(`..`)}>回首頁</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Request;
