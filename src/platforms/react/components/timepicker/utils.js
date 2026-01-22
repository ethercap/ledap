import dayjs from "dayjs";

export function getTimeValue(val,format) {
  if (!val) {
    return "";
  }
  return dayjs(val,format);
}

export function getRangeTimeValue(val, format) {
  if (!val) {
    return [];
  }
  if (typeof val == 'string' || typeof val == 'number') {
    return [getTimeValue(val,format), dayjs(val,format)];
  }
  if (Array.isArray(val)) {
    return val.map((v) => getTimeValue(v,format));
  }
  return []
}