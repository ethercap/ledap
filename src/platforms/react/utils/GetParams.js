export default function GetParams() {
    const url = location.search;
    let params = new Object();
    if (url.indexOf("?") != -1) {
      let str = url.substr(1);
      let strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        params[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return params;
  }