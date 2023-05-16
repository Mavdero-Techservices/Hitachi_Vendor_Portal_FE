import styled from "@emotion/styled";
import { createTheme } from "@material-ui/core/styles";
import { Button, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import VendorPortalHeader from "../common/VendorPortalHeader";
import VendorPortSidemenu from "../common/VendorPortSidemenu";
import "../css/ApprovalFields.css";
import apiService from "../services/api.service";

const theme = createTheme({
  Link: {
    textTransform: "none",
  },
});

const EstimateDeliveryDate = () => {
 

  const columns = [
    "PO_Number",
    "PO_Date",
    "Payment_Terms",
    "Vendor_Address",
    "Customer_Name",
    "Bill_To",
    "Ship_To",
    "Total_PO_Amount",
    "Billed_Amount",
    "Unbilled_Amount",
    "Manufacturing_Code",
    "Quote_No",
    "Purchase_Spoc",
  ];

  useEffect(() => {

  }, []);
  

  const data = [
    {
      PO_Number: "BGL202223PO0007",
      PO_Date: "2022-05-09T00:00:00",
      Payment_Terms: "30-D",
      Vendor_Address: "Plot No.93, 4th, &, 10th St MCN Nagar",
      Customer_Name: "Aravind",
      Bill_To: "VOTH-4745",
      Ship_To: "HITACHI SYSTEMS INDIA PVT.LTD",
      Total_PO_Amount: "61880.01",
      Billed_Amount: "0",
      Unbilled_Amount: "0",
      Manufacturing_Code: "ATH22",
      Quote_No: "Mail",
      Purchase_Spoc: "DELMARA",
    },
    {
      PO_Number: "BGL202223POAMC0002",
      PO_Date: "2022-05-09T00:00:00",
      Payment_Terms: "PT-023",
      Vendor_Address: "Laxmipura Main Road, Abbigere",
      Customer_Name: "Sekar",
      Bill_To: "VLOC-3679",
      Ship_To: "HITACHI SYSTEMS INDIA PVT.LTD",
      Total_PO_Amount: "15783210.82",
      Billed_Amount: "0",
      Unbilled_Amount: "0",
      Manufacturing_Code: "ATH22",
      Quote_No: "Mail",
      Purchase_Spoc: "DELMARA",
    },
    {
      PO_Number: "DEL202223PO4604",
      PO_Date: "2022-05-09T00:00:00",
      Payment_Terms: "100%A",
      Vendor_Address: "No.6, NAL Wind Tunnel Road, Murugeshpalya",
      Customer_Name: "Moorthy",
      Bill_To: "VLOC-3679",
      Ship_To: "HITACHI SYSTEMS INDIA PVT.LTD",
      Total_PO_Amount: "15783210.82",
      Billed_Amount: "0",
      Unbilled_Amount: "0",
      Manufacturing_Code: "ATH22",
      Quote_No: "Mail",
      Purchase_Spoc: "DELMARA",
    },
  ];

  const rows = [
    {
      Document_Type: "Order",
      Document_No: "BGL202223PO0007",
      Line_No: "10000",
      Type: "Item",
      Description: "INDIAN OIL  CORPORATION LTD- BANGALORE-IN428807",
    },
    {
      Document_Type: "Order",
      Document_No: "BGL202223PO0007",
      Line_No: "20000",
      Type: "G/L Account",
      Description: "CISCO SWITCH  INSTALLATION ACTIVITY",
    },
    {
      Document_Type: "Order",
      Document_No: "BGL202223PO0007",
      Line_No: "300000",
      Type: "G/L Account",
      Description: "INTERNET PROBLEM  ISSUE",
    },
    {
      Document_Type: "Order",
      Document_No: "BGL202223POAMC0002",
      Line_No: "40000",
      Type: "Item",
      Description: "CISCO SWITCH  INSTALLATION ACTIVITY",
    },
    {
      Document_Type: "Order",
      Document_No: "BGL202223PO0007",
      Line_No: "50000",
      Type: "G/L Account",
      Description: "CISCO SWITCH  INSTALLATION ACTIVITY",
    },
    {
      Document_Type: "Order",
      Document_No: "DEL202223PO4604",
      Line_No: "60000",
      Type: "G/L Account",
      Description: "AMC/Support/Installation/service charges",
    },
    {
      Document_Type: "Order",
      Document_No: "DEL202223PO4604",
      Line_No: "60000",
      Type: "Item",
      Description: "Spare/service charges",
    },
  ];

  let purchList = [];
  let purchLine = [];
  // setpurchList([])
  const onRowSelectionChange = (ev, ex, ez) => {
    purchList = [];
    purchLine = [];
    // setpurchLine([])
      for (let i = 0; i < ex.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (j === ex[i].index) {
            // setpurchList([])
            purchList.push(data[ex[i].index]);
            for (let k = 0; k < rows.length; k++) {
              if (data[j].PO_Number === rows[k].Document_No) {
                purchLine.push(rows[k]);
              }
            }
          }
        }
      } 
  };

  
  

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    rowsPerPage: 5,
    rowsPerPageOptions: [1, 3, 5, 6],
    jumpToPage: true,
    textLabels: {
      pagination: {
        next: "Next >",
        previous: "< Previous",
        rowsPerPage: "Total items Per Page",
        displayRows: "OF",
      },
    },
    selectableRowsHeader: false,
    expandableRowsHeader: false,
    selectableRows: "multiple",
    rowHove: false,
    sort: true,
    search: true,
    onRowSelectionChange,

  

    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      return (
        <React.Fragment>
          <tr>
            <td colSpan={6}>
              <TableContainer component={Paper}>
                <Table style={{ minWidth: "1000" }} aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "#0001" }}>
                    <TableRow>
                      <TableCell align="center">Document_Type</TableCell>
                      <TableCell align="center">Document_No</TableCell>
                      <TableCell align="center">Line_No</TableCell>
                      <TableCell align="center">Type</TableCell>
                      <TableCell align="center">Description</TableCell>
                      <TableCell align="center">EDD</TableCell>
                      <TableCell align="center">Start Period</TableCell>
                      <TableCell align="center">End Period</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .filter((row) => {
                        return row.Document_No === rowData[0];
                      })
                      .map((item) => (
                        <TableRow key={item.Line_No}>
                          <TableCell align="center">
                            {item.Document_Type}
                          </TableCell>
                          <TableCell align="center">
                            {item.Document_No}
                          </TableCell>
                          <TableCell align="center">{item.Line_No}</TableCell>
                          <TableCell align="center">{item.Type}</TableCell>
                          <TableCell align="center">
                            {item.Description}
                          </TableCell>
                          <TableCell>
                            {item.Type === "Item" ? (
                              <Box>
                                <TextField
                                  id="outlined-basic"
                                  type="date"
                                  variant="outlined"
                                  sx={{
                                    border: "1px solid black",
                                    borderRadius: "4px",
                                  }}
                                />
                              </Box>
                            ) : (
                              <></>
                            )}
                          </TableCell>
                          <TableCell>
                            {item.Type === "G/L Account" ? (
                              <Box>
                                <TextField
                                  id="outlined-basic"
                                  type="date"
                                  variant="outlined"
                                  sx={{
                                    border: "1px solid black",
                                    borderRadius: "4px",
                                  }}
                                />
                              </Box>
                            ) : (
                              <></>
                            )}
                          </TableCell>
                          <TableCell>
                            {item.Type === "G/L Account" ? (
                              <Box>
                                <TextField
                                  id="outlined-basic"
                                  type="date"
                                  variant="outlined"
                                  sx={{
                                    border: "1px solid black",
                                    borderRadius: "4px",
                                  }}
                                />
                              </Box>
                            ) : (
                              <></>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </td>
          </tr>
        </React.Fragment>
      );
    },
  };

  const DataTableContainer = styled("div")(() => ({
    width: "1000px",
    height: "100px",
    margin: "10px",
    label: {
      "& .tss-1akey0g-MUIDataTableHeadCell-data": {
        fontSize: "14px",
        color: "red",
      },
      ".css-102h9k5-MuiTableCell-root": { width: "100px" },
    },
  }));

  const submitPOdetails = () => {
    console.log("1111111111", purchList, purchLine);
    apiService.postErpPurchaseOrderList(purchList);
    apiService.postErpPurchaseOrderLine(purchLine);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ backgroundColor: "#f3f4f7" }}>
        <CssBaseline />
        <VendorPortalHeader />
        <Box sx={{ display: "flex" }}>
          <VendorPortSidemenu />
          {/* <MuiThemeProvider theme={getMuiTheme}> */}
          <DataTableContainer>
            <MUIDataTable
              title={"EDD list"}
              data={data}
              columns={columns}
              options={options}
            />

            <Button
              variant="contained"
              sx={{ float: "right", top: "5px" }}
              onClick={submitPOdetails}
            >
              Submit
            </Button>
          </DataTableContainer>
          {/* </MuiThemeProvider> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EstimateDeliveryDate;
