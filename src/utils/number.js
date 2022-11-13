export function accountingNum(num) {
  if (isNaN(num)) return "Invalid Number";
  return num.toString().replace(/\d(?=(\d{3})+$)/g, "$&,");
}
