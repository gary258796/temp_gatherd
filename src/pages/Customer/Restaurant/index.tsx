import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import styles from "./index.module.scss"
import { useState } from "react"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import ExpandText from "../../../components/ExpandText";
import instagramImg from '../../../images/instagram.png'
import facebookImg from '../../../images/facebook.png'

const data = {
  name: 'W.Cookery',
  type: '西式料理',
  section: '中山區',
  address: '台北市中山區林森北路119巷22號四樓之一',
  customerCountOptions: [2, 3, 4, 5, 6],
  timePeriods: [
    { title: '午餐', periods: [{ id: 0, value: '12:00' }, { id: 1, value: '13:00' }] },
    { title: '晚餐', periods: [{ id: 3, value: '18:00' }, { id: 4, value: '20:00' }] }
  ],
  notices: [
    '請先參考本季菜單，並且在訂位時備註選擇的主餐。以下之飲食忌口無法做修改：麩質、奶類、素食者本季僅更換常見過敏原，ex：生食、蝦類，如單純為個人喜好，將不另外協助更換。',
    '每人低消為一份套餐，Set Menu 價格含水資',
    '請填入手機聯絡號碼，有更多特殊需求，請私訊粉絲專頁收到訂位通知後，請支付訂金$1000/人，用餐前七日取消者，訂金恕不退還',
    '學習速度快，會不斷吸收新知，讓自己有更強的競爭力'
  ],
  about: '烹然，尊重食材的自然特性，尋找最終的料理之道，帶出味覺的怦然體驗\n-\n「烹」烹調、烹飪。在料理過程中的萬般技術。它包括了食材挑選、前處理、火候、調味、擺盤。「然」自然、道理。在烹飪中，「然」是尊重食材的自然特性與本味，尋找適合的風味搭配與手法，呈現最終的完美架構。',
  image: 'data:image/jpeg;base64,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',
  googleMap: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.516750271148!2d121.52342487537702!3d25.050468877805788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9496c22e67b%3A0xb95e3d08676028f3!2zVy4gQ29va2VyeSDng7nnhLbnp4Hlu5o!5e0!3m2!1szh-TW!2stw!4v1697962943991!5m2!1szh-TW!2stw" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  socialMedia: [
    { type: 'instagram', link: 'https://www.instagram.com/w.cookery2022/' },
    { type: 'facebook', link: 'https://www.facebook.com/w.cookery/' }
  ],
  phone: '02 2718 9319',
  email: 'w.cookery915@gmail.com',
  line: 'https://linktr.ee/wcookery2022'
}

const Restaurant = () => {
  const {
    name,
    type,
    section,
    address,
    customerCountOptions,
    timePeriods,
    notices,
    about,
    image,
    googleMap,
    socialMedia,
    phone,
    email,
    line
  } = data
  const [customerCount, setCustomerCount] = useState<number>(customerCountOptions[0])
  const [date, setDate] = useState<any>()

  const handleIconRender = (type: string) => {
    let src = ''
    switch (type) {
      case 'facebook':
        src = facebookImg
        break;
      case 'instagram':
        src = instagramImg
        break;
      default:
        break;
    }
    return <img src={src} alt='' />
  }

  return (
    <div className={styles.container}>
      <div className={styles.mobileImageContainer}>
        <img src={image} alt="" />
      </div>
      <div className={styles.left}>
        <Typography variant="h3">{name}</Typography>
        <div className={styles.subtitle}>
          <Typography variant="body1">{type}</Typography>
          <Typography variant="body1">{section}</Typography>
        </div>
        <div className={styles.forms}>
          <FormControl fullWidth className={styles.form}>
            <InputLabel id="customerCount">人數</InputLabel>
            <Select
              labelId="customerCount"
              value={customerCount}
              label="人數"
              onChange={(e) => setCustomerCount(Number(e.target.value))}
            >
              {customerCountOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}人</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className={styles.datepicker}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="日期" value={date} onChange={setDate} format="YYYY/MM/DD" />
            </DemoContainer>
          </FormControl>
        </div>
        {date && (
          <div className={styles.time}>
            {timePeriods.map((timePeriod) => (
              <div key={timePeriod.title} className={styles.timePeriod}>
                <Typography variant="caption">{timePeriod.title}</Typography>
                <div className={styles.periods}>
                  {timePeriod.periods.map((period) => (
                    <div key={period.id}>
                      <Typography variant="body1">{period.value}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.notice}>
          <Typography variant="h6">注意事項</Typography>
          <ExpandText>
            <ol>
              {notices.map((notice) => <li key={notice}>{notice}</li>)}
            </ol>
          </ExpandText>
        </div>
        <div className={styles.about}>
          <Typography variant="h6">關於 {name}</Typography>
          <ExpandText>{about}</ExpandText>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.imageContainer}>
          <img src={image} alt="" />
        </div>
        <div className={styles.mapContainer}>
          <div className={styles.map}>
            <div dangerouslySetInnerHTML={{ __html: googleMap }} />
          </div>
          <div className={styles.content}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2">{address}</Typography>
            <Typography variant="caption">{type} {section}</Typography>
            <div className={styles.media}>
              {socialMedia.map((media) => (
                <div key={media.type} onClick={() => window.open(media.link)}>
                  {handleIconRender(media.type)}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.content}>
            {phone}
          </div>
          <div className={styles.content}>
            {email}
          </div>
          <div className={styles.content}>
            {line}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Restaurant
