import React from "react";
import styles from "./index.module.scss";
import banner from "../../images/banner.jpg";
import lineImg from "../../images/line.png";
import phoneImg from "../../images/phone.png";
import mailImg from "../../images/email.png";

const Explore = () => {
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
        "盡情發揮廚藝，讓喜愛你料理的人有機會分享給更多的人，吸引更多潛在的愛好者。",
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
      title: "建立社群網絡",
      subtitle: "經營一個屬於你的食物社群，分享你對料理的熱忱",
    },
  ];
  return (
    <>
      <div className={styles.banner}>
        <img src={banner} alt="" />
        <div className={styles.cover} />
        <div className={styles.text}>
          <div className={styles.title}>創造一個全新的食物體驗</div>
          <div className={styles.subtitle}>
            讓每個熱愛創作料理的人，可以在自己的空間，讓來自世界各地的好友、鄰居或陌生人品嚐美食，並分享他們的故事。
          </div>
          <button className={styles.button}>加入我們</button>
        </div>
      </div>
      <div className={styles.why}>
        <div className={styles.title}>「飲食造就社會。」—— 安東尼波登</div>
        <div className={styles.subtitle}>
          每個人都有獨特的料理方式，賦予食物獨一無二的樣貌，讓這些創作被分享、被看到、被品味，讓這些味道成為一段段的記憶，也成為人與人之間交流的橋樑。
        </div>
      </div>
      <div className={styles.benefits}>
        {benefits.map((benefit) => (
          <div className={styles.section}>
            <div className={styles.number}>{benefit.number}</div>
            <div className={styles.title}>{benefit.title}</div>
            <div className={styles.subtitle}>{benefit.subtitle}</div>
          </div>
        ))}
      </div>
      <div className={styles.problem}>
        <div className={styles.text}>
          <div className={styles.title}>Gatherd 的目標</div>
          <div className={styles.subtitle}>
            旨在創造機會串連對食物抱有相同熱情的人們，並形成新型的社交網絡。
          </div>
        </div>
        <div className={styles.image}>
          <img src={banner} alt="" />
        </div>
      </div>
      <div className={styles.vendors}>
        <div className={styles.title}>享用佳餚</div>
        <div className={styles.subtitle}>
          馬上來體驗我們美食創作家的料理，從他們身上聽到更多故事。
        </div>
        <button className={styles.button}>開始探索</button>
        <div className={styles.pictures}>
          <img src={banner} alt="" />
          <img src={banner} alt="" />
          <img src={banner} alt="" />
        </div>
      </div>
      <div className={styles.sendEmail}>
        <div className={styles.text}>
          <div className={styles.title}>最新消息</div>
          <div className={styles.subtitle}>
            請留下電子信箱，我們將分享更多相關資訊，邀請你與其他美食創作家一同參加我們所舉辦的體驗或活動，並且解答你所有的疑問。
          </div>
        </div>
        <div className={styles.input}>
          <input />
          <button>送出</button>
        </div>
      </div>
      <div className={styles.footer}>
        <div>©2023 Gatherd, Inc</div>
        <div className={styles.buttons}>
          <div className={styles.button}>關於 Gatherd</div>
          <div className={styles.button}>美食創作家</div>
          <div className={styles.button}>體驗</div>
          <div
            className={styles.button}
            onClick={() => window.open("tel:+886984499836")}
          >
            <img src={phoneImg} alt="" />
          </div>
          <div
            className={styles.button}
            onClick={() => window.open("mailto:eatgatherd@gmail.com")}
          >
            <img src={mailImg} alt="" />
          </div>
          <div
            className={styles.button}
            onClick={() => window.open("https://lin.ee/CGfqTpp")}
          >
            <img src={lineImg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
