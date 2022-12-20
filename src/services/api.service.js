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
}
export default new apiService();
