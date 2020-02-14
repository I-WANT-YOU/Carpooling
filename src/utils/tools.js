// 毫秒转为2019/09/19
export const formatDateOne = (paramsDate) => {
  const time = new Date(paramsDate); // 毫秒转换为正常时间
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hours = time.getHours();
  let minute = time.getMinutes();
  if (year < 10) {
    year = `0${year}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${year}/${month}/${day}`;
};
