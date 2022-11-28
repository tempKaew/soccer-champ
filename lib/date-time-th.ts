export const convertDateTimeTh = (
  dateTime:Date
) => {

  const current = new Date(dateTime).toLocaleString('en-US', { timeZone: "Asia/Bangkok" });
  const currentThai = new Date(current)
  const currentMonth = currentThai.getMonth() + 1;

  return currentThai.getFullYear() + '-' + currentMonth + '-' + currentThai.getDate() + ' ' + currentThai.getHours + ':' + currentThai.getMinutes

}