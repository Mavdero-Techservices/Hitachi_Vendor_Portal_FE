import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React,{useState,useEffect } from "react";
import apiService from "../services/api.service";
import Button from "@mui/material/Button";
import "../css/ApprovalFields.css";



export default function OpenPurchaseOrder(props) {
  const [poData, setpoData] = useState();
  const getPOdownload =(e)=>{
    apiService.getPOfileDownload().then((response) => {
      console.log("res=============>>>>>>",response)
    })
  }
  const columns = [
    { field: "No", headerName: "PO Number", width: 90 },
    {
      field: "Order_Date",
      headerName: "PO Date",
      width: 110,
      editable: true,
    },
    {
      field: "Payment_Terms_Code",
      headerName: "Payment Terms",
      width: 110,
      editable: true,
    },
    {
      field: "Buy_from_Vendor_Name",
      // Buy_from_Address, Buy_from_Address_2
      headerName: "Vendor Address",
      type: "string",
      width: 110,
      editable: true,
    },
    {
      field: "Customer_Name",
                // "Cusstomer Add1"
                // "Cusstomer Add2"
                // "Customer GST"
                // "Contact Person Name"
                // "Contact No"
                // "Customer E-mail"
      headerName: "Customer Name",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "Buy_from_Vendor_No",
      headerName: "Bill to",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "Ship_to_Name",
      headerName: "Ship to",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "Amount_to_Vendor",
      headerName: "Total Po Amt",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "Billed_Amount",
      headerName: "Billed amt",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "Unbilled_Amount",
      headerName: "Unbilled amt",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      // NO
      field: "mfgcode",
      headerName: "Manufacturing code",
      type: "number",
      width: 110,
      editable: true,
    },
    {
       // NO
      field: "quoteno",
      headerName: "Quote No",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "Purchaser_Code",
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
            onClick={getPOdownload}
            color="primary"
            style={{ marginLeft: 16 }}
          >
            Download
          </Button>
        </>
      ),
    },
  ];
  // const rows = [
  //   {
  //     id: "22114455",
  //     paymentterms: "Cheque",
  //     poDate: "12/12/2023",
  //     address: "chennai",
  //     custom: "ABC",
  //     billto: "xyz",
  //     shipto: "Mumbai",
  //     totalpo: "20000",
  //     billedamt: "15000",
  //     unbilledamt: "5000",
  //     mfgcode: "efgt45",
  //     quoteno: "67895",
  //     purspoc: "Don quixote",
  //   },
  //   {
  //     id: "22114455",
  //     paymentterms: "Cheque",
  //     poDate: "12/12/2023",
  //     address: "chennai",
  //     custom: "ABC",
  //     billto: "xyz",
  //     shipto: "Mumbai",
  //     totalpo: "20000",
  //     billedamt: "15000",
  //     unbilledamt: "5000",
  //     mfgcode: "efgt45",
  //     quoteno: "67895",
  //     purspoc: "Don quixote",
  //   },
  // ];

  useEffect(() => {
    console.log("response------PO order------000000----->>>>>>>>>")
    apiService.getErpPurchaseOrder_API().then((res) => {
      setpoData(res.data.value)
      console.log("response------PO order----111111111111------->>>>>>>>>",res.data.value)
    })
  },[poData])

  return (
    <Box>
      <div style={{ height: 350, width: "100%" }}>
        <DataGrid
          sx={{
            boxShadow: 10,
            borderRadius: 0,
            fontSize: "14px",
          }}
          rows={poData?poData:[]}
          getRowId={(rows) => rows?.No}
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
