import React, { useState } from "react";
import styles from "./index.module.scss";
import banner from "../../images/banner.jpg";
import banner2 from "../../images/banner2.jpg";
import creator1 from "../../images/creators/1.jpg";
import creator2 from "../../images/creators/2.jpg";
import creator3 from "../../images/creators/3.jpg";
import eric from "../../images/vendors/eric.png";
import joe from "../../images/vendors/joe.png";
import gary from "../../images/vendors/gary.png";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, set } from "firebase/database";

const Explore = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const creator = [
    {
      title: "熱愛料理",
      subtitle:
        "你樂於烹飪，會挑戰各種菜系、嘗試不同方式、運用在地食材創造屬於你的料理。你可以把這些喜悅分享給更多人，透過料理進行文化交流是個不可思議的過程。",
      image: creator1,
    },
    {
      title: "有獨特性",
      subtitle:
        "你擁有獨一無二的生活風格，或許你是一個全職 DJ，或許你是一個古董收藏家，或許你是個業餘咖啡師。把這樣的獨特生活結合料理，帶給你的客人一段超越味蕾的體驗。",
      image: creator2,
    },
    {
      title: "樂於分享",
      subtitle:
        "你是個樂於分享且好客的人，會邀請親朋好友來到你的空間用餐、舉辦聚餐活動，與大家分享你的料理以及故事，是一段經由美食的交流，共同創造難忘的美好回憶。",
      image: creator3,
    },
  ];
  const benefits = [
    {
      number: "01",
      title: "興趣化為收入",
      subtitle:
        "可以把你對料理的興趣轉換為新的收入來源，不需要擁有一間餐廳，不需要聘請員工，不需要行銷預算，只需要對料理的熱情，透過 Gatherd 簡單的上架流程成為一個美食創作家。",
    },
    {
      number: "02",
      title: "一切自己做主",
      subtitle:
        "調整自如的時程安排，不受限制的菜單設計，建立自己的料理模式，賦予美食創作家接受客人預訂與否的權利，我們希望給你有最大的自由，讓你專心在創意上。",
    },
    {
      number: "03",
      title: "用食物說故事",
      subtitle:
        "你可以在 Gatherd 上讓客人知道你是個怎麼樣的人，透過菜單的設計、食物的照片、自我介紹的文字，都會是我們呈現你的獨特的最佳方式，讓客人在體驗之前就已經對你充滿想像。",
    },
    {
      number: "04",
      title: "分享給更多人",
      subtitle:
        "透過 Gatherd 創造更多分享廚藝的機會，盡情展現你的料理，我們會幫助你找到一樣熱愛美食，並且欣賞你創造能力的人，不斷有新的發現、新的認識，這對你來說會是一場探索之旅。",
    },
    {
      number: "05",
      title: "共學共好",
      subtitle:
        "加入懷有相同喜好人組成的群體，彼此分享想法和靈感。大家都對食物抱有熱情，相互交流、協作、成長和學習，這樣的過程會讓你更具有創造力，激發意想不到的火花。",
    },
    {
      number: "06",
      title: "建立自己的社群",
      subtitle:
        "讓喜愛你料理的人感覺到你對烹飪的熱忱，與他們一起探索不一樣的聚餐體驗，讓他們從中被啟發並感到有趣。聚餐之前或許互不相識，但經歷這段體驗後，你們會成為有共同回憶的好友。",
    },
  ];
  const how = [
    {
      number: "1",
      title: "設計菜單",
      subtitle:
        "發揮你的想像力，設計一個專屬於你的菜單。不限於任何種類的料理或用餐形式，將你的熱情和創意在這裡展現。",
    },
    {
      number: "2",
      title: "選擇用餐空間",
      subtitle:
        "找到一個適合你料理的空間。可以是自己的住家、親朋好友的場地或是任何其他可以激發你的創造力的地方。與跟你一樣熱愛美食的人們在這裏一起享受料理。",
    },
    {
      number: "3",
      title: "開始聚餐體驗",
      subtitle:
        "只要你準備好了，通過簡單又快速的上架流程，就可以加入我們成為美食創作家，讓我們一起期待未來的旅程！",
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
          <div className={styles.title}>創造不一樣的聚餐體驗</div>
          <div className={styles.subtitle}>
            讓每個熱愛烹飪的人，可以在自己的空間，與來自各地、喜歡美食的人們分享你的料理和故事。
          </div>
          <button
            className={styles.button}
            onClick={() => window.open("https://lin.ee/CGfqTpp")}
          >
            加入我們
          </button>
        </div>
      </div>
      <div className={styles.why}>
        <div className={styles.title}>
          <div>「飲食造就社會。」</div>
          <div>
            <div className={styles.dash}>——</div>安東尼波登
          </div>
        </div>
        <div className={styles.subtitle}>
          每個人都有獨特的料理方式，賦予食物獨一無二的樣貌，讓這些料理被分享、看到及品嚐，讓這些味道成為一段段的記憶，也成為人與人之間交流的橋樑。
        </div>
      </div>
      <div className={styles.creator}>
        <div className={styles.creatorTitle}>你是美食創作家嗎？</div>
        <div className={styles.sections}>
          {creator.map((c) => (
            <div className={styles.section} key={c.title}>
              <img src={c.image} alt="" />
              <div className={styles.content}>
                <div className={styles.title}>{c.title}</div>
                <div className={styles.subtitle}>{c.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.benefits}>
        <div className={styles.title}>加入Gatherd能夠...</div>
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
          <button onClick={() => navigate("../")}>加入我們</button>
        </div>
        <div className={styles.image}>
          <img src={banner2} alt="" />
        </div>
      </div>
      {/* <div className={styles.vendors}>
        <div className={styles.title}>立即體驗</div>
        <div className={styles.subtitle}>
          馬上來認識我們的美食創作家，每一位都有自己的特色，在加入我們之前可以先來試這會是個怎麼樣的體驗。
        </div>
        <div className={styles.pictures}>
          {vendors.map((vendor) => (
            <div
              className={styles.vendor}
              key={vendor.name}
              onClick={() => navigate("../")}
            >
              <img src={vendor.image} alt="" />
              <div className={styles.name}>{vendor.name}</div>
            </div>
          ))}
        </div>
      </div> */}
      <div className={styles.how}>
        <div className={styles.title}>如何加入Gatherd?</div>
        <div className={styles.sections}>
          {how.map((h) => (
            <div className={styles.section} key={h.number}>
              <div className={styles.number}>{h.number}</div>
              <div className={styles.sectionTitle}>{h.title}</div>
              <div className={styles.sectionSubtitle}>{h.subtitle}</div>
            </div>
          ))}
        </div>
        <button
          className={styles.button}
          onClick={() => window.open("https://lin.ee/CGfqTpp")}
        >
          加入我們
        </button>
      </div>
      <div className={styles.sendEmail}>
        <div className={styles.text}>
          <div className={styles.title}>了解更多</div>
          <div className={styles.subtitle}>
            請留下電子信箱，我們將分享更多相關資訊，或邀請你與其他美食創作家一同參加我們舉辦的體驗及活動，並且解答你所有的疑問。
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
