import moment from "moment";

export const handleDisplayTimes = (times) => {
  const today = new Date();
  return times.filter((time) => moment(time.id).toDate() > today);
};
