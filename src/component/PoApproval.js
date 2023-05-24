import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, ThemeProvider } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import apiService from "../services/api.service";
import { React, useEffect, useState } from 'react';
import AdminHeader from '../common/AdminHeader';
import { v4 as uuidv4 } from "uuid";
import PurchaseOrder from './PurchaseOrder';
import Pagination from '@mui/material/Pagination';
import SideBar from './SideBar';
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { MDBRow } from "mdb-react-ui-kit";
import { format, differenceInDays } from 'date-fns';
import axios from 'axios';
export default function PoApproval() {
  const [expanded, setExpanded] = useState(false);
  const [Document_Type, setDocument_Type] = useState("");
  const [accordionData, setAccordionData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(accordionData?.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;


  const handleChange =
    (panel) => (event, isExpanded) => {
      console.log("panel::", panel);
      setExpanded(isExpanded ? panel : false);
      const number = panel.substring(5);
      const filteredAccordionData = accordionData.filter((item) => item.No === number);

      console.log("accy677::", number, filteredAccordionData);
      setRows(filteredAccordionData);

      // const filteredData = res.data.result.filter((item) => item.level1ApprovalStatus !== "Approved" && item.level1ApprovalStatus !== "Rejected");
      // setAccordionData(filteredData);
    };

  const theme = createTheme({
    Link: {
      textTransform: 'none',
    },
  });

  const handleApprove = (event, Document_Type) => {
    //savePo

    console.log("event::", event, Document_Type, rows);
    if (Document_Type === "Invoice") {
      console.log("proceed with mail");
    }
    else if (Document_Type === "Order") {
      Swal.fire({
        heightAuto: true,

        html: `<div style="margin-left:1rem;margin:2rem;height:10rem;width:40rem;flex:0 0 150px;">
        <div class="approvestyle">
        <form>
        <label style="margin-left:0.5rem;" >Email:</label>
        <select  class="select" style="max-width:70%;margin-left:50" id="email" required>
        <option value="" hidden>Select EmailId</option>
          <option value="karthigapalani4@gmail.com">hitachi@gmail.com</option>
          <option value="apitestmail4@gmail.com">hitachi@yahoo.com</option>
        </select><br>
        <label >User Name:</label>
        <select  class="select" style="max-width:70%;margin-top:1rem;margin-left:15"  id="username" >
        <option value="" hidden>Select User Name</option>
          <option value="PO Team1" >PO Team1</option>
          <option value="PO Team2">PO Team2</option>
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
            console.log("valueofemail::", email, username, location);
            const savePO = {
              Document_Type: rows[0].Document_Type,
              No: event,
              Order_Date: rows[0].Order_Date,
              Payment_Terms_Code: rows[0].Payment_Terms_Code,
              Buy_from_Vendor_Name: rows[0].Buy_from_Vendor_Name,
              Customer_Name: rows[0].Customer_Name,
              Buy_from_Vendor_No: rows[0].Buy_from_Vendor_No,
              Ship_to_Name: rows[0].Ship_to_Name,
              Amount_to_Vendor: rows[0].Amount_to_Vendor,
              Billed_Amount: rows[0].Billed_Amount,
              Unbilled_Amount: rows[0].Unbilled_Amount,
              level1ApprovalStatus: "Approved",
              username: username,
              email: email,
              location: location,
            }


            apiService.savePO(savePO).then((res) => {
              if (res.data.msg === 'success') {
                Swal.fire({
                  title: res.data.result,
                  icon: "success",
                  confirmButtonText: "OK",
                }).then((res => {
                  Promise.all([apiService.getPo(), apiService.getErpPurchaseOrdersLists()]).then(
                    ([poRes, erpRes]) => {
                      const poValues = poRes.data.result.map((item) => item.No);
                      const filteredErpData = erpRes.data.result.filter(
                        (item) => !poValues.includes(item.No)
                      );
                      const rowsWithIds = filteredErpData.map((row) => ({
                        ...row,
                        id: uuidv4(),
                      }));

                      setRows(rowsWithIds);
                      console.log("Data:");
                      console.log(rowsWithIds);

                      setAccordionData(rowsWithIds);
                    }
                  );
                }))
              } else {
                Swal.fire({
                  title: res.data.message,
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }


            })

            //     apiService.updatePo(purchaseOrder).then((res) => {
            // if (res.data.msg === 'success') {
            //   Swal.fire({
            //     title: "Approved Successfully",
            //     icon: "success",
            //     confirmButtonText: "OK",
            //   }).then((result)=>{
            //     apiService.getPo().then((res) => {
            //       const filteredData = res.data.result.filter((item) => item.level1ApprovalStatus !== "Approved" && item.level1ApprovalStatus !== "Rejected");
            //       setAccordionData(filteredData);
            //     });
            //   })
            // } else {
            //   Swal.fire({
            //     title: res.data.message,
            //     icon: "error",
            //     confirmButtonText: "OK",
            //   });
            // }
            //     })

          }
        },
      });
    }


  };
  const handleReject = (event, Document_Type) => {
    console.log("Document_Type::", Document_Type);
    if (Document_Type === "Order") {
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
          }
          else {
            console.log("rejectdoc::", rejectdoc);
            const data = new FormData();
            data.append('level1rejectpodoc', rejectdoc);
            data.append('comment', comment);
            data.append('No', event);
            data.append("level1ApprovalStatus", "Rejected");
            data.append("Document_Type", rows[0].Document_Type);
            data.append("Order_Date", rows[0].Order_Date);
            data.append("Payment_Terms_Code", rows[0].Payment_Terms_Code);
            data.append("Buy_from_Vendor_Name", rows[0].Buy_from_Vendor_Name);
            data.append("Customer_Name", rows[0].Customer_Name);
            data.append("Buy_from_Vendor_No", rows[0].Buy_from_Vendor_No);
            data.append("Ship_to_Name", rows[0].Ship_to_Name);
            data.append("Amount_to_Vendor", rows[0].Amount_to_Vendor);
            data.append("Billed_Amount", rows[0].Billed_Amount);
            data.append("Unbilled_Amount", rows[0].Unbilled_Amount);

            apiService.savePO(data).then((res) => {
              console.log("rejected::", data)
              if (res.data.msg === 'success') {
                Swal.fire({
                  title: res.data.result,
                  icon: "success",
                  confirmButtonText: "OK",
                }).then((res => {
                  Promise.all([apiService.getPo(), apiService.getErpPurchaseOrdersLists()]).then(
                    ([poRes, erpRes]) => {
                      const poValues = poRes.data.result.map((item) => item.No);
                      const filteredErpData = erpRes.data.result.filter(
                        (item) => !poValues.includes(item.No)
                      );
                      const rowsWithIds = filteredErpData.map((row) => ({
                        ...row,
                        id: uuidv4(),
                      }));

                      setRows(rowsWithIds);
                      console.log("Data:");
                      console.log(rowsWithIds);

                      setAccordionData(rowsWithIds);
                    }
                  );
                }))
              } else {
                Swal.fire({
                  title: res.data.message,
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }


            })
            //     apiService.updatePo(data).then((res) => {
            // if (res.data.msg === 'success') {
            //   Swal.fire({
            //     title: "Rejected Successfully",
            //     icon: "success",
            //     confirmButtonText: "OK",
            //   }).then((result)=>{
            //     apiService.getPo().then((res) => {
            //       const filteredData = res.data.result.filter((item) => item.level1ApprovalStatus !== "Approved" && item.level1ApprovalStatus !== "Rejected");
            //       setAccordionData(filteredData);
            //     });
            //   })
            // } else {
            //   Swal.fire({
            //     title: res.data.message,
            //     icon: "error",
            //     confirmButtonText: "OK",
            //   });
            // }
            //     })


          }
        },
      });
    }
    else if (Document_Type === "Invoice") {
      console.log("proceed with mail");
    }
  };
  const [rows, setRows] = useState([]);
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
      headerName: "Vendor Address",
      type: "string",
      width: 110,
      editable: true,

    },
    {
      field: "Customer_Name",
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

    // {
    //   field: "",
    //   headerName: "Manufacturing code",
    //   type: "number",
    //   width: 110,
    //   editable: true,
    // },
    // {
    //   field: "",
    //   headerName: "Quote No",
    //   type: "number",
    //   width: 110,
    //   editable: true,
    // },
    // {
    //   field: "",
    //   headerName: "Purchase spoc",
    //   type: "number",
    //   width: 110,
    //   editable: true,
    // },

  ];
  const Invoicecolumns = [
    { field: "No", headerName: "PO Number", width: 90 },
    // {
    //   field: "Document_Type",
    //   headerName: "Document Type",
    //   width: 110,
    // },
    {
      field: "docDate",
      headerName: "DocDate",
      width: 110,
    },
    {
      field: "vendorInvoiceNo",
      headerName: "Vendor Invoice No ",
      width: 210,
      // editable: true,
      // renderCell: (params) => {
      //   return (
      //     <>
      //       <TextField
      //         // onChange={(event) => handleInvoiceChange(event, params.row)}
      //       >
      //         {params.row.vendorInvoiceNo}{" "}
      //       </TextField>
      //     </>
      //   );
      // },
    },
    {
      field: "srNo",
      headerName: "Sr No of Po",
      type: "string",
      width: 110,

    },
    {
      field: "glCode",
      headerName: "Item/GL Code",
      type: "number",
      width: 110,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "endDate",
      headerName: "End Date",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "qty",
      headerName: "Quantity",
      type: "number",
      width: 110,
    },
    {
      field: "qtyDelivered",
      headerName: "Quantity delivered",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "rate",
      headerName: "Rate",
      type: "number",
      width: 110,
    },
    {
      field: "baseAmount",
      headerName: "Base amt",
      type: "number",
      width: 110,
    },
    {
      field: "taxAmount",
      headerName: "Tax amt",
      type: "number",
      width: 110,
    },
    {
      field: "grossAmount",
      headerName: "Gross amt",
      type: "number",
      width: 110,
    },
    {
      field: "eWayBill",
      headerName: "E-Way Bill",
      width: 120,
      // renderCell: rendereWayBill,
    },
    {
      field: "transportDocument",
      headerName: "Transport Document",
      type: "number",
      width: 120,
      // renderCell: rendertransportDocument,
    },
    {
      field: "miscDocs",
      headerName: "MISC Docs",
      type: "number",
      width: 110,
      // renderCell: rendermiscDocs,
    },
    {
      field: "boe",
      headerName: "BOE",
      type: "number",
      width: 110,
      // renderCell: renderboe,
    },
    {
      field: "awb",
      headerName: "AWB",
      type: "number",
      width: 110,
      // renderCell: renderawb,
    },
    {
      field: "serviceAgreement",
      headerName: "Service Agreement",
      type: "number",
      width: 110,
      // renderCell: renderserviceAgreement,
    },
    {
      field: "lic",
      headerName: "LIC",
      type: "number",
      width: 110,
      // renderCell: renderlic,
    },
    {
      field: "licDeliveryProof",
      headerName: "LIC Delivery Proof",
      type: "number",
      width: 110,
      // renderCell: renderlicDeliveryProof,
    },
    {
      field: "warrantyCertificate",
      headerName: "Warranty Certificate",
      type: "number",
      width: 110,
      // renderCell: renderwarrantyCertificate,
    },
    {
      field: "irWcc",
      headerName: "IR/WCC",
      type: "number",
      width: 110,
      // renderCell: renderirWcc,
    },
    {
      field: "signOffFromCustomer",
      headerName: "Sign off from customer",
      type: "number",
      width: 110,
      // renderCell: rendersignOffFromCustomer,
    },
    {
      field: "coc",
      headerName: "COC",
      type: "number",
      width: 110,
      // renderCell: rendercoc,
    },
    {
      field: "esiPayementChallan",
      headerName: "ESI Payment Challan",
      type: "number",
      width: 110,
      // renderCell: renderesiPayementChallan,
    },
    {
      field: "pfPayementChallan",
      headerName: "PF Payment Challan",
      type: "number",
      width: 110,
      // renderCell: renderpfPayementChallan,
    },
    {
      field: "employeeSummary",
      headerName: "Employee Summary",
      type: "number",
      width: 110,
      // renderCell: renderemployeeSummary,
    },
    {
      field: "arWorking",
      headerName: "AR Working",
      type: "number",
      width: 110,
      // renderCell: renderarWorking,
    },
    {
      field: "deliveryProof",
      headerName: "Deliver Proof",
      type: "number",
      width: 110,
      // renderCell: renderdeliveryProof,
    },
    {
      field: "calculation",
      headerName: "Calculation",
      type: "number",
      width: 110,
      // renderCell: rendercalculation,
    },
    {
      field: "customExRate",
      headerName: "Custom's EX Rate",
      type: "number",
      width: 110,
      // renderCell: rendercustomExRate,
    },
  ];
  useEffect(() => {
    Promise.all([apiService.getInvoiceinfo()]).then(
      ([invoiceRes]) => {
        // Process getPo response
        // const poValues = poRes.data.result.map((item) => item.No); // Modify 'someValue' to the actual property name you want to filter on
        // const filteredErpData = erpRes.data.result.filter(
        //   (item) => !poValues.includes(item.No) // Modify 'someValueToCompare' to the actual property name you want to compare with the 'getPo' response
        // );
        const invoiceValues = invoiceRes.data.result
        let erpDATA = [{
          Document_Type: "Order",
          No: "BGL202223PO0007",
          Posting_Date: "2023-01-23T00:00:00",
          Case_Id_No: "IN603779",
          Buy_from_Vendor_No: "VLOC-2948",
          Order_Address_Code: "",
          Buy_from_Vendor_Name: "PROCURRI INDIA PRIVATE LIMITED",
          Vendor_Authorization_No: "",
          Buy_from_Post_Code: "560001",
          Buy_from_Country_Region_Code: "IND",
          Buy_from_Address: "Office No.312/3 Barton Centre, Mahatma Gandhi Road",
          Buy_from_Address_2: "Bangalore, Karnataka",
          Buy_from_Contact: "",
          Pay_to_Vendor_No: "VLOC-2948",
          Pay_to_Name: "PROCURRI INDIA PRIVATE LIMITED",
          Pay_to_Post_Code: "560001",
          Pay_to_Country_Region_Code: "IND",
          Pay_to_Contact: "",
          Ship_to_Code: "",
          Requested_Receipt_Date: "0001-01-01T00:00:00",
          Expected_Receipt_Date: "0001-01-01T00:00:00",
          Promised_Receipt_Date: "2022-11-25T00:00:00",
          Ship_to_Name: "HITACHI SYSTEMS INDIA PVT.LTD.",
          Ship_to_Post_Code: "560025",
          Ship_to_Country_Region_Code: "IND",
          Ship_to_Contact: "KM Akshay,08022456167,9686446905",
          Gen_Journal_Template_Code: "BGL-PO",
          Purchase_Order_Type: "Spares",
          Purchase_Order_Sub_Categories: "Product Support (H/w & S/w)",
          PO_Status: "Active",
          Shortcut_Dimension_1_Code: "11000",
          Shortcut_Dimension_2_Code: "DEL201508SOSLS0002",
          Turn_Over_Branch: "11000",
          Location_Code: "BGL-AMC",
          Purchaser_Code: "DELSARG",
          Bid_No: "NIL",
          Assigned_User_ID: "",
          Currency_Code: "",
          Document_Date: "2023-01-20T00:00:00",
          Status: "Released",
          Workflow_Status: "Approved",
          MSME_Vendor_Type: "Registered",
          Payment_Terms_Code: "30-D",
          Due_Date: "2023-02-19T00:00:00",
          Payment_Discount_Percent: "0",
          Payment_Method_Code: "",
          Shipment_Method_Code: "",
          Job_Queue_Status: " ",
          Unbilled_Amount: "21000",
          Billed_Amount: "0",
          Amount: "21000",
          Amount_to_Vendor: "24780",
          GST_Vendor_Type: "Registered",
          Created_by_ID: "MCIPL\\Y0017",
          Approver_Person_User_ID: "MCIPL\\M1546",
          Order_Date: "2022-11-24T00:00:00",
          CRM_ID: "",
          Salesperson_Code: "",
          Salesperson_Name: "",
          Pre_Sales_Person_Code: "",
          Pre_Salesperson_Name: "",
          Project_Manager_EMP_Code: "",
          Project_Manager_Name: "",
          Remarks: "",
          Customer_Name: "",
          Customer_Add1: "",
          Customer_Add2: "",
          Customer_GST: "",
          Contact_Person_Name: "",
          Contact_No: "",
          Customer_Email: "",
          ETag: "64;JgAAAACLAQAAAAJ7/0IARwBMADIAMAAyADIAMgAzAFAATwAwADAAMAA3AAAAAAA=10;59647679890;"
        }]
        let filteredErpData = [];
        filteredErpData.push(erpDATA[0])
        console.log("erpDATA[0]--------------", erpDATA[0])
        let filteredErpData2 = filteredErpData.filter(
          (item) => item.PO_Status === 'Active' // Modify 'someValueToCompare' to the actual property name you want to compare with the 'getPo' response
        );
        let arrayData = []
        for (let x in filteredErpData2) {
          arrayData.push(filteredErpData2[x])
        }
        for (let y in invoiceValues) {
          arrayData.push(invoiceValues[y])
        }

        // Process getErpPurchaseOrdersLists response
        const rowsWithIds = arrayData.map((row) => ({
          ...row,
          id: uuidv4(),
        }));

        setRows(rowsWithIds);
        console.log("Data:");
        console.log(rowsWithIds);

        setAccordionData(rowsWithIds);
      }
    );
  }, []);

  // useEffect(() => {
  //   apiService.getErpPurchaseOrdersLists().then((res) => {
  //     const rowsWithIds = res.data.result.map((row) => ({
  //       ...row,
  //       id: uuidv4(),
  //     }));
  //     setRows(rowsWithIds);
  //     console.log("data::")
  //     const filteredData = res.data.result.filter((item) => item.level1ApprovalStatus !== "Approved" && item.level1ApprovalStatus !== "Rejected");
  //     setAccordionData(rowsWithIds);
  //   });
  // }, []);
  const handlePageChange = (event, value) => {
    setPage(value);
    setExpanded(1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ backgroundColor: '#f3f4f7' }}>
        <CssBaseline />
        <AdminHeader team="PurchaseTeam" />
        <Box sx={{ display: 'flex' }}>
          <SideBar poTeam="PurchaseApproval" />
          <Box sx={{ mt: 2, width: '100%' }}>
            <Container>
              <Accordion className="accordion1" sx={{ mt: 1 }}>
                <AccordionSummary
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography
                    variant="h5"
                    sx={{ width: '40%', flexShrink: 0, fontWeight: 'bold' }}
                  >
                    Approvals
                  </Typography>
                  <Typography sx={{ width: '36%' }}></Typography>
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </AccordionSummary>
              </Accordion>
              <Accordion className="accordion1">
                <AccordionSummary
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography
                    sx={{ width: '40%', flexShrink: 0, fontWeight: 'bold' }}
                  >
                    Vendor name
                  </Typography>
                  <Typography sx={{ width: '36%', fontWeight: 'bold' }}>
                    Task
                  </Typography>
                  <Typography sx={{ width: '12%', fontWeight: 'bold' }}>
                    Submit date
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>Age</Typography>
                </AccordionSummary>
              </Accordion>

              <>
                {accordionData?.slice(startIndex, endIndex).map((item, key) => <>

                  <Accordion expanded={expanded === 'panel' + item.No} key={key} onChange={handleChange('panel' + item.No)} >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`${item.No}-content`}
                      id={`${item.No}-header`}
                    >
                      <IconButton
                        sx={{
                          p: 0,
                          width: "18%",
                          justifyContent: "flex-start",
                        }}
                      >
                        {item.image && item.image !== 'null' ? <Avatar alt="Remy Sharp" src={`data:image/jpeg;base64, ${item.image}`} /> : <Typography variant="h4" sx={{ textTransform: 'uppercase' }}> {item.Buy_from_Vendor_Name ? item.Buy_from_Vendor_Name.charAt(0) : item.vendorName.charAt(0)}</Typography>}
                        <Typography >&nbsp;{item.Buy_from_Vendor_Name ? item.Buy_from_Vendor_Name : item.vendorName}</Typography>
                      </IconButton>
                      <Typography
                        textAlign="center"
                        sx={{
                          width: "55%",
                          flexShrink: 0,
                          my: "auto",
                          fontWeight: "bold",
                        }}
                      >
                        {item.Document_Type === "Order" ? "Review PO" : "Review Invoice"}
                      </Typography>
                      <Typography
                        textAlign="right"
                        sx={{
                          width: "10%",
                          flexShrink: 0,
                          my: "auto",
                          fontWeight: "bold",
                        }}
                      >
                        {/* {format(new Date(item.Order_Date), 'dd MMM')} */}

                      </Typography>
                      <Typography
                        textAlign="right"
                        sx={{
                          width: "10%",
                          flexShrink: 0,
                          my: "auto",
                          fontWeight: "bold",
                        }}
                      >
                        {differenceInDays(new Date(), new Date(item.Order_Date))} {differenceInDays(new Date(), new Date(item.Order_Date)) > 1 ? "Days" : "Day"}
                      </Typography>
                    </AccordionSummary>
                    {item.Document_Type === 'Order' ?
                      <AccordionDetails>
                        <Box>
                          <Typography sx={{ ml: 1, fontWeight: "bold" }}>Purchase Order</Typography>
                          <Box
                            sx={{
                              height: 300,
                              width: "100%",

                              "& .super-app-theme--header": {
                                backgroundColor: "#808080",
                                color: "#ffffff",
                              },
                              "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
                                fontSize: 15,
                                fontWeight: "bold",
                              },
                              ".css-o8hwua-MuiDataGrid-root .MuiDataGrid-cellContent": {
                                fontSize: 13,
                              },
                              ".css-bfht93-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
                              {
                                backgroundColor: "#330033",
                                color: "#ffffff",
                              },
                              ".css-h4y409-MuiList-root": {
                                display: "grid",
                              },
                              ".css-1omg972-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
                              {
                                backgroundColor: "#808080",
                              },
                            }}
                          >
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
                              //   checkboxSelection="none"
                              disableSelectionOnClick
                              experimentalFeatures={{ newEditingApi: false }}
                            />
                          </Box>
                          <div className="d-flex justify-content-end" sx={{ ml: 10 }}>
                            <MDBRow className="mb-4">
                              <div className="float-end">
                                <button
                                  type="button"
                                  onClick={(e) => handleReject(item.No, item.Document_Type)}
                                  className="btn basicbtn btn-md m-3"
                                >
                                  Reject
                                </button>

                                <button
                                  type="button"
                                  className="btn basicbtn btn-md m-3"
                                  onClick={(e) => handleApprove(item.No, item.Document_Type)}
                                >
                                  Approve
                                </button>
                              </div>
                            </MDBRow>
                          </div>
                        </Box>
                      </AccordionDetails>
                      : <></>}
                    {item.Document_Type === 'Invoice' ?
                      <AccordionDetails>
                        <Box>
                          {/* <Typography sx={{ ml: 1, fontWeight: "bold" }}>Purchase Order</Typography> */}
                          <Box
                            sx={{
                              height: 300,
                              width: "100%",

                              "& .super-app-theme--header": {
                                backgroundColor: "#808080",
                                color: "#ffffff",
                              },
                              "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
                                fontSize: 15,
                                fontWeight: "bold",
                              },
                              ".css-o8hwua-MuiDataGrid-root .MuiDataGrid-cellContent": {
                                fontSize: 13,
                              },
                              ".css-bfht93-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
                              {
                                backgroundColor: "#330033",
                                color: "#ffffff",
                              },
                              ".css-h4y409-MuiList-root": {
                                display: "grid",
                              },
                              ".css-1omg972-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
                              {
                                backgroundColor: "#808080",
                              },
                            }}
                          >
                            <DataGrid
                              sx={{
                                boxShadow: 10,
                                borderRadius: 0,
                                fontSize: "14px",
                              }}
                              rows={rows}
                              columns={Invoicecolumns}
                              pageSize={5}
                              rowsPerPageOptions={[5]}
                              //   checkboxSelection="none"
                              disableSelectionOnClick
                              experimentalFeatures={{ newEditingApi: true }}
                            />
                          </Box>
                          <div className="d-flex justify-content-end" sx={{ ml: 10 }}>
                            <MDBRow className="mb-4">
                              <div className="float-end">
                                {/* <button
                                type="button"
                                // onClick={(e) => handlesave(item.No, item.Document_Type)}
                                className="btn basicbtn btn-md m-3"
                              >
                                Save
                              </button> */}
                                <button
                                  type="button"
                                  onClick={(e) => handleReject(item.No, item.Document_Type)}
                                  className="btn basicbtn btn-md m-3"
                                >
                                  Reject
                                </button>

                                <button
                                  type="button"
                                  className="btn basicbtn btn-md m-3"
                                  onClick={(e) => handleApprove(item.No, item.Document_Type)}
                                >
                                  Approve
                                </button>
                              </div>
                            </MDBRow>
                          </div>
                        </Box>
                      </AccordionDetails>
                      : <></>}
                  </Accordion>
                </>)}

                {/* <Accordion
                  expanded={expanded === 'panel'}
                  onChange={handleChange('panel')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panelbh-content"
                    id={'panel1bh-header'}
                  >
                    <IconButton
                      sx={{
                        p: 0,
                        width: '18%',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                      <Typography>&nbsp;{'xyz'}</Typography>
                    </IconButton>
                    {Document_Type === 'order' ? (
    <Typography
      textAlign="center"
      sx={{
        width: '55%',
        flexShrink: 0,
        my: 'auto',
        fontWeight: 'bold',
      }}
    >
      Review Po
    </Typography>
  ) : (
    <Typography
      textAlign="center"
      sx={{
        width: '55%',
        flexShrink: 0,
        my: 'auto',
        fontWeight: 'bold',
      }}
    >
      Review Invoice
    </Typography>
  )}
                    <Typography
                      textAlign="right"
                      sx={{
                        width: '10%',
                        flexShrink: 0,
                        my: 'auto',
                        fontWeight: 'bold',
                        ml: 2,
                      }}
                    >
                      Dec 30
                    </Typography>
                    <Typography
                      textAlign="right"
                      sx={{
                        width: '10%',
                        flexShrink: 0,
                        my: 'auto',
                        fontWeight: 'bold',
                        ml: 2,
                      }}
                    >
                      2 days
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <PurchaseOrder />
                  </AccordionDetails>
                </Accordion> */}
                <Pagination style={{ float: 'right', marginTop: '1rem' }}
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
