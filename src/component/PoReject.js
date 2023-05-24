import InputAdornment from "@material-ui/core/InputAdornment";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Container, ThemeProvider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { differenceInDays, format } from "date-fns";
import { MDBRow } from "mdb-react-ui-kit";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminHeader from "../common/AdminHeader";
import apiService from "../services/api.service";
import SideBar from "./SideBar";

function getModalStyle() {
  const top = 50;
  const left = 75;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "fixed",
    width: 450,
    height: 200,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PoReject() {
  const [expanded, setExpanded] = useState(false);
  const [Document_Type, setDocument_Type] = useState("");
  const [accordionData, setAccordionData] = useState([]);
  const [submitDate, setsubmitDate] = useState();
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(accordionData?.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;


  // const handleChange =
  //   (panel) => (event, isExpanded) => {
  //     setExpanded(isExpanded ? panel : false);
  //     const number = panel.substring(5);
  //     const filteredAccordionData = accordionData.filter((item) => item.No === number);
  //     setRows(filteredAccordionData);
  //   };

  // const theme = createTheme({
  //   Link: {
  //     textTransform: 'none',
  //   },
  // });

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const theme = createTheme({
    Link: {
      textTransform: "none",
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
    getPoList()
  }, []);

  const getPoList = async () => {
    apiService.getPo().then((res) => {
      const filteredData = res.data.result.filter((item) => item.level1ApprovalStatus === "Rejected");
      setAccordionData(filteredData);
    });
  }
  const handlePageChange = (event, value) => {
    setPage(value);
    setExpanded(1);
  };

  const searchHandler = (e) => {
    let input;
    let newFilteredSuggestions;

    if (e.target.value) {
      input = e.currentTarget.value;
      newFilteredSuggestions = accordionData?.filter(
        (suggestion) =>
          suggestion.Buy_from_Vendor_Name.toLowerCase().indexOf(input.toLowerCase()) > -1
      );
      setAccordionData(newFilteredSuggestions);
    } else {
      getPoList();
    }
  };

  const filterHandler = (e) => {
    setOpen(false);
    let newFilteredSuggestions;

    if (submitDate) {
      newFilteredSuggestions = accordionData?.filter(
        (suggestion) =>
          moment(suggestion.Order_Date).format("MMM DD") === submitDate
      );

      setAccordionData(newFilteredSuggestions);
    } else {
    }
  };

  const dateHandler = (e) => {
    setsubmitDate(moment(e.$d).format("MMM DD"));
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
                    onChange={searchHandler}
                  />
                  <FilterAltIcon
                    sx={{ marginTop: 1 }}
                    onClick={() => {
                      filterHandler();
                      handleOpen();
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
                  Review Advance Payment PO
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
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "16px", fontWeight: 600 }}
            >
              Filter Results For Approval
            </Typography>

            <HighlightOffIcon
              sx={{ float: "right", marginTop: "-31px", fontSize: "20px" }}
              onClick={() => {
                setOpen(false);
              }}
            />
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Submit Date" onChange={dateHandler} />
            </DemoContainer>
          </LocalizationProvider>

          <Button
            variant="contained"
            sx={{ float: "right", top: "25px" }}
            onClick={filterHandler}
          >
            Apply Filter
          </Button>
        </div>
      </Modal>
    </ThemeProvider>
  );
}

