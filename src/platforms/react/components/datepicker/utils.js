import dayjs from "dayjs";

export function getDateValue(val) {
    if (!val) {
      return "";
    }
    return dayjs(val);
  }
  
  export function getRangeDataValue(val) {
    if (!val) {
      return [];
    }
    if(typeof val == 'string' || typeof val == 'number') {
      return [dayjs(val), dayjs(val)];
    }
    if(Array.isArray(val)) {
      return val.map((v) => getDateValue(v));
    }
    return []
  }