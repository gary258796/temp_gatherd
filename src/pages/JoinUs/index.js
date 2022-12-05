import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Button, Typography } from "@mui/material";
import banner1 from "../../images/banner1.jpeg";
import banner2 from "../../images/banner2.jpeg";
import banner3 from "../../images/banner3.png";
import docImg from "../../images/doc.png";
import chefImg from "../../images/chef.png";
import menuImg from "../../images/menu.png";
import photoImg from "../../images/photo.png";
import profileImg from "../../images/profile.png";
import editImg from "../../images/edit.png";
import lineaccountImg from "../../images/lineaccount.png";
import phoneImg from "../../images/phone.png";
import mailImg from "../../images/mail.png";

const JoinUs = () => {
  const bannerImages = [banner1, banner2, banner3];

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <Swiper
          slidesPerView={1}
          className={styles.swiper}
          loop
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          {bannerImages.map((image, index) => (
            <SwiperSlide className={styles.slide} key={index}>
              <img src={image} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Typography variant="h2" textAlign="center" m={8}>
        分享你的美食創作
      </Typography>
      <Typography variant="h6" textAlign="center" width={400} mb={8}>
        熱愛美食創作者們，敞開你們的家門一同與你的親朋友好友們，鄰居，和其他Foodie分享你獨特的傳統和創億佳餚！
      </Typography>
      <div className={styles.joinUsInfo}>
        <div className={styles.mobileTitle}>
          <Typography variant="h3" textAlign="center">
            如何成為
          </Typography>
          <Typography variant="h3" textAlign="center">
            Gatherd
          </Typography>
          <Typography variant="h3" textAlign="center">
            美食創作家
          </Typography>
        </div>
        <div className={styles.title}>
          <Typography variant="h3" textAlign="center">
            如何成為Gatherd美食創作家
          </Typography>
        </div>
        <div className={styles.section}>
          <div className={styles.text}>
            <Typography variant="h5" mb={2}>
              食安字號申請
            </Typography>
            <Typography variant="body1" mb={2}>
              為了保護美食創作家的權利，食安字號為販售、運輸食品相關行為時，政府規定必須擁有之憑證。點擊以下連接申請。
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.open("https://forms.gle/9dDT8j4Baospn21n6")}
            >
              馬上申請
            </Button>
          </div>
          <img src={docImg} alt="" />
        </div>
        <div className={styles.section}>
          <img src={chefImg} alt="" />
          <div className={styles.text}>
            <Typography variant="h5" mb={2}>
              美食創作家帳號申請
            </Typography>
            <Typography variant="body1" mb={2}>
              讓我們以及熱愛美食者們可以更了解你的美食創作歷程，請提供美食創作家上路相關資訊。由於我們很重視照片的品質，因此照片會在另一個表單上傳，請注意！
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.open("https://forms.gle/7VWm5qSBZMBQAP8m8")}
            >
              開始探索
            </Button>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.text}>
            <Typography variant="h5" mb={2}>
              Meet & Dine 套餐申請
            </Typography>
            <Typography variant="body1" mb={2}>
              把你最拿手的傳統和創億佳餚分享給不同讓熱愛美食者們。請提供你的套餐資訊。由於我們很重視照片的品質，因此照片會在另一個表單上傳，請注意！
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.open("https://forms.gle/1xz3zwDKQvbcpTgF9")}
            >
              馬上申請
            </Button>
          </div>
          <img src={menuImg} alt="" />
        </div>
        <div className={styles.section}>
          <img src={photoImg} alt="" />
          <div className={styles.text}>
            <Typography variant="h5" mb={2}>
              照片上傳
            </Typography>
            <Typography variant="body1" mb={2}>
              為了讓你的照片在網頁上有更好的呈現，請遵守我們規範，將你準備好的照片上傳到這裡，才算是真正成為美食創作家/完成菜單上架！
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.open("https://forms.gle/fLCWENCt2q54Jo5s8")}
            >
              前往上傳
            </Button>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.text}>
            <Typography variant="h5" mb={2}>
              編輯個人資料
            </Typography>
            <Typography variant="body1" mb={2}>
              如有想更新你的美食創作歷程或其他聯繫資訊，請點擊此連結來編輯個人內容。
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.open("https://forms.gle/YocJTC12YPzndUe88")}
            >
              前往編輯
            </Button>
          </div>
          <img src={profileImg} alt="" />
        </div>
        <div className={styles.section}>
          <img src={editImg} alt="" />
          <div className={styles.text}>
            <Typography variant="h5" mb={2}>
              編輯 Meet & Dine 套餐
            </Typography>
            <Typography variant="body1" mb={2}>
              如有想提供或更新你的傳統和創億佳餚，請點擊此連結來編輯套餐內容。
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.open("https://forms.gle/q5ah7SgC6cyoL9226")}
            >
              前往編輯
            </Button>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.text}>
            <Typography variant="h5" mb={2}>
              LINE 官方帳號
            </Typography>
            <Typography variant="body1" mb={2}>
              為了提供美食創作家最即時的服務，提供了LINE的官方帳號，讓你的創作流程可以更加順利。點擊以下連接了解加入官方帳號。
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.open("https://lin.ee/CGfqTpp")}
            >
              立即加入
            </Button>
          </div>
          <img src={lineaccountImg} alt="" />
        </div>
      </div>
      <div className={styles.footer}>
        <Typography variant="body1" textAlign="center" mb={2}>
          與我們聯絡
        </Typography>
        <div className={styles.contact}>
          <img
            src={lineaccountImg}
            alt=""
            onClick={() => window.open("https://lin.ee/CGfqTpp")}
          />
          <img
            src={phoneImg}
            alt=""
            onClick={() => window.open("tel:+886984499836")}
          />
          <img
            src={mailImg}
            alt=""
            onClick={() => window.open("mailto:eatgatherd@gmail.com")}
          />
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
