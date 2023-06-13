import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styles from "./index.module.scss";
import { MENUS } from "../../constants/menus";
import { handleDisplayTimes } from "../../utils/time";
import { useTranslation } from "react-i18next";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { app } from "../../constants/FirebaseStorage";
import { useEffect } from "react";
import { getDatabase, ref, set, get, child } from "firebase/database";
import Footer from "../../components/Footer";
import LoadingModal from "../../components/LoadingModal";

const Checkout = (props) => {
  const { user } = props;
  const { t, i18n } = useTranslation();
  const { experienceId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [time, setTime] = useState("");
  const [guest, setGuest] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [paymentDetail, setPaymentDetail] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const menu = MENUS[experienceId][i18n.language];
  const db = getDatabase(app);
  const dbRef = ref(db);
  const availableTimes = handleDisplayTimes(menu.availableTimes);
  const path = `phone/${user?.email.split("@")[0]}`;

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
    if (!phone) {
      alert("電話為必填");
      return false;
    }
    if (!paymentDetail) {
      alert(
        `${
          paymentMethod === "bank" ? "匯款帳號後五碼" : "LINE 使用者名稱"
        }為必填`
      );
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
      experienceId: MENUS[experienceId].id,
      price: menu.price,
      time,
      guest,
      email: user?.email,
      name: user?.name,
      phone,
      inquiry,
      paymentDetail,
      paymentMethod,
    };
    await set(ref(db, "orders/" + new Date().getTime()), params);
    await set(ref(db, path), phone);
    setLoading(false);
    setSuccess(true);
  };

  useEffect(() => {
    setGuest(personsArray()[0]);
    get(child(dbRef, path)).then((snapshot) => {
      if (snapshot.exists()) {
        setPhone(snapshot.val());
      }
    });
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    if (!date || !time) return;
    setTime(`${date} ${time}`);
  }, []);

  if (!user) return <Navigate to={"../"} />;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.checkout}>
          <div className={styles.pageTitle}>確認付款</div>
          <div className={styles.content}>
            <div className={styles.forms}>
              <div className={styles.section}>
                <div className={styles.title}>你的體驗</div>
                <FormControl className={styles.input} fullWidth>
                  <InputLabel>日期</InputLabel>
                  <Select
                    value={time}
                    label="日期"
                    onChange={(e) => setTime(e.target.value)}
                  >
                    {availableTimes.map((time) => (
                      <MenuItem
                        value={`${time.date} ${time.time}`}
                        key={`${time.date} ${time.time}`}
                      >{`${time.date} ${time.time}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={styles.input} fullWidth>
                  <InputLabel>人數</InputLabel>
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
                  label="Email"
                  value={user?.email || ""}
                  disabled
                />
                <div className={styles.flex}>
                  <TextField
                    className={styles.input}
                    label="姓名"
                    value={user?.name || ""}
                    disabled
                  />
                  <TextField
                    className={styles.input}
                    label="電話"
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
                <div className={styles.title}>付款資訊</div>
                <FormControl className={styles.input} fullWidth>
                  <InputLabel>付款方式</InputLabel>
                  <Select
                    value={paymentMethod}
                    label="付款方式"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <MenuItem value={"bank"}>
                      轉帳：(822) - 0000218540154981
                    </MenuItem>
                    <MenuItem value={"linepay"}>
                      LINE Pay: jo841130s (黃冠中)
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  className={styles.input}
                  label={
                    paymentMethod === "bank"
                      ? "匯款帳號後五碼"
                      : "LINE 使用者名稱"
                  }
                  value={paymentDetail}
                  onChange={(e) => setPaymentDetail(e.target.value)}
                />
                <div className={styles.description}>
                  {
                    "若選取 LinePay，請先傳送一則訊息「Gatherd 訂單匯款」，待回覆之後再進行匯款\n若訂單遭取消，將會依匯款銀行或 LINE 帳號進行退款"
                  }
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.title}>體驗活動聲明</div>
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
                預定
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
          {loading && <LoadingModal />}
          {success && (
            <div className={styles.modalContainer}>
              <div className={styles.modal}>
                <div className={styles.title}>預定成功！</div>
                <div className={styles.subtitle}>
                  將於確定訂單後用 Email 通知你
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

export default Checkout;
