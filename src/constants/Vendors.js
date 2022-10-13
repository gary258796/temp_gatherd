export const PAYMENT_MOTHODS = {
  CASH: "現金",
  LINEPAY: "LinePay",
  JKO: "街口支付",
  BANK: "轉帳",
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
  },
];
