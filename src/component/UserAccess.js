import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import VendorPortalHeader from "../common/MasterVendorHeader";
import VendorPortSidemenu from "../common/MasterVendorSidemenu";
import Button from "@mui/material/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import "../css/userCreation.css";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function createData(Name) {
  return {
    Name,
  };
}
function UserAccess() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [getAllUser, setgetAllUser] = useState(null);
  const [getAllvendorcode, setgetAllvendorcode] = useState(null);
  const [subUserId, setsubUserId] = useState(null);
  const [values, setValues] = useState({
    Name: "",
    city_vendorCode_Pincode: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [Edit, setEdit] = useState({});
  const [editmodalShow, setEditModalShow] = useState(false);
  const [vcode, setVcode] = useState();
  const [vcityPincode, setvcityPincode] = useState();

  const theme = createTheme({
    Link: {
      textTransform: "none",
    },
  });
  const handleChange = (name, value, id) => {
    setValues((prevValues) => ({
      ...prevValues,
      [id]: {
        ...prevValues[id],
        [name]: value,
      },
    }));
  };

  function editMasterVendor(id, Name) {
    setEdit((prevEdit) => ({
      ...prevEdit,
      [id]: true,
    }));
  }

  let vendorCode = vcode;

  function UpdateMasterVendor(id, Name, city_vendorCode_Pincode) {
    const user = {
      SubUserId: id || undefined,
      city_vendorCode_Pincode: city_vendorCode_Pincode || undefined,
      vendorCode: vendorCode || undefined,
    };
    apiService.UpdateMasterVendorSubUserById(user).then((response) => {
      apiService.getAllMasterVendorSubUser().then((res) => {
        setEdit(true);
        setgetAllUser(res.data.result);
      });
      apiService.getAllVendorSubUser().then((res) => {
        setvcityPincode(res.data.result)
      });
    });
  }
  useEffect(() => {
    apiService.getAllMasterVendorSubUser().then((res) => {
      setgetAllUser(res.data.result);
    });
    apiService.getAllMasterVendorUserAccess().then((vendorCode) => {
      setgetAllvendorcode(vendorCode.data.result);
    });

    apiService.getAllVendorSubUser().then((res) => {
      setvcityPincode(res.data.result)
    });
  }, []);

  const handleVendorCodeChange = (event, value, data) => {
    setVcode(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ backgroundColor: "#f3f4f7" }}>
        <CssBaseline />
        <VendorPortalHeader />
        <Box sx={{ display: "flex" }}>
          <VendorPortSidemenu />
          <Box sx={{ mt: 2, width: "100%" }}>
            <Container>
              <div className="row p-3">
                <div className="col-lg-10">
                  <h2 className="masterTitle">USER ACCESS</h2>
                </div>
              </div>
              <Box sx={{ mt: 2, height: 350, width: "100%" }}>
                <TableContainer component={Paper} sx={{ overflow: "auto" }}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="userHead" align="center">
                          Name
                        </TableCell>
                        <TableCell className="userHead" align="center">
                          City_vendorCode_Pincode
                        </TableCell>
                        <TableCell className="userHead">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    {getAllUser
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((row) => (
                        <TableBody>
                          <TableRow key={row.id}>
                            <TableCell align="center">{row.Name}</TableCell>

                            <TableCell align="center">
                              {!Edit[row.id] && row.city_vendorCode_Pincode ? (                                
                                <>
                                {vcityPincode?.filter((vcity) => {
                                  return vcity.SubUserId === row.SubUserId
                                }).map((vpincode, key) => (
                                  <p key={key}>{vpincode.vendorCode + "_" + vpincode.city + "_" + vpincode.Pincode}</p>
                                ))}
                                </>
                              ) : (
                                <Autocomplete
                                  multiple
                                  id="checkboxes-tags-demo"
                                  options={getAllvendorcode}
                                  disableCloseOnSelect
                                  getOptionLabel={(option) =>
                                    option.vendorCode +
                                    "_" +
                                    option.city +
                                    "_" +
                                    option.Pincode
                                  }
                                  renderOption={(
                                    props,
                                    option,
                                    { selected }
                                  ) => (
                                    <li {...props}>
                                      <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                      />
                                      {option.vendorCode +
                                        "_" +
                                        option.city +
                                        "_" +
                                        option.Pincode}
                                    </li>
                                  )}
                                  style={{ width: 400, marginLeft: 100 }}
                                  onChange={(event, value) =>
                                    handleVendorCodeChange(event, value)
                                  }
                                  renderInput={(params) => (
                                    <TextField {...params} label="Checkboxes" />
                                  )}
                                />
                              )}
                            </TableCell>

                            <TableCell align="left">
                              {!Edit[row.id] && row.city_vendorCode_Pincode ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    editMasterVendor(row.id, row.Name)
                                  }
                                  className="btn m-2 uploadFile"
                                >
                                  Edit
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    UpdateMasterVendor(
                                      row.SubUserId,
                                      row.Name,
                                      values[row.id]?.city_vendorCode_Pincode
                                    )
                                  }
                                  className="btn m-2 uploadFile"
                                >
                                  Assign
                                </button>
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      ))}
                  </Table>
                </TableContainer>
                {getAllUser != null ? (
                  <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={getAllUser.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                ) : null}
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UserAccess;
