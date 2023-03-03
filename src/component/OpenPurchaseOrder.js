import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
// import { MDBRow } from 'mdb-react-ui-kit';
// import apiService from '../services/api.service';
import React from 'react';
// import Swal from 'sweetalert2';
import '../css/ApprovalFields.css';
export default function OpenPurchaseOrder(props) {
  //   const handleApprove = (event) => {
  //     Swal.fire({
  //       heightAuto: true,

  //       html: `<div style="margin-left:1rem;margin:2rem;height:10rem;width:40rem;flex:0 0 150px;">
  //       <div class="approvestyle">
  //       <form>
  //       <label  >Email:</label>
  //       <select  class="select" style="max-width:70%;" id="email">
  //       <option value=" "></option>
  //         <option value="hitachi">hitachi@gmail.com</option>
  //         <option value="hitachy">hitachi@yahoo.com</option>
  //       </select><br>
  //       <label >User Name:</label>
  //       <select  class="select" style="max-width:70%;margin-top:1rem;"  id="username" >
  //       <option value=" "></option>
  //         <option value="Hello" >Hello</option>
  //         <option value="Hello1">Hello1</option>
  //       </select><br>
  //       <label>Location:</label>
  //       <select  class="select" style="max-width:70%;margin-top:1rem"  id="location" >
  //       <option value=" "></option>
  //         <option value="chennai" >Chennai</option>
  //         <option value="trichy" >trichy</option>
  //       </select>
  //       </form>
  //     </div>
  //     </div> `,
  //       confirmButtonText: 'Approve',
  //       confirmButtonColor: '#B1000E',
  //       showCancelButton: true,
  //       focusConfirm: false,
  //       customClass: 'swal-wide',
  //       preConfirm: () => {
  //         const email = Swal.getPopup().querySelector('#email').value;
  //         const username = Swal.getPopup().querySelector('#username').value;
  //         const location = Swal.getPopup().querySelector('#location').value;
  //         if (!email && !username && !location) {
  //           Swal.showValidationMessage(
  //             `Please choose EmailId,User Name and Location`
  //           );
  //         }
  //         // else {
  //         //   Swal.showValidationMessage(`data Saved`);
  //         // }
  //         // if (!email) {
  //         //   Swal.showValidationMessage(`Please choose EmailId.`);
  //         // } else if (!username) {
  //         //   Swal.showValidationMessage(`Please choose User Name.`);
  //         // } else if (!location) {
  //         //   Swal.showValidationMessage(`Please choose Location.`);
  //         // }
  //       },
  //     });
  //   };
  //   const handleReject = (event) => {
  //     Swal.fire({
  //       heightAuto: true,
  //       // title: 'Review vendor details',
  //       html: `<div class="rejectstyle">
  //       <textarea rows="50" cols="30" id="comment" class="swal01-input" placeholder="Comments "></textarea>
  //       <input type="file" id="rejectdoc" class="swal01-input" placeholder="Select file">
  //  </div> `,
  //       confirmButtonText: 'Reject',
  //       confirmButtonColor: '#B1000E',
  //       showCancelButton: true,
  //       focusConfirm: false,
  //       customClass: 'swal-wide',
  //       preConfirm: () => {
  //         const comment = Swal.getPopup().querySelector('#comment').value;
  //         const rejectdoc = Swal.getPopup().querySelector('#rejectdoc').files[0];
  //         if (!comment && !rejectdoc) {
  //           Swal.showValidationMessage(`Please enter comments and Upload file`);
  //         } else if (!comment) {
  //           Swal.showValidationMessage(`Please give Comments`);
  //         } else if (!rejectdoc) {
  //           Swal.showValidationMessage(`Please Upload File`);
  //         } else {
  //           const data = new FormData();
  //           data.append('userId', event);
  //           data.append('level1Status', 'rejected');
  //           data.append('level1RejectComment', comment);
  //           data.append('level1rejectFileDoc', rejectdoc);

  //           apiService.saveApproval(data).then((response) => {
  //             if (response) {
  //               Swal.fire({
  //                 title: 'Data saved',
  //                 icon: 'success',
  //                 confirmButtonText: 'OK',
  //               });
  //             } else {
  //               Swal.fire({
  //                 title: 'Error While Fetching',
  //                 icon: 'error',
  //                 confirmButtonText: 'OK',
  //               });
  //             }
  //           });
  //         }
  //       },
  //     });
  //   };
  const columns = [
    { field: 'id', headerName: 'PO Number', width: 90 },
    {
      field: 'poDate',
      headerName: 'PO Date',
      width: 110,
      editable: true,
    },
    {
      field: 'paymentterms',
      headerName: 'Payment Terms',
      width: 110,
      editable: true,
    },
    {
      field: 'address',
      headerName: 'Vendor Address',
      type: 'string',
      width: 110,
      editable: true,
    },
    {
      field: 'custom',
      headerName: 'Customer Name',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'billto',
      headerName: 'Bill to',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'shipto',
      headerName: 'Ship to',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'totalpo',
      headerName: 'Total Po Amt',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'billedamt',
      headerName: 'Billed amt',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'unbilledamt',
      headerName: 'Unbilled amt',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'mfgcode',
      headerName: 'Manufacturing code',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'quoteno',
      headerName: 'Quote No',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'purspoc',
      headerName: 'Purchase spoc',
      type: 'number',
      width: 110,
      editable: true,
    },
  ];
  const rows = [
    {
      id: '22114455',
      paymentterms: 'Cheque',
      poDate: '12/12/2023',
      address: 'chennai',
      custom: 'ABC',
      billto: 'xyz',
      shipto: 'Mumbai',
      totalpo: '20000',
      billedamt: '15000',
      unbilledamt: '5000',
      mfgcode: 'efgt45',
      quoteno: '67895',
      purspoc: 'Don quixote',
    },
    {
      id: '22114455',
      paymentterms: 'Cheque',
      poDate: '12/12/2023',
      address: 'chennai',
      custom: 'ABC',
      billto: 'xyz',
      shipto: 'Mumbai',
      totalpo: '20000',
      billedamt: '15000',
      unbilledamt: '5000',
      mfgcode: 'efgt45',
      quoteno: '67895',
      purspoc: 'Don quixote',
    },
    {
      id: '22114455',
      paymentterms: 'Cheque',
      poDate: '12/12/2023',
      address: 'chennai',
      custom: 'ABC',
      billto: 'xyz',
      shipto: 'Mumbai',
      totalpo: '20000',
      billedamt: '15000',
      unbilledamt: '5000',
      mfgcode: 'efgt45',
      quoteno: '67895',
      purspoc: 'Don quixote',
    },
    {
      id: '22114455',
      paymentterms: 'Cheque',
      poDate: '12/12/2023',
      address: 'chennai',
      custom: 'ABC',
      billto: 'xyz',
      shipto: 'Mumbai',
      totalpo: '20000',
      billedamt: '15000',
      unbilledamt: '5000',
      mfgcode: 'efgt45',
      quoteno: '67895',
      purspoc: 'Don quixote',
    },
  ];

  return (
    <Box>
      <Typography sx={{ ml: 1, fontWeight: 'bold' }}>Purchase Order</Typography>
      <div style={{ height: 350, width: '100%' }}>
        <DataGrid
          sx={{
            boxShadow: 10,
            borderRadius: 0,
            fontSize: '14px',
          }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          //   checkboxSelection="none"
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>

      {/* <div className="d-flex justify-content-end" sx={{ ml: 10 }}>
        <MDBRow className="mb-4">
          <div className="float-end">
            <button
              type="button"
              onClick={(e) => handleReject(props.userid)}
              className="btn basicbtn btn-primary btn-md m-3"
            >
              Reject
            </button>
            <button
              type="button"
              // onClick={this.handleSubmit}
              className="btn basicbtn btn-primary btn-md m-3"
            >
              Save
            </button>
            <button
              type="button"
              className="btn basicbtn btn-primary btn-md m-3"
              onClick={(e) => handleApprove(props.userid)}
            >
              Approve
            </button>
          </div>
        </MDBRow>
      </div> */}
    </Box>
  );
}
