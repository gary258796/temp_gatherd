export interface IOrder {
  date: string
  period: string
  customerCount: string
  name: string
  email: string
  phone: string
  status: number
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

export interface IProfile {
  id: number
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
  },
  orders: { [key: string]: IOrder }
  externalLinks: {
    instagram: string
    facebook: string
    tiktok: string
    youtube: string
    line: string
    website: string
  }
}
