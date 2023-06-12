import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { createTheme } from "@material-ui/core/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from '@mui/icons-material/Search';
import { Container, ThemeProvider } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { DataGrid } from "@mui/x-data-grid";
import { differenceInDays, format } from 'date-fns';
import { MDBRow } from "mdb-react-ui-kit";
import VendorPortSidemenu from "../common/VendorPortSidemenu";
import VendorPortalHeader from "../common/VendorPortalHeader";
import "../css/ApprovalFields.css";
import apiService from "../services/api.service";
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  Link: {
    textTransform: "none",
  },
});

const EstimateDeliveryDate = () => {


  const [accordionData, setAccordionData] = useState([]);
  const [edd, setEdd] = useState();

  console.log("edd----->", edd);
  console.log("accordionData----->", accordionData);

  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(accordionData?.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const [purchOrder, setpurchOrder] = useState([]);
  console.log("purchOrder----->", purchOrder);
  const [rows, setRows] = useState([]);


  useEffect(() => {



    const fetchEdd = async () => {
      let poData = [];
      await apiService.getErpPurchaseOrder_API().then((res) => {
        poData = [...res.data.value]
        setAccordionData(res.data.value)
      })

      await apiService.getErpPurchaseOrderLineEDD_API().then((res) => {
        let rowsWithIds = res.data.value.map((row) => ({
          ...row,
          rowkey: uuidv4(),
          key: row.Document_Type + "_" + row.Document_No + "_" + row.Line_No,
          vendorName: poData.length > 0 ? poData.find((x) => x?.No === row.Document_No)?.Buy_from_Vendor_Name : "sss"

        }));
        setEdd(rowsWithIds)

      })
    }


    fetchEdd()
  }, []);


  const handlePageChange = (event, value) => {
    setPage(value);
    setExpanded(1);
  };

  const handleChange =
    (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      const number = panel.substring(5);
      const filteredAccordionData = edd.filter((item) => item.Document_No === number);

      setRows(filteredAccordionData);

      // const filteredData = res.data.result.filter((item) => item.level1ApprovalStatus !== "Approved" && item.level1ApprovalStatus !== "Rejected");
      // setAccordionData(filteredData);
    };

  function getVendorName(params) {
    return `${params.row.Document_No
      ? accordionData?.find((x) => x.No === params.row.Document_No)
        ?.Buy_from_Vendor_Name
      : ""
      }`;
  }

  const handleEddDate = (e, item) => {
    console.log("e---------->", e);
    console.log("item---------->", item);
    item.Expected_Receipt_Date = e;
  }

  const handleStartDate = (e, item) => {
    console.log("item---------->", e);
    item.Start_Date = e;
  }

  const handleEndDate = (e, item) => {
    console.log("item---------->", e);
    item.End_Date = e;
  }

  const columns = [
    { field: "Document_Type", headerName: "Document_Type", width: 180 },
    { field: "Document_No", headerName: "Document_No", width: 180 },
    { field: "Line_No", headerName: "Line_No", width: 180 },
    { field: "Type", headerName: "Type", width: 180 },
    { field: "Description", headerName: "Description", width: 180 },
    { field: "No", headerName: "Vendor_Name", valueGetter: getVendorName, width: 180 },
    {
      field: "Expected_Receipt_Date", headerName: "EDD", width: 180,
      renderCell: (params) => (
        <>
          {
            params.row.Type === "Item" ? (
              <>
                <Box>
                  <TextField
                    id="outlined-basic"
                    type="date"
                    variant="outlined"
                    onChange={(e) => handleEddDate(e.target.value, params.row)}
                    sx={{
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              </>
            ) : (<></>)
          }
        </>
      )
    },
    {
      field: "Start_Date", headerName: "Start Period", width: 180,
      renderCell: (params) => (
        <>
          {
            params.row.Type === "G/L Account" ? (
              <>
                <Box>
                  <TextField
                    id="outlined-basic"
                    type="date"
                    variant="outlined"
                    onChange={(e) => handleStartDate(e.target.value, params.row)}
                    sx={{
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              </>
            ) : (<></>)
          }
        </>
      )
    },
    {
      field: "End_Date", headerName: "End Period", width: 180,
      renderCell: (params) => (
        <>
          {
            params.row.Type === "G/L Account" ? (
              <>
                <Box>
                  <TextField
                    id="outlined-basic"
                    type="date"
                    variant="outlined"
                    onChange={(e) => handleEndDate(e.target.value, params.row)}
                    sx={{
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              </>
            ) : (<></>)
          }
        </>
      )
    },
  ]


  const postEddDetails = (e) => {

    if (purchOrder.length > 0) {
      apiService.postEddDetails(purchOrder)
    }

  }

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ backgroundColor: "#f3f4f7" }}>
        <CssBaseline />
        <VendorPortalHeader />
        <Box sx={{ display: "flex" }}>
          <VendorPortSidemenu />
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
                    Estimated Delivery Date
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
                  // onChange={searchHandler}
                  />
                  {/* <FilterAltIcon
                    sx={{ marginTop: 1 }}
                    onClick={() => {
                      filterHandler();
                      handleOpen();
                    }}
                  /> */}
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
                    Po Number
                  </Typography>
                  <Typography sx={{ width: '36%', fontWeight: 'bold' }}>
                    Customer Name
                  </Typography>

                  <Typography sx={{ fontWeight: 'bold' }}>EDD</Typography>
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


                      <Typography >&nbsp;{item.No}</Typography>
                      <Typography
                        textAlign="center"
                        sx={{
                          width: "55%",
                          flexShrink: 0,
                          my: "auto",
                          fontWeight: "bold",
                        }}
                      >
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
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                          rows={rows ? rows : ""}
                          getRowId={(row) => row.rowkey}
                          columns={columns}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                          onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRowData = rows.filter((row) =>
                              selectedIDs.has(row.rowkey),
                            );
                            if (selectedRowData) {
                              // console.log("selected row----------->>>>>",selectedRowData)
                              setpurchOrder(selectedRowData)
                            }
                          }}
                          disableSelectionOnClick={true}
                          checkboxSelection={true}
                          experimentalFeatures={{ newEditingApi: true }}
                        />
                      </Box>
                      <div className="d-flex justify-content-end" sx={{ ml: 10 }}>
                        <MDBRow className="mb-4">
                          <div className="float-end">
                            <button
                              type="button"
                              className="btn basicbtn btn-md m-3"
                              onClick={(e) => postEddDetails(e)}
                            >
                              Submit
                            </button>
                          </div>
                        </MDBRow>
                      </div>
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
    </ThemeProvider>
  );
};

export default EstimateDeliveryDate;
