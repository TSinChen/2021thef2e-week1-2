import axios from "axios";
import jsSHA from "jssha";

const getAuthorizationHeader = () => {
  const sha = new jsSHA("SHA-1", "TEXT");
  const gmtString = new Date().toUTCString();
  sha.setHMACKey(`${process.env.REACT_APP_API_KEY}`, "TEXT");
  sha.update(`x-date: ${gmtString}`);
  const HMAC = sha.getHMAC("B64");
  return `hmac username="${process.env.REACT_APP_API_ID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
};

const authorizationString = getAuthorizationHeader();
axios.defaults.baseURL = "https://ptx.transportdata.tw/MOTC";
axios.defaults.headers.common.Authorization = authorizationString;
axios.defaults.headers.common["X-Date"] = new Date().toUTCString();

export default axios;
