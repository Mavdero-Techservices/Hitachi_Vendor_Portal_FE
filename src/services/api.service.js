import http from "../common/http-common";
import axios from 'axios';

class apiService {
  verifiedUser = '';
  signup(data) {
    return http.post("/signUp", data);
  }
  saveUser(data) {
    return http.post("/saveUser", data);
  }
  login(emailId, password) {
    return http.get(`/login/${emailId}/${password}`);
  }
  getImage() {
    return http.get("/getImage");
  }
  resetPasswordByCode(data) {
    return http.post("/resetPasswordByCode", data);
  }
  resetPassword(data) {
    return http.post("/resetPassword", data);
  }
  saveVendordetail(data) {
    return http.post("/saveVdetail", data);
  }
  SaveVendorCommunication(data) {
    return http.post("/SaveVendorCommunication", data);
  }
  getCountry() {
    return http.get("/getCountry");
  }
  getStateAndcityByzipcode(code, pinCode) {
    return http.get(`/getStateAndcityByzipcode/${code}/${pinCode}`);
  }
  saveStatutoryDetail(data) {
    return axios.post("http://localhost:12707/saveStatutoryDetail", data);

  }
  saveComplianceDetail(data) {
    return axios.post("http://localhost:12707/saveComplianceDetail", data);
  }
  savebankdetail(data) {
    return http.post("/saveBankdetail", data);
  }
  saveFinacialDetail(data) {
    return axios.post("http://localhost:12707/saveFinacialDetail", data);
  }
  downloadPdf()
  {
    return http.post("/downloadPdf"); 
  }
  saveContactTeam(data) {
    return http.post("/saveContactTeam", data);
  }
}
export default new apiService();
