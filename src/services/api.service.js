import http from "../common/http-common";

class apiService {
  role = '';
  signup(data) {
    return http.post("/signUp", data);
  }
  login(emailId, password) {
    return http.get(`/login/${emailId}/${password}`);
  }
  getImage() {
    return http.get("/getImage");
  }
  resetPasswordByCode(data)
  {
    return http.post("/resetPasswordByCode",data);
  }
  resetPassword(data)
  {
    return http.post("/resetPassword",data);
  }
  //saveVendordetail
  saveVendordetail(data)
  {
    return http.post("/saveVdetail",data);
  }
  //SaveVendorCommunication
  SaveVendorCommunication(data)
  {
    return http.post("/SaveVendorCommunication",data);
  }
}
export default new apiService();
