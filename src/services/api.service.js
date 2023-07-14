import http from '../common/http-common';
import axios from 'axios';

class apiService {
  verifiedUser = '';
  signup(data) {
    return http.post('/signUp', data);
  }
  signupFindByUserId(userId) {
    return http.get(`/signUp/getByUserId/${userId}`);
  }
  signupFindSubUserList(userId) {
    return http.get(`/signUp/signupFindSubUserList/${userId}`);
  }
  saveUser(data) {
    return http.post('/saveUser', data);
  }
  login(emailId, password) {
    return http.get(`/login/${emailId}/${password}`);
  }
  getImage() {
    return http.get('/getImage');
  }
  resetPasswordByCode(data) {
    return http.post('/resetPasswordByCode', data);
  }
  resetPassword(data) {
    return http.post('/resetPassword', data);
  }
  saveVendordetail(data) {
    return http.post('/saveVdetail', data);
  }
  saveNewRegVendordetail(data){
    return http.post('/saveNewRegVendordetail', data);
  }
  SaveVendorCommunication(data) {
    return http.post('/SaveVendorCommunication', data);
  }
  getCountry() {
    return http.get('/getCountry');
  }
  getStateAndcityByzipcode(code, Post_Code) {
    return http.get(`/getStateAndcityByzipcode/${code}/${Post_Code}`);
  }
  saveStatutoryDetail(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}:12707/saveStatutoryDetail`, data);
  }
  saveComplianceDetail(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}:12707/saveComplianceDetail`, data);
  }
  savebankdetail(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}:12707/saveBankDetail`, data);
  }
  saveFinacialDetail(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}:12707/saveFinacialDetail`, data);
  }
  createRelatedDisclosurePdf(data) {
    return axios.post(
      `${process.env.REACT_APP_API_URL}:12707/createRelatedDisclosurePdf`,
      data
    );
  }
  createCocPdf(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}:12707/createCompliancePdf`, data);
  }
  createNDAPdf(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}:12707/createnonDisclosure`, data);
  }
  downloadPdf(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}:12707/downloadPdf`, data);
  }
  readPdf() {
    return http.get('/readPdf');
  }
  saveContactTeam(data) {
    return http.post('/saveContactTeam', data);
  }
  send2FactorOTP(data){
    return http.post(`/twoFactorOTP`, data);
  }
  OTP2FactorVerification(data){
    return http.post(`/twoFactorOTPVerification`, data);
  }
  getAllCollection(userId) {
    return http.get(`/getAllCollection/${userId}`);
  }
  getvendorDetail(userId) {
    return http.get(`/getvendorDetail/${userId}`);
  }
  getFinancialDate() {
    return http.get('/getfinacialYear');
  }
  updateVendordetail(userId, data) {
    return http.put(`/updateVdetail/${userId}`, data);
  }
  updateErpResourcePortalVendorlist(Entry_No, data) {
    return http.put(`/updateErpResourcePortalVendorlist/${Entry_No}`, data);
  }
  getAllUserDetail() {
    return http.get('/getAllUserDetail');
  }
  updateAllCollection(userId, data) {
    return axios.put(
      `${process.env.REACT_APP_API_URL}:12707/updateAllCollection/${userId}`,
      data
    );
  }
  saveApproval(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}:12707/saveApproval`, data);
  }
  updateApprovalStatus(userId, data) {
    return axios.put(
      `${process.env.REACT_APP_API_URL}:12707/updateApprovalStatus/${userId}`,
      data
    );
  }
  getApprovedStatus() {
    return axios.get(`${process.env.REACT_APP_API_URL}:12707/getApprovedStatus`);
  }
  getRejectStatus() {
    return axios.get(`${process.env.REACT_APP_API_URL}:12707/getRejectStatus`);
  }
  getApprovalList() {
    return axios.get(`${process.env.REACT_APP_API_URL}:12707/getApprovalList`);
  }
  updateCommunicationdetail(userId, data) {
    return http.put(`/updateCommunication/${userId}`, data);
  }
  updateStatutoryDetail(userId, data) {
    return axios.put(
      `${process.env.REACT_APP_API_URL}:12707/updateStatutoryDetail/${userId}`,
      data
    );
  }
  updateComplianceDetail(userId, data) {
    return axios.put(
      `${process.env.REACT_APP_API_URL}:12707/updateComplianceDetail/${userId}`,
      data
    );
  }
  updateBankDetail(userId, data) {
    return axios.put(`${process.env.REACT_APP_API_URL}:12707/updateBankDetail/${userId}`, data);
  }
  updateFinacialDetail(userId, data) {
    return axios.put(
      `${process.env.REACT_APP_API_URL}:12707/updateFinacialDetail/${userId}`,
      data
    );
  }
  updateContactTeam(userId, data) {
    return http.put(`/updateContactTeam/${userId}`, data);
  }
  saveMasterVendor(data) {
    return http.post('/saveMasterVendorSubUser', data);
  }
  getMasterVendorSubUserById(data) {
    return http.post('/getMasterVendorSubUserById', data);
  }

  UpdateMasterSubUserById(data) {
    return http.put('/UpdateMasterSubUserById', data);
  }



  deleteMasterVendorSubUserById(id) {
    return http.delete(`/deleteMasterVendorSubUserById/${id}`);
  }
  getAllMasterVendorSubUser() {
    return http.get('/getAllMasterVendorSubUser');
  }

  getAllVendorSubUser() {
    return http.get('/getAllVendorSubUser');
  }

  saveMasterVendorUserAccess(data) {
    return http.post('/saveMasterVendorUserAccess', data);
  }
  getMasterVendorUserAccessById(data) {
    return http.post('/getMasterVendorUserAccessById', data);
  }
  UpdateMasterVendorUserAccessById(data) {
    return http.put('/UpdateMasterVendorUserAccessById', data);
  }
  deleteMasterVendorUserAccessById(id) {
    return http.delete(`/deleteMasterVendorUserAccessById/${id}`);
  }
  getAllMasterVendorUserAccess() {
    return http.get('/getAllMasterVendorUserAccess');
  }
  savePeriodicReq(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}:12707/savePeriodicReq`, data);
  }
  getPeriodicReq() {
    return axios.get(`${process.env.REACT_APP_API_URL}:12707/getPeriodicReq`);
  }
  deletePeriodicReq(id) {
    return axios.delete(`${process.env.REACT_APP_API_URL}:12707/deletePeriodicReq/${id}`);
  }
  updatePeriodicReq(userId, data) {
    return axios.put(
      `${process.env.REACT_APP_API_URL}:12707/updatePeriodicReq/${userId}`,
      data
    );
  }
  saveVendorApproval(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}:12707/accountStatementApproval`, data);
  }
  updatevendorApprovalStatus(userId, data) {
    return axios.put(
      `${process.env.REACT_APP_API_URL}:12707/accountStatementApproval/update/${userId}`,
      data
    );
  }
  vendorApprovalList() {
    return axios.get(`${process.env.REACT_APP_API_URL}:12707/accountStatementApproval/findAll`);
  }
  downloadVendorApprovalList(vendorCode) {
    return axios.get(
      `${process.env.REACT_APP_API_URL}:12707/accountStatementApproval/exportExcel/${vendorCode}`,
      { responseType: 'blob' }
    );
  }
  VendorregList() {
    return axios.get(`${process.env.REACT_APP_API_URL}:12707/vendorCodeDetail/findAll`);
  }
  vendorIdList(vendorId) {
    return axios.get(`${process.env.REACT_APP_API_URL}:12707/vendorIdList/${vendorId}`);
  }
  AllRejectVendorList() {
    return axios.get(`${process.env.REACT_APP_API_URL}:12707/AllRejectVendorList`);
  }
  //ERP
  getErpVendor_API() {
    return http.get("/getErpVendor_API");
  }
  getErpVendor_APIById(No) {
    return http.get(`/getErpVendor_APIById/${No}`);
  }
  postErpResourcePortalVendorlist(data) {
    return http.post('/postErpResourcePortalVendorlist', data);
  }
  getErpResourcePortalVendorlist() {
    return http.get("/getErpResourcePortalVendorlist");
  }
  getErpResourcePortalVendorlistById(Vendor_No) {
    return http.get(`/getErpResourcePortalVendorlistById/${Vendor_No}`);
  }
  getErpVendor_APIByParent_Vendor_Code(Parent_Vendor_Code) {
    return http.get(`/getErpVendor_APIByParent_Vendor_Code/${Parent_Vendor_Code}`);
  }
  getErpVendor_APIByP_A_N_No(P_A_N_No) {
    return http.get(`/getErpVendor_APIByP_A_N_No/${P_A_N_No}`);
  }
  getErpVendor_APIByVendorId(ticketId) {
    return http.get(`/getErpVendor_APIByVendorId/${ticketId}`);
  }
  updateTicketIdbyUserId(userId) {
    return http.put(`/updateTicketIdbyUserId/${userId}`);
  }
  getVendorLedgerEntries() {
    return http.get('/getVendorLedgerEntries');
  }

  downloadCurrentAccountStatement() {
    return axios.get(
      `${process.env.REACT_APP_API_URL}:12707/downloadCurrentAccountStatement/exportExcel`,
      { responseType: 'blob' }
    );
  }

  downloadAccStatementConfirmation() {
    return axios.get(
      `${process.env.REACT_APP_API_URL}:12707/downloadAccStatementConfirmation/exportExcel`,
      { responseType: 'blob' }
    );
  }

  approveAccStatementDetail(value) {
    return axios.post(`${process.env.REACT_APP_API_URL}:12707/approveAccStatementDetail`, value);
  }

  rejectAccStatementDetail(data, No) {
    return axios.post(`${process.env.REACT_APP_API_URL}:12707/rejectAccStatementDetail/${No}`, data);
  }
  saveMasterLogin(data) {
    return http.post('/saveMasterLogin', data);
  }

  getErpPurchaseOrder_API() {
    return axios.get(`${process.env.REACT_APP_API_URL}:12707/getErpPurchaseOrder_API`);
  }

  getErpPurchaseOrderLineEDD_API() {
    return http.get(`${process.env.REACT_APP_API_URL}:12707/getErpPurchaseOrderLineEDD_API`);
  }
  getPOfileDownload(){
    return http.get(`${process.env.REACT_APP_API_URL}:12707/getPOfileDownload`, { responseType: 'blob' });
  }
  getErpPurchaseOrdersLists()
  {
    return http.get('/getErpPurchaseOrdersLists');
  }
  getPo()
{
  return http.get('/getPo');
}
updatePo(data) {
  return axios.put(`${process.env.REACT_APP_API_URL}:12707/updatePo`, data);
}
savePO(data)
{
  return axios.post(`${process.env.REACT_APP_API_URL}:12707/savePo`, data);
}
getMailIdbyvendorNo(No)
{
  return http.get(`/getMailIdbyvendorNo/${No}`);
}
updatePoInvoice(data)
{
  return axios.put(`${process.env.REACT_APP_API_URL}:12707/updatePoInvoice`, data);
}
mailApprovePo_Invoice(data)
{
  return axios.post(`${process.env.REACT_APP_API_URL}:12707/POInvoiceMailApprove`, data);
}
mailApproveFinance_order(data)
{
  return axios.post(`${process.env.REACT_APP_API_URL}:12707/mailApprovePo_Invoice`, data);
}
updateFinanceInvoiceApproval(data)
{
  return http.put(`/updateFinanceInvoiceApproval`,data);
}
updateFinanceInvoiceReject(data)
{
  return axios.put(`${process.env.REACT_APP_API_URL}:12707/updateFinanceInvoiceReject`, data);
}

