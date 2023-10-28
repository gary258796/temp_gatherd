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
  form?: { [key: string]: string }
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

export interface IFormSetting {
  title: string
  subtitle: string
  optional?: boolean
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
  formSetting: IFormSetting[]
}
