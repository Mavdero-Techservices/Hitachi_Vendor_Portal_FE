import http from "../common/http-common";

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
  //saveVendordetail
  saveVendordetail(data) {
    return http.post("/saveVdetail", data);
  }
  //SaveVendorCommunication
  SaveVendorCommunication(data) {
    return http.post("/SaveVendorCommunication", data);
  }
  getCountry() {
    return http.get("/getCountry");
  }
  getStateAndcityByzipcode(code, pinCode) {
    return http.get(`/getStateAndcityByzipcode/${code}/${pinCode}`);
  }
}
export default new apiService();