saveInvoiceInfo(data) {
  return axios.post(`${process.env.REACT_APP_API_URL}:12707/saveInvoiceInfo`, data);
}

uploadDocbyVendorCode(data){
  console.log("data-------->", data);
  return axios.post(`${process.env.REACT_APP_API_URL}:12707/uploadDocbyVendorCode`, data);
}

getOutOfIndiaVcode(ticketId) {
  return http.get(`/getOutOfIndiaVcode/${ticketId}`,);
}

getInvoiceinfo() {
  return http.get('/getInvoiceinfo');
}

UpdateMasterVendorSubUserById(data) {
  return http.put('/UpdateMasterVendorSubUserById', data);
}

getuserIdByVcode(vCode) {
  return http.get(`/getuserIdByVcode/${vCode}`);
}

postEddDetails(data) {
  console.log("data------>", data);
  return http.post('/postEddDetails', data);
}
getMasterVendorById(userId) {
  return http.post('/getMasterVendorById',userId);
}
createsharepointFolderByTicketId(data)
{
  return http.post("/createsharepointFolderByTicketId",data);
}

getSubuserId(subUserId) {
  return http.get(`/getSubuserId/${subUserId}`);
}

getDocuments() {
  return http.get('/getDocuments');
}
  UpdateUserStatusByUserId(userId) {
    return http.put(`/updateVdetail/userStatus/${userId}`);
  }
  updateMasterLogin(data) {
    return http.put(`/updateMasterLogin`, data);
  }
}
export default new apiService();
