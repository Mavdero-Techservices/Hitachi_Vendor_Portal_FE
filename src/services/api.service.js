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
    return http.post("/saveBankDetail", data);
  }
  saveFinacialDetail(data) {
    return axios.post("http://localhost:12707/saveFinacialDetail", data);
  }
  createRelatedDisclosurePdf(data) {
    return axios.post("http://localhost:12707/createRelatedDisclosurePdf", data);
  }
  createCocPdf(data) {
    return axios.post("http://localhost:12707/createCompliancePdf", data);
  }
  createNDAPdf(data) {
    return axios.post("http://localhost:12707/createnonDisclosure", data);
  }
  downloadPdf(data) {
    return axios.post("http://localhost:12707/downloadPdf", data);

  }
  readPdf() {
    return http.get("/readPdf");
  }
  saveContactTeam(data) {
    return http.post("/saveContactTeam", data);
  }
}
export default new apiService();
