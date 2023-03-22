import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { MDBRow } from "mdb-react-ui-kit";
import apiService from "../services/api.service";
import React from "react";
import Swal from "sweetalert2";
import "../css/ApprovalFields.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
export default function InvoicePortalTable(props) {
  const handleApprove = (event) => {
    Swal.fire({
      heightAuto: true,

      html: `<div style="margin-left:1rem;margin:2rem;height:10rem;width:40rem;flex:0 0 150px;">
      <div class="approvestyle">
      <form>
      <label style="margin-left:0.5rem;" >Email:</label>
      <select  class="select" style="max-width:70%;margin-left:50" id="email" required>
      <option value="" hidden>Select EmailId</option>
        <option value="hitachi">hitachi@gmail.com</option>
        <option value="hitachy">hitachi@yahoo.com</option>
      </select><br>
      <label >User Name:</label>
      <select  class="select" style="max-width:70%;margin-top:1rem;margin-left:15"  id="username" >
      <option value="" hidden>Select User Name</option>
        <option value="Hello" >Hello</option>
        <option value="Hello1">Hello1</option>
      </select><br>
      <label >Location:</label>
      <select  class="select" style="max-width:70%;margin-top:1rem;margin-left:45"  id="location" >
      <option value="" hidden>Select Location</option>
        <option value="chennai" >Chennai</option>
        <option value="trichy" >trichy</option>
      </select>
      </form>
    </div>
    </div> `,
      confirmButtonText: "Approve",
      confirmButtonColor: "#B1000E",
      showCancelButton: true,
      focusConfirm: false,
      customClass: "swal-wide",
      preConfirm: () => {
        const email = Swal.getPopup().querySelector("#email").value;
        const username = Swal.getPopup().querySelector("#username").value;
        const location = Swal.getPopup().querySelector("#location").value;
        if (!email && !username && !location) {
          Swal.showValidationMessage(
            `Please choose EmailId,User Name and Location`
          );
        } else if (!location && !username) {
          Swal.showValidationMessage(`Please choose  User Name and Location.`);
        } else if (!location && !email) {
          Swal.showValidationMessage(`Please choose  EmailId and Location.`);
        } else if (!username && !email) {
          Swal.showValidationMessage(`Please choose  EmailId and User Name.`);
        } else if (!email) {
          Swal.showValidationMessage(`Please choose EmailId.`);
        } else if (!username) {
          Swal.showValidationMessage(`Please choose User Name.`);
        } else if (!location) {
          Swal.showValidationMessage(`Please choose Location.`);
        } else {
          Swal.fire("Approved Successfully!", "", "success");
        }
      },
    });
  };
  const handleReject = (event) => {
    Swal.fire({
      heightAuto: true,
      // title: 'Review vendor details',
      html: `<div class="rejectstyle">
      <textarea rows="50" cols="30" id="comment" class="swal01-input" placeholder="Comments "></textarea>
      <input type="file" id="rejectdoc" class="swal01-input" placeholder="Select file">
 </div> `,
      confirmButtonText: "Reject",
      confirmButtonColor: "#B1000E",
      showCancelButton: true,
      focusConfirm: false,
      customClass: "swal-wide",
      preConfirm: () => {
        const comment = Swal.getPopup().querySelector("#comment").value;
        const rejectdoc = Swal.getPopup().querySelector("#rejectdoc").files[0];
        if (!comment && !rejectdoc) {
          Swal.showValidationMessage(`Please enter comments and Upload file`);
        } else if (!comment) {
          Swal.showValidationMessage(`Please give Comments`);
        } else if (!rejectdoc) {
          Swal.showValidationMessage(`Please Upload File`);
        } else {
          Swal.fire("Rejected Successfully!", "", "success");
        }
      },
    });
  };
  const columns = [
    { field: "id", headerName: "PO Number", width: 90 },
    {
      field: "poDate",
      headerName: "DocDate",
      width: 110,
      editable: true,
    },
    {
      field: "EnterInvoiceno",
      headerName: "Vendor Invoice No ",
      width: 210,
      editable: true,
    },
    {
      field: "srno",
      headerName: "Sr No of Po",
      type: "string",
      width: 110,
      editable: true,
    },
    {
      field: "glcode",
      headerName: "Item/GL Code",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "startdate",
      headerName: "Start Date",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "enddate",
      headerName: "End Date",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "qty",
      headerName: "Qty",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "rate",
      headerName: "Rate",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "baseamt",
      headerName: "Base amt",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "taxamt",
      headerName: "Tax amt",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "grossamt",
      headerName: "Gross amt",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "invoiceupload",
      headerName: "Invoice Upload",
      // type: 'number',
      width: 110,
      // editable: true,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            component="label"
            size="small"
            sx={{
              "&:hover": { backgroundColor: "#4f4f4f" },
              textTransform: "capitalize",
              backgroundColor: "#4f4f4f",
            }}
            color="primary"
            style={{ marginLeft: 16 }}
          >
            Upload
          </Button>
        </>
      ),
    },
    {
      field: "doc1upload",
      headerName: "Doc 1 Upload",
      type: "number",
      width: 110,
      // editable: true,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            component="label"
            size="small"
            sx={{
              "&:hover": { backgroundColor: "#4f4f4f" },
              textTransform: "capitalize",
              backgroundColor: "#4f4f4f",
            }}
            color="primary"
            style={{ marginLeft: 16 }}
          >
            Upload
          </Button>
        </>
      ),
    },
    {
      field: "doc2upload",
      headerName: "Doc 2 Upload",
      type: "number",
      width: 110,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            component="label"
            size="small"
            sx={{
              "&:hover": { backgroundColor: "#4f4f4f" },
              textTransform: "capitalize",
              backgroundColor: "#4f4f4f",
            }}
            color="primary"
            style={{ marginLeft: 16 }}
          >
            Upload
          </Button>
        </>
      ),
    },
    {
      field: "doc3upload",
      headerName: "Doc 3 Upload",
      type: "number",
      width: 110,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            component="label"
            size="small"
            sx={{
              "&:hover": { backgroundColor: "#4f4f4f" },
              textTransform: "capitalize",
              backgroundColor: "#4f4f4f",
            }}
            color="primary"
            style={{ marginLeft: 16 }}
          >
            Upload
          </Button>
        </>
      ),
    },
    {
      field: "doc4upload",
      headerName: "Doc 4 Upload",
      type: "number",
      width: 110,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            component="label"
            size="small"
            sx={{
              "&:hover": { backgroundColor: "#4f4f4f" },
              textTransform: "capitalize",
              backgroundColor: "#4f4f4f",
            }}
            color="primary"
            style={{ marginLeft: 16 }}
          >
            Upload
          </Button>
        </>
      ),
    },
    {
      field: "doc5upload",
      headerName: "Doc 5 Upload",
      type: "number",
      width: 110,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            component="label"
            size="small"
            sx={{
              "&:hover": { backgroundColor: "#4f4f4f" },
              textTransform: "capitalize",
              backgroundColor: "#4f4f4f",
            }}
            color="primary"
            style={{ marginLeft: 16 }}
          >
            Upload
          </Button>
        </>
      ),
    },
  ];
  const rows = [
    {
      id: "1",
      poDate: "12/12/2023",
      EnterInvoiceno: "Invoice no",

      srno: "24",
      glcode: "223344",
      startdate: "12/01/2023",
      enddate: "12/12/2023",
      qty: "20000",
      rate: "15000",
      baseamt: "5000",
      taxamt: "efgt45",
      grossamt: "67895",
      status: "In review",
    },
    {
      id: "2",
      poDate: "12/12/2023",
      EnterInvoiceno: "Invoice no",

      srno: "24",
      glcode: "223344",
      startdate: "12/01/2023",
      enddate: "12/12/2023",
      qty: "20000",
      rate: "15000",
      baseamt: "5000",
      taxamt: "efgt45",
      grossamt: "67895",
      status: "In review",
    },
  ];

  return (
    <Box>
      <div style={{ height: 350, width: "100%" }}>
        <DataGrid
          sx={{
            boxShadow: 10,
            borderRadius: 0,
            fontSize: "14px",
          }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
    </Box>
  );
}
