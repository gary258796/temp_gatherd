import styles from "./index.module.scss";
import { Button } from "@mui/material";
import banner from "../../images/banner.jpg";
import lineImg from "../../images/line.png";
import phoneImg from "../../images/phone.png";
import mailImg from "../../images/email.png";

const JoinUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.text}>
          <div className={styles.title}>分享你的美食創作</div>
          <div className={styles.subtitle}>
            熱愛美食的創作者們，敞開你們的家門一同與你的親朋友好友、鄰居和其他美食熱愛者分享你獨特的傳統和創意佳餚！
          </div>
        </div>
        <div className={styles.image}>
          <img src={banner} alt="" />
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoTitle}>如何成為 Gatherd 美食創作家</div>
        <div className={styles.steps}>
          <div className={styles.lineContainer}>
            <div className={styles.line} />
          </div>
          <div className={styles.step}>
            <div className={styles.text}>
              <div className={styles.number}>1</div>
              <div className={styles.title}>食安字號申請</div>
              <div className={styles.content}>
                為了保護美食創作家的權利，食安字號為販售、運輸食品相關行為時，政府規定必須擁有之憑證。點擊以下連接申請。
              </div>
            </div>
            <Button
              variant="contained"
              onClick={() => window.open("https://forms.gle/9dDT8j4Baospn21n6")}
            >
              馬上申請
            </Button>
          </div>
          <div className={styles.step}>
            <div className={styles.text}>
              <div className={styles.number}>2</div>
              <div className={styles.title}>美食創作家帳號申請</div>
              <div className={styles.content}>
                讓我們以及熱愛美食者們可以更了解你的美食創作歷程，請提供美食創作家上路相關資訊。由於我們很重視照片的品質，因此照片會在另一個表單上傳，請注意！
              </div>
            </div>
            <Button
              variant="contained"
              onClick={() => window.open("https://forms.gle/7VWm5qSBZMBQAP8m8")}
            >
              開始探索
            </Button>
          </div>
          <div className={styles.step}>
            <div className={styles.text}>
              <div className={styles.number}>3</div>
              <div className={styles.title}>Meet & Dine 套餐申請</div>
              <div className={styles.content}>
                把你最拿手的傳統和創億佳餚分享給不同讓熱愛美食者們。請提供你的套餐資訊。由於我們很重視照片的品質，因此照片會在另一個表單上傳，請注意！
              </div>
            </div>
            <Button
              variant="contained"
              onClick={() => window.open("https://forms.gle/1xz3zwDKQvbcpTgF9")}
            >
              馬上申請
            </Button>
          </div>
          <div className={styles.step}>
            <div className={styles.text}>
              <div className={styles.number}>4</div>
              <div className={styles.title}>照片上傳</div>
              <div className={styles.content}>
                為了讓你的照片在網頁上有更好的呈現，請遵守我們規範，將你準備好的照片上傳到這裡，才算是真正成為美食創作家/完成菜單上架！
              </div>
            </div>
            <Button
              variant="contained"
              onClick={() => window.open("https://forms.gle/fLCWENCt2q54Jo5s8")}
            >
              前往上傳
            </Button>
          </div>
        </div>
        <div className={styles.steps}>
          <div className={styles.lineContainer}>
            <div className={styles.line2} />
          </div>
          <div className={styles.step}>
            <div className={styles.text}>
              <div className={styles.number}>5</div>
              <div className={styles.title}>編輯個人資料</div>
              <div className={styles.content}>
                如有想更新你的美食創作歷程或其他聯繫資訊，請點擊此連結來編輯個人內容。
              </div>
            </div>
            <Button
              variant="contained"
              onClick={() => window.open("https://forms.gle/YocJTC12YPzndUe88")}
            >
              前往編輯
            </Button>
          </div>
          <div className={styles.step}>
            <div className={styles.text}>
              <div className={styles.number}>6</div>
              <div className={styles.title}>編輯 Meet & Dine 套餐</div>
              <div className={styles.content}>
                如有想提供或更新你的傳統和創億佳餚，請點擊此連結來編輯套餐內容。
              </div>
            </div>
            <Button
              variant="contained"
              onClick={() => window.open("https://forms.gle/q5ah7SgC6cyoL9226")}
            >
              前往編輯
            </Button>
          </div>
          <div className={styles.step}>
            <div className={styles.text}>
              <div className={styles.number}>7</div>
              <div className={styles.title}>LINE 官方帳號</div>
              <div className={styles.content}>
                為了提供美食創作家最即時的服務，提供了LINE的官方帳號，讓你的創作流程可以更加順利。點擊以下連接了解加入官方帳號。
              </div>
            </div>
            <Button
              variant="contained"
              onClick={() => window.open("https://lin.ee/CGfqTpp")}
            >
              立即加入
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>©2023 Gatherd, Inc</div>
        <div className={styles.buttons}>
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
    </div>
  );
};

export default JoinUs;
