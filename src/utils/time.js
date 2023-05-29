import moment from "moment";

export const handleDisplayTimes = (times) => {
  const today = new Date();
  today.setDate(today.getDate() + 3);
  return times.filter((time) => moment(time.id).toDate() > today);
};
