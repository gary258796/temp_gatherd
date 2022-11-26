export const WEEK_DAYS = {
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
  SUN: 7,
};

export const PERIODS = {
  BREAKFAST: "09:00-11:00",
  LUNCH: "12:00-15:00",
  DINNER: "17:00-20:00",
};

export const PAYMENT_MOTHODS = {
  CASH: 1,
  BANK: 2,
  LINEPAY: 3,
  JKO: 4,
};

export const VENDORS_DATA = [
  {
    id: 0,
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu15dNlYf2GGIJnYX6b2-JAYhfCTt7bYoCHg&usqp=CAU",
    name: "黃冠中",
    birthday: "1995/11/30",
    address: "台北市大安區辛亥路二段43號18樓之一",
    addressUrl: "https://goo.gl/maps/UHc6skAjuxoRFWsX7",
    location: "大安區",
    description:
      "熱愛與不同在地文化的人交流，藉由佳餚與美食的結合來觸及彼此在舒適圈以外的探險",
    phone: "0926136136",
    email: "jo841130s@gmail.com",
    paymentMethods: [
      PAYMENT_MOTHODS.CASH,
      PAYMENT_MOTHODS.LINEPAY,
      PAYMENT_MOTHODS.JKO,
      PAYMENT_MOTHODS.BANK,
    ],
    avaliableTimes: [
      { day: WEEK_DAYS.MON, period: PERIODS.BREAKFAST, amount: 4 },
      { day: WEEK_DAYS.TUE, period: PERIODS.LUNCH, amount: 7 },
      { day: WEEK_DAYS.TUE, period: PERIODS.DINNER, amount: 2 },
      { day: WEEK_DAYS.SAT, period: PERIODS.LUNCH, amount: 4 },
      { day: WEEK_DAYS.SUN, period: PERIODS.DINNER, amount: 5 },
    ],
    notAvaliableDates: ["2022/10/25 12:00-15:00"],
  },
];
