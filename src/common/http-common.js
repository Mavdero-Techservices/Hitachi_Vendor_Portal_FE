import axios from "axios";
export default axios.create({
  baseURL: window.location.protocol + '//' + window.location.hostname,
  headers: {
    "Content-type": "application/json"
  }
});