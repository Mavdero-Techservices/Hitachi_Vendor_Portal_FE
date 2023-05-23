import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Container, ThemeProvider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import { createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminHeader from "../common/AdminHeader";
import apiService from "../services/api.service";
import PurchaseOrder from "./PurchaseOrder";
import SideBar from "./SideBar";
import { v4 as uuidv4 } from "uuid";
import Pagination from '@mui/material/Pagination';
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { MDBRow } from "mdb-react-ui-kit";
import { format, differenceInDays } from 'date-fns';
export default function PoReject() {
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
      setExpanded(isExpanded ? panel : false);
      const number = panel.substring(5);
      const filteredAccordionData = accordionData.filter((item) => item.No === number);
      setRows(filteredAccordionData);
    };

  const theme = createTheme({
    Link: {
      textTransform: 'none',
    },
  });
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
  useEffect(() => {
    apiService.getPo().then((res) => {
      const filteredData = res.data.result.filter((item) => item.level1ApprovalStatus === "Rejected");
      setAccordionData(filteredData);
    });
  }, []);
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
                        {item.image && item.image !== 'null' ? <Avatar alt="Remy Sharp" src={`data:image/jpeg;base64, ${item.image}`} /> : <Typography variant="h4" sx={{ textTransform: 'uppercase' }}> {item.Buy_from_Vendor_Name?.charAt(0)}</Typography>}
                        <Typography >&nbsp;{item.Buy_from_Vendor_Name}</Typography>
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
                        {format(new Date(item.Order_Date), 'dd MMM')}

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
                            experimentalFeatures={{ newEditingApi: true }}
                          />
                        </Box>
                      </Box>
                    </AccordionDetails>
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

