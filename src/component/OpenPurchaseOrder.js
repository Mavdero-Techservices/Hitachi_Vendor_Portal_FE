import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import React from "react";

import Button from "@mui/material/Button";
import "../css/ApprovalFields.css";

export default function OpenPurchaseOrder(props) {
  const columns = [
    { field: "id", headerName: "PO Number", width: 90 },
    {
      field: "poDate",
      headerName: "PO Date",
      width: 110,
      editable: true,
    },
    {
      field: "paymentterms",
      headerName: "Payment Terms",
      width: 110,
      editable: true,
    },
    {
      field: "address",
      headerName: "Vendor Address",
      type: "string",
      width: 110,
      editable: true,
    },
    {
      field: "custom",
      headerName: "Customer Name",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "billto",
      headerName: "Bill to",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "shipto",
      headerName: "Ship to",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "totalpo",
      headerName: "Total Po Amt",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "billedamt",
      headerName: "Billed amt",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "unbilledamt",
      headerName: "Unbilled amt",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "mfgcode",
      headerName: "Manufacturing code",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "quoteno",
      headerName: "Quote No",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "purspoc",
      headerName: "Purchase spoc",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "podownload",
      headerName: "PO Download",
      type: "number",
      width: 110,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            component="label"
            size="small"
            sx={{
              "&:hover": { backgroundColor: "#4F4F4F" },
              textTransform: "capitalize",
              backgroundColor: "#4F4F4F",
            }}
            color="primary"
            style={{ marginLeft: 16 }}
          >
            Download
          </Button>
        </>
      ),
    },
  ];
  const rows = [
    {
      id: "22114455",
      paymentterms: "Cheque",
      poDate: "12/12/2023",
      address: "chennai",
      custom: "ABC",
      billto: "xyz",
      shipto: "Mumbai",
      totalpo: "20000",
      billedamt: "15000",
      unbilledamt: "5000",
      mfgcode: "efgt45",
      quoteno: "67895",
      purspoc: "Don quixote",
    },
    {
      id: "22114455",
      paymentterms: "Cheque",
      poDate: "12/12/2023",
      address: "chennai",
      custom: "ABC",
      billto: "xyz",
      shipto: "Mumbai",
      totalpo: "20000",
      billedamt: "15000",
      unbilledamt: "5000",
      mfgcode: "efgt45",
      quoteno: "67895",
      purspoc: "Don quixote",
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
          headerName
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
