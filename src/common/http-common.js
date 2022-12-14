import axios from "axios";
export default axios.create({
  baseURL: window.location.protocol + '//' + window.location.hostname+ ':' + 12707,
  headers: {
    "Content-type": "application/json"
  }
});