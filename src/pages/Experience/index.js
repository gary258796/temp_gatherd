import Footer from "../../components/Footer";
import styles from "./index.module.scss";
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../images/banner.jpg";
import banner3 from "../../images/banner3.jpg";
import alice from "../../images/host/alice.jpg";
import ItemCard from "../../components/ItemCard";

const Experience = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [email, setEmail] = useState("");

  const firebaseConfig = {
    databaseURL:
      "https://gatherd-test-default-rtdb.asia-southeast1.firebasedatabase.app/",
  };
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const dbRef = ref(db);

  const handleSaveEmail = () => {
    get(child(dbRef, "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const customerEmails = snapshot.val().customerEmails || [];
          customerEmails.push(email);
          set(ref(db, "customerEmails"), customerEmails);
          setEmail("");
          alert("成功！");
        } else {
          alert("失敗請稍後再試！");
        }
      })
      .catch((error) => {
        alert("失敗請稍後再試！");
      });
  };

  useEffect(() => {
    // 用來寫入資料用
    // set(ref(db, "vendor"), VENDORS_DATA);
    // set(ref(db, "menu"), SET_MENUS);
    get(child(dbRef, "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMenus(snapshot.val().menu);
          setVendors(snapshot.val().vendor);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className={styles.banner}>
        <div className={styles.text}>
          <div className={styles.title}>體驗多元、獨特的聚餐模式</div>
          <div className={styles.subtitle}>
            你是否曾想嘗試餐廳或外送以外的聚模式嗎？Gatherd與熱愛烹飪料理者合作，
          </div>
          <div className={styles.subtitle}>
            讓喜愛美食體驗的你能夠在料理者家中嘗試不同以往的聚餐體驗！
          </div>
        </div>
        <img src={banner3} alt="" />
      </div>
      <div className={styles.description}>
        <div className={styles.content}>
          <div className={styles.text}>
            <div className={styles.title}>
              Gatherd 致力於透過各式各樣的料理方式將人們聚集在一起
            </div>
            <p>
              我們相信最好的聚餐體驗藏在城市中的每個角落。他們是來自不同背景的人們，可能是一個全職DJ、小學老師或者是身邊的老奶奶們，這些人都有一個共同的地方-熱愛烹飪料理並且樂於與其他人分享。
            </p>
            <p>
              我們想將這種獨特的體驗帶給同樣想要不同於現有聚餐模式的你，透過這樣的模式體驗不同的在地飲食文化。
            </p>
            <button onClick={() => navigate("../")}>開始體驗</button>
          </div>
          <img src={banner} alt="" />
          <button onClick={() => navigate("../")}>開始體驗</button>
        </div>
      </div>
      <div className={styles.adventure}>
        <div className={styles.title}>與Gatherd 一同體驗吧</div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <p>嘗試獨特料理</p>
            <div>品嚐在任何餐廳都找不到的新式料理模式</div>
          </div>
          <div className={styles.card}>
            <p>特別的體驗</p>
            <div>離開眾多人群的餐廳，體驗不同氛圍的聚餐空間</div>
          </div>
          <div className={styles.card}>
            <p>結交新夥伴</p>
            <div>透過料理者們的背景，深度了解他們在每一道料理背後的故事。</div>
          </div>
        </div>
      </div>
      <div className={styles.how}>
        <div className={styles.text}>
          <div className={styles.title}>Gatherd的旅程如何開始</div>
          <div className={styles.content}>
            <div>
              我們的啟發來自於我90歲的奶奶，她在內戰後從上海來到了台北。在成長過程中，我們在家中接觸到她的上海烹飪技巧的融合。小時候，我記得看著她邀請她的朋友們來家裡吃飯，現在長大後也會讓我想邀請我的朋友們一起在她家共進她做的料理，並聽她講述引人入勝的故事。
            </div>
            <div>
              我們意識到像我的奶奶一樣，許多人有著獨特的烹飪風格和故事。我們的目標是為更多的人提供這樣獨特的聚餐體驗，讓他們可以透過食物和故事相互聯繫與分享。
            </div>
            <button onClick={() => navigate("../")}>開始體驗</button>
          </div>
        </div>
        <div className={styles.host}>
          <img src={alice} alt="" />
          <div className={styles.text}>
            <div className={styles.name}>Alice</div>
            <div className={styles.info}>
              我是盈盈，於泰國清邁來台灣生活。在台灣時我覺得很難找道地美味的泰國料理，我想讓你們體驗道地的泰國料理看看，也想分享你們沒有吃過的泰國料理，如果有機會我也想做泰北料理。泰國的北部，東北部，中部和南部的料理完全不一樣，味道及材料也不一樣，我希望你可以一起來體驗看看！
            </div>
          </div>
        </div>
      </div>
      <div className={styles.menus}>
        <div className={styles.title}>開始探索</div>
        <div className={styles.cards}>
          {menus.map((menu) => {
            const vendor = vendors.find(
              (vendor) => vendor.id === menu.vendorId
            );
            if (!vendor) return <></>;
            return (
              <ItemCard
                images={menu.images}
                location={vendor.location}
                name={menu.name}
                price={menu.price}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.sendEmail}>
        <div className={styles.text}>
          <div className={styles.title}>了解更多</div>
          <div className={styles.subtitle}>
            請留下電子信箱，我們將分享更多相關資訊。
          </div>
        </div>
        <div className={styles.input}>
          <input
            placeholder="電子信箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSaveEmail}>送出</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Experience;
