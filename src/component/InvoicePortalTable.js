import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../css/ApprovalFields.css";
import apiService from "../services/api.service";
import { TextField } from "@material-ui/core";

export default function InvoicePortalTable(props) {
  const [invoiceInfo, setinvoiceInfo] = useState("");

  const [poinvoiceInfo, setPoinvoiceInfo] = useState();

  useEffect(() => {
    apiService.getInvoiceinfo().then((response) => {
      console.log("response", response);
      setPoinvoiceInfo(response.data.result);
    });
  }, []);

  const invoiceUpload = (event, file, row) => {
    row.invoiceFile = event.target.files[0];
  };

  const document1Upload = (event, file, row) => {
    row.document1 = event.target.files[0];
  };

  const document2Upload = (event, file, row) => {
    row.document2 = event.target.files[0];
  };

  const document3Upload = (event, file, row) => {
    row.document3 = event.target.files[0];
  };

  const document4Upload = (event, file, row) => {
    row.document4 = event.target.files[0];
  };

  const document5Upload = (event, file, row) => {
    row.document5 = event.target.files[0];
  };

  const document6Upload = (event, file, row) => {
    row.document6 = event.target.files[0];
  };

  const renderInvoiceFile = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              invoiceUpload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    );
  };

  const renderDocument1 = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              document1Upload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    );
  };

  const renderDocument2 = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              document2Upload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    );
  };

  const renderDocument3 = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              document3Upload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    );
  };

  const renderDocument4 = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              document4Upload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    );
  };

  const renderDocument5 = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              document5Upload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    );
  };

  const renderDocument6 = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{
            "&:hover": { backgroundColor: "#B1000E" },
            textTransform: "capitalize",
            backgroundColor: "#B1000E",
          }}
          color="primary"
        >
          Upload File
          <input
            style={{ backgroundColor: "red" }}
            type="file"
            onChange={(event) => {
              document6Upload(event, event.target.files[0], params.row);
            }}
            hidden
          />
        </Button>
      </strong>
    );
  };

  const handleInvoiceChange = (event,row) => {
    row.vendorInvoiceNo = event.target.value;
  }

  const columns = [
    { field: "poNumber", headerName: "PO Number", width: 90 },
    {
      field: "docDate",
      headerName: "DocDate",
      width: 110,
      editable: true,
    },
    {
      field: "vendorInvoiceNo",
      headerName: "Vendor Invoice No ",
      width: 210,
      // editable: true,
      renderCell: (params) => {
        return (
            <>
                <TextField onChange={(event) => handleInvoiceChange(event,params.row)}>{params.row.vendorInvoiceNo} </TextField>
            </>
        );
    },
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
      editable: true,
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
      field: "baseAmount",
      headerName: "Base amt",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "taxAmount",
      headerName: "Tax amt",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "grossAmount",
      headerName: "Gross amt",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "invoiceFile",
      headerName: "Invoice Upload",
      width: 120,
      editable: true,
      renderCell: renderInvoiceFile,
    },
    {
      field: "document1",
      headerName: "Doc 1 Upload",
      type: "number",
      width: 120,
      renderCell: renderDocument1,
    },
    {
      field: "document2",
      headerName: "Doc 2 Upload",
      type: "number",
      width: 110,
      renderCell: renderDocument2,
    },
    {
      field: "document3",
      headerName: "Doc 3 Upload",
      type: "number",
      width: 110,
      renderCell: renderDocument3,
    },
    {
      field: "document4",
      headerName: "Doc 4 Upload",
      type: "number",
      width: 110,
      renderCell: renderDocument4,
    },
    {
      field: "document5",
      headerName: "Doc 5 Upload",
      type: "number",
      width: 110,
      renderCell: renderDocument5,
    },
    {
      field: "document6",
      headerName: "Doc 5 Upload",
      type: "number",
      width: 110,
      renderCell: renderDocument6,
    },
  ];

  const handleRequest = (e) => {
    e.preventDefault();
    if (invoiceInfo.length > 0) {
      console.log("invoiceInfo------------>", invoiceInfo);

      for (let i = 0; i < invoiceInfo.length; i++) {
        const data = new FormData();
        data.append("poNumber", invoiceInfo[i].poNumber);
        data.append("docDate", invoiceInfo[i].docDate);
        data.append("vendorInvoiceNo", invoiceInfo[i].vendorInvoiceNo);
        data.append("srNo", invoiceInfo[i].srNo);
        data.append("glCode", invoiceInfo[i].glCode);
        data.append("startDate", invoiceInfo[i].startDate);
        data.append("endDate", invoiceInfo[i].endDate);
        data.append("qty", invoiceInfo[i].qty);
        data.append("rate", invoiceInfo[i].rate);
        data.append("baseAmount", invoiceInfo[i].baseAmount);
        data.append("taxAmount", invoiceInfo[i].taxAmount);
        data.append("grossAmount", invoiceInfo[i].grossAmount);
        data.append("invoiceFile", invoiceInfo[i].invoiceFile);
        data.append("document1", invoiceInfo[i].document1);
        data.append("document2", invoiceInfo[i].document2);
        data.append("document3", invoiceInfo[i].document3);
        data.append("document4", invoiceInfo[i].document4);
        data.append("document5", invoiceInfo[i].document5);
        data.append("document6", invoiceInfo[i].document6);

        apiService.saveInvoiceInfo(data).then((response) => {

          if (response) {
            Swal.fire({
              title: "Data Saved",
              icon: "success",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
          } else {
            Swal.fire({
              title: "Error While Fetching",
              icon: "error",
              confirmButtonText: "OK",
              showCloseButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
          }
        });
      }
    }
  };

  return (
    <Box>
      <div style={{ height: 350, width: "100%" }}>
        <DataGrid
          sx={{
            boxShadow: 10,
            borderRadius: 0,
            fontSize: "14px",
          }}
          rows={poinvoiceInfo ? poinvoiceInfo : ""}
          getRowId={(rows) => rows.poNumber}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = poinvoiceInfo.filter((row) =>
              selectedIDs.has(row.poNumber)
            );
            if (selectedRowData) {
              setinvoiceInfo(selectedRowData);
            }
          }}
        />
      </div>
      <div className="float-end">
        <button
          type="button"
          onClick={(e) => handleRequest(e)}
          className="btn bankbtn btn-primary btn-md m-2"
        >
          Submit
        </button>
      </div>
    </Box>
  );
}
