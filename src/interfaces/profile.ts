export interface IOrderForm {
  title: string
  answer: string
}

export interface IOrder {
  date: string
  period: string
  customerCount: string
  name: string
  email: string
  phone: string
  /** 訂單狀態（0:已取消, 1:訂單） */
  status: 0 | 1
  memo: string
  form?: IOrderForm[];
}

export interface ISeatSetting {
  total: number
  min: number
  max: number
}

export interface ITimePeriods {
  title: string
  list: string[]
}

export interface ITimeSetting {
  day: number
  isGeneralHoliday?: boolean
  periods: ITimePeriods[]
}

export interface IAdditionalTimeSetting {
  date: string
  closePeriods: string[]
}

export interface IFormQuestion {
  title: string
  subtitle: string
  optional?: boolean
}

export interface IFormSetting {
  questions: IFormQuestion[]
  lastEdit: number
}

export interface IOrderSetting {
  contactMessage: string,
  contactLink: string
}

export interface IProfile {
  account: string
  image: string
  name: string
  type: string
  phone: string
  email: string
  address: string
  googleMap: string
  about: string
  notices: string[]
  seatSetting: ISeatSetting
  timeSetting: {
    basic: ITimeSetting[]
    additional?: IAdditionalTimeSetting[]
  },
  orders?: { [key: string]: IOrder }
  externalLinks: {
    instagram: string
    facebook: string
    tiktok: string
    youtube: string
    line: string
    website: string
  },
  formSetting: IFormSetting,
  orderSetting: IOrderSetting
}
