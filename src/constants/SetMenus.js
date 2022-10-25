export const SET_MENU_TYPES = {
  SET: 0,
  TABLE: 1,
  SIMPLE: 2,
};

export const DISH_TYPES = {
  APPETIZER: 0,
  MAIN_DISH: 1,
  SIDE_DISH: 2,
  DESSERT: 3,
  NONE: 4,
};

export const SET_MENUS = [
  {
    id: 0,
    vendorId: 0,
    type: SET_MENU_TYPES.SET,
    name: "超酷套餐",
    images: [
      "https://media-cdn.tripadvisor.com/media/photo-s/15/03/79/e3/otto-s-anatolian-food.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkihpLZeqPMQSbCSmeZnkhwDseIXdrvtkk3g&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1z0d_Jke01v4ErGgNeyx8ROBp-v0TW3ZxBg&usqp=CAU",
    ],
    description:
      "是一個簡單又熱情的套餐，開始自己做的時候是在美國，不知不覺周圍的環境影響我在料理的方式。很樂意一同享用這份套餐與他家分享在美國的時光。",
    allergy: "堅果類",
    memo: "備註",
    price: 100,
    lastOrderDays: 3,
    amount: 4,
    dishes: [
      { type: DISH_TYPES.APPETIZER, name: "沙拉", memo: "" },
      { type: DISH_TYPES.MAIN_DISH, name: "牛排", memo: "8分熟" },
      { type: DISH_TYPES.SIDE_DISH, name: "馬鈴薯泥", memo: "" },
      { type: DISH_TYPES.SIDE_DISH, name: "花椰菜", memo: "" },
      { type: DISH_TYPES.DESSERT, name: "冰淇淋", memo: "牛奶口味" },
    ],
  },
];
