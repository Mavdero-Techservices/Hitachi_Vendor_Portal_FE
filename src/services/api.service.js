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
    return axios.post("http://localhost:12707/saveBankDetail", data);
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
  getAllCollection(userId) {
    return http.get(`/getAllCollection/${userId}`);
  }
  getvendorDetail(userId) {
    return http.get(`/getvendorDetail/${userId}`);
  }
  getFinancialDate() {
    return http.get("/getfinacialYear");
  }
  updateVendordetail(userId, data) {
    return http.put(`/updateVdetail/${userId}`, data);
  }
  getAllUserDetail() {
    return http.get("/getAllUserDetail");
  }
  updateAllCollection(userId,data) {
    return axios.put(`http://localhost:12707/updateAllCollection/${userId}`, data);
  }
  saveApproval(data) {
    return axios.post("http://localhost:12707/saveApproval", data);
  }
  updateApprovalStatus(userId,data) {
    return axios.put(`http://localhost:12707/updateApprovalStatus/${userId}`, data);
  }
  getApprovedStatus() {
    return axios.get("http://localhost:12707/getApprovedStatus");
  }
  getRejectStatus() {
    return axios.get("http://localhost:12707/getRejectStatus");
  }
  getApprovalList() {
    return axios.get("http://localhost:12707/getApprovalList"); 
}
updateCommunicationdetail(userId, data) {
  return http.put(`/updateCommunication/${userId}`, data);
}
updateStatutoryDetail(userId, data) {
  return axios.put(`http://localhost:12707/updateStatutoryDetail/${userId}`, data);
}
updateComplianceDetail(userId, data) {
  return axios.put(`http://localhost:12707/updateComplianceDetail/${userId}`, data);
}
updateBankDetail(userId, data) {
  return axios.put(`http://localhost:12707/updateBankDetail/${userId}`, data);
}
updateFinacialDetail(userId, data) {
  return axios.put(`http://localhost:12707/updateFinacialDetail/${userId}`, data);
}
updateContactTeam(userId, data) {
  return http.put(`/updateContactTeam/${userId}`, data);
}

saveMasterVendor(data) {
  return http.post("/saveMasterVendorSubUser", data);
}
getMasterVendorSubUserById(data) {
  return http.post("/getMasterVendorSubUserById", data);
}
UpdateMasterVendorSubUserById(data) {
  return http.post("/UpdateMasterVendorSubUserById", data);
}

getAllMasterVendorSubUser() {
  return http.get("/getAllMasterVendorSubUser");
}
}
export default new apiService();
