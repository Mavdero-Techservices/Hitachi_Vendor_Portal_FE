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
    {
      name: "PO_Number",
      label: "PO Number",
      options: {
        setCellProps: () => ({
        }),
        
      },
    },
    {
      name: "Payment_Terms",
      label: "Payment Terms",
      options: {
        setCellProps: () => ({
        }),
        
      },
    },
    {
      name: "Vendor_Address",
      label: "Vendor Address",
      options: {
        setCellProps: () => ({
        }),
        
      },
    },
    {
      name: "Customer_Name",
      label: "Customer Name",
      options: {
        setCellProps: () => ({
        }),
       
      },
    },
    {
      name: "Bill_To",
      label: "Bill To",
      options: {
        setCellProps: () => ({
        }),
        
      },
    },
    {
      name: "Ship_To",
      label: "Ship To",
      options: {
        setCellProps: () => ({
        }),
        
      },
    },
    {
      name: "Total_PO_Amount",
      label: "Total PO Amount",
      options: {
        setCellProps: () => ({
        }),
        
      },
    },
    {
      name: "Billed_Amount",
      label: "Billed Amount",
      options: {
        setCellProps: () => ({
        }),
        
      },
    },
    {
      name: "Unbilled_Amount",
      label: "Unbilled Amount",
      options: {
        setCellProps: () => ({
        }),
       
      },
    },
    {
      name: "Manufacturing_Code",
      label: "Manufacturing Code",
      options: {
        setCellProps: () => ({
        }),
        
      },
    },
    {
      name: "Quote_No",
      label: "Quote No",
      options: {
        setCellProps: () => ({
        }),
       
      },
    },
    {
      name: "Purchase_Spoc",
      label: "Purchase Spoc",
      options: {
        setCellProps: () => ({
          
        }),
        
      },
    },
  ];


  useEffect(() => {}, []);

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
      Edd_Date: "",
      Start_Date: "",
      End_Date: "",
    },
    {
      Document_Type: "Order",
      Document_No: "BGL202223PO0007",
      Line_No: "20000",
      Type: "G/L Account",
      Description: "CISCO SWITCH  INSTALLATION ACTIVITY",
      Edd_Date: "",
      Start_Date: "",
      End_Date: "",
    },
    {
      Document_Type: "Order",
      Document_No: "BGL202223PO0007",
      Line_No: "300000",
      Type: "G/L Account",
      Description: "INTERNET PROBLEM  ISSUE",
      Edd_Date: "",
      Start_Date: "",
      End_Date: "",
    },
    {
      Document_Type: "Order",
      Document_No: "BGL202223POAMC0002",
      Line_No: "40000",
      Type: "Item",
      Description: "CISCO SWITCH  INSTALLATION ACTIVITY",
      Edd_Date: "",
      Start_Date: "",
      End_Date: "",
    },
    {
      Document_Type: "Order",
      Document_No: "BGL202223PO0007",
      Line_No: "50000",
      Type: "G/L Account",
      Description: "CISCO SWITCH  INSTALLATION ACTIVITY",
      Edd_Date: "",
      Start_Date: "",
      End_Date: "",
    },
    {
      Document_Type: "Order",
      Document_No: "DEL202223PO4604",
      Line_No: "60000",
      Type: "G/L Account",
      Description: "AMC/Support/Installation/service charges",
      Edd_Date: "",
      Start_Date: "",
      End_Date: "",
    },
    {
      Document_Type: "Order",
      Document_No: "DEL202223PO4604",
      Line_No: "60000",
      Type: "Item",
      Description: "Spare/service charges",
      Edd_Date: "",
      Start_Date: "",
      End_Date: "",
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

  const handleEddDate = (e, item) => {
    item.Edd_Date = e;
  }

  const handleStartDate = (e, item) => {
    item.Start_Date = e;
  }

  const handleEndDate = (e, item) => {
    item.End_Date = e;
  }

  const options = {
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
    filter: false,
    download: false,
    print: false,
    selectableRowsHeader: true,
    expandableRowsHeader: false,
    selectableRows: "multiple",

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
                                  onChange={(e) => handleEddDate(e.target.value, item)}
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
                                  onChange={(e) => handleStartDate(e.target.value, item)}
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
                                  onChange={(e) => handleEndDate(e.target.value, item)}
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
    margin: "10px",
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
