import styles from './index.module.scss'
import img1 from './images/1.png'
import img2 from './images/2.png'
import img3 from './images/3.png'
import img4 from './images/4.png'
import { useRef, useState } from 'react'

const Section = ({ image, title, titleClassName = '', subtitle, content, button, isReverse, isGreen, buttonOnClick }) => {
	return (
		<div className={`${styles.section} ${isReverse && styles.reverse} ${isGreen ? styles.green : styles.white}`}>
			<div className={styles.box}>
				<div className={styles.text}>
					<div className={`${styles.title} ${titleClassName}`}>
						{title}
						{subtitle && <div>{subtitle}</div>}
					</div>
					<div className={styles.content}>{content}</div>
					{button && <button onClick={buttonOnClick}>{button}</button>}
				</div>
				<div className={styles.image}>
					<img src={image} alt='' />
				</div>
			</div>
		</div>
	)
}

const NewHome = () => {
	const ref = useRef(null)
	const [restaurant, setRestaurant] = useState('')
	const [employees, setEmployees] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const buttonDisabled = !name || !email || !phone || !employees || !restaurant

	const scrollToForm = () => {
		ref.current.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.text}>Gatherd</div>
			</div>
			<Section
				image={img1}
				title="專屬預約制餐廳"
				subtitle="一站式解決方案"
				content="Gatherd OS 自動化管理餐廳的訂位，並協助你整合每個預定的顧客需求，降低餐廳溝通成本"
				button="預約試用"
				isGreen
				buttonOnClick={scrollToForm}
				titleClassName={styles.alignLeft}
			/>
			<Section
				image={img2}
				title="數位化訂位管理"
				content="有專屬於餐廳的網頁，幫助顧客更了解餐廳訂位資訊，並依據顧客選擇的人數提供對應尚可訂位的時段，減少人力成本。餐廳可隨時編輯開放訂位的時段或座位數，讓餐廳能有更大的彈性"
				isReverse
			/>
			<Section
				image={img3}
				title="客製化需求管理"
				content="預約制餐廳大多提供顧客高客製化的服務，需要大量的時間溝通，並且資訊散落在不同渠道。Gatherd OS 讓餐廳能建立給顧客填寫的表單，系統化管理需求，再也不用勞心於訂位資料的整理"
			/>
			<Section
				image={img4}
				title="顧客關係維護"
				content="每筆訂位的顧客資料和顧客需求都將存入資料庫，讓餐廳能在有回頭客時查看顧客過去的歷史紀錄，了解顧客的用餐偏好、提供更好的服務，也可以透過這些資料和數據輔助餐廳的營運"
				isReverse
			/>
			<div className={styles.contact} ref={ref}>
				<div className={styles.box}>
					<div className={styles.text}>
						<div className={styles.title}>預約試用</div>
						<div className={styles.content}>
							目前產品處於開發階段，預計於 2023 年底上線，請填寫以下資料預約試用
						</div>
					</div>
					<div className={styles.forms}>
						<input placeholder='餐廳名稱' value={restaurant} onChange={(e) => setRestaurant(e.target.value)} />
						<input placeholder='員工人數' value={employees} onChange={(e) => setEmployees(e.target.value)} />
						<input placeholder='姓名' value={name} onChange={(e) => setName(e.target.value)} />
						<input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
						<input placeholder='手機' value={phone} onChange={(e) => setPhone(e.target.value)} />
						<button className={buttonDisabled ? styles.disabled : ''}>
							送出
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NewHome
