import React, { useState } from "react";
import styles from "./index.module.scss";
import banner from "../../images/banner.jpg";
import banner2 from "../../images/banner2.jpg";
import eric from "../../images/vendors/eric.png";
import joe from "../../images/vendors/joe.png";
import gary from "../../images/vendors/gary.png";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, set } from "firebase/database";
import logo from "../../images/logo.png";

const Explore = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const benefits = [
    {
      number: "01",
      title: "零成本 輕鬆起步",
      subtitle:
        "簡單明瞭的流程，讓你可以無成本快速成為我們的美食創作家，把料理的熱情轉化為收入的來源。",
    },
    {
      number: "02",
      title: "一切自己做主",
      subtitle:
        "自由規劃的時程安排，賦予美食創作家接受訂單與否的權利。不受限制的菜單設計，建立自己的料理模式，與大家分享你的創意。",
    },
    {
      number: "03",
      title: "分享料理",
      subtitle:
        "盡情發揮廚藝，讓喜愛你料理的人有機會分享給更多的人，吸引其他潛在的愛好者。",
    },
    {
      number: "04",
      title: "拓展可能性",
      subtitle: "增加料理的曝光度，找到專屬客群，打造自己的美食國度。",
    },
    {
      number: "05",
      title: "共學共好",
      subtitle:
        "加入一個有眾多美食創作者的地方，分享彼此對料理的熱情，一起交流、學習、成長。",
    },
    {
      number: "06",
      title: "建立你的美食群",
      subtitle: "建立一個屬於你的美食群，分享你對料理的熱忱。",
    },
  ];
  const vendors = [
    { name: "Eric C", image: eric },
    { name: "Joe H", image: joe },
    { name: "Gary L", image: gary },
  ];
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
          const emails = snapshot.val().emails || [];
          emails.push(email);
          set(ref(db, "emails"), emails);
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

  return (
    <>
      <div className={styles.banner}>
        <img className={styles.backgroundImg} src={banner} alt="" />
        <div className={styles.cover} />
        <div className={styles.text}>
          <div className={styles.title}>創造一個食物體驗</div>
          <div className={styles.subtitle}>
            讓每個熱愛創作料理的人，可以在自己的空間，讓來自世界各地的好友、鄰居或陌生人品嚐美食，並分享他們的故事。
          </div>
          <button
            className={styles.button}
            onClick={() => navigate("../joinus")}
          >
            加入我們
          </button>
        </div>
        <img className={styles.logo} src={logo} alt="" />
      </div>
      <div className={styles.why}>
        <div className={styles.title}>
          <div>「飲食造就社會。」</div>
          <div>
            <div className={styles.dash}>——</div>安東尼波登
          </div>
        </div>
        <div className={styles.subtitle}>
          每個人都有獨特的料理方式，賦予食物獨一無二的樣貌，讓這些創作被分享、看到、及品味到。讓這些味道成為一段段的記憶，也成為人與人之間交流的橋樑。
        </div>
      </div>
      <div className={styles.benefits}>
        <div className={styles.title}>什麼是 Gatherd</div>
        <div className={styles.container}>
          {benefits.map((benefit) => (
            <div className={styles.section} key={benefit.number}>
              <div className={styles.number}>{benefit.number}</div>
              <div className={styles.title}>{benefit.title}</div>
              <div className={styles.subtitle}>{benefit.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.problem}>
        <div className={styles.text}>
          <div className={styles.subtitle}>
            致力於為美食愛好者創造機會，與志同道合的人們建立新的關係與交流。
          </div>
          <button onClick={() => navigate("../joinus")}>加入我們</button>
        </div>
        <div className={styles.image}>
          <img src={banner2} alt="" />
        </div>
      </div>
      <div className={styles.vendors}>
        <div className={styles.title}>享用佳餚</div>
        <div className={styles.subtitle}>
          馬上來體驗我們美食創作家的料理，從他們身上聽到更多故事。
        </div>
        <div className={styles.pictures}>
          {vendors.map((vendor) => (
            <div className={styles.vendor} key={vendor.name}>
              <img src={vendor.image} alt="" />
              <div className={styles.name}>{vendor.name}</div>
            </div>
          ))}
        </div>
        <button className={styles.button} onClick={() => navigate("../")}>
          開始探索
        </button>
      </div>
      <div className={styles.divider}>
        <div />
      </div>
      <div className={styles.sendEmail}>
        <div className={styles.text}>
          <div className={styles.title}>了解更多</div>
          <div className={styles.subtitle}>
            請留下電子信箱，我們將分享更多相關資訊，邀請你與其他美食創作家一同參加我們所舉辦的體驗及活動，並且解答你所有的疑問。
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

export default Explore;
