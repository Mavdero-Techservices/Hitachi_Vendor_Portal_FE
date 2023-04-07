import React, { useState, useEffect, useRef } from "react";
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
import TablePagination from "@mui/material/TablePagination";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useParams } from "react-router-dom";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function createData(Name) {
  return {
    Name,
  };
}
function UserAccess() {
  const params = useParams();
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
  const [vendorcode, setvendorcode] = useState(null);
  const [subUserId, setsubUserId] = useState(null);
  const [separateVendorCode, setseparateVendorCode] = useState(null);
  const [values, setValues] = useState({
    Name: "",
    city_vendorCode_Pincode: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [Edit, setEdit] = useState({});
  const [editmodalShow, setEditModalShow] = useState(false);
  const theme = createTheme({
    Link: {
      textTransform: "none",
    },
  });
  // const [options, setOptions] = useState(getAllvendorcode);
  const [options, setOptions] = useState([
    {
      No: "A0029",
    },
    {
      No: "A0056",
    },
  ]);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleOptionSelect = (event, selectedOptions) => {
    setOptions(
      options.map((option) =>
        selectedOptions.find(
          (selectedOption) => selectedOption.No === option.No
        )
          ? { ...option, checked: true }
          : { ...option, checked: false }
      )
    );
  };

  const renderOption = (option, { selected }) => (
    <React.Fragment>
      <Checkbox checked={option.checked} />
      {option.label}
    </React.Fragment>
  );

  const autoCompleteRef = useRef(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [currentRowData, setCurrentRowData] = useState(null);

  const handleSelectedValues = (event, value) => {
    event.preventDefault();
    const updatedOptions = options.map((option) => {
      if (
        value.find((selectedOption) => selectedOption.value === option.value)
      ) {
        return { ...option, checked: true };
      } else {
        return { ...option, checked: false };
      }
    });
    setOptions(updatedOptions);
    setSelectedValues(value);
  };

  const handleRowDataChange = (rowData) => {
    setCurrentRowData(rowData);
  };

  function editMasterVendor(id, Name) {
    setEdit((prevEdit) => ({
      ...prevEdit,
      [id]: true,
    }));
  }
  function UpdateMasterVendor(id) {
    const arrOfselectedValues = selectedValues
      ?.map((value) => value.No)
      .join(",");
    const user = {
      SubUserId: id || undefined,
      city_vendorCode_Pincode: arrOfselectedValues || undefined,
    };
    apiService.UpdateMasterVendorSubUserById(user).then((response) => {
      apiService.getAllMasterVendorSubUser().then((res) => {
        setEdit(true);
        setgetAllUser(res.data.result);
      });
    });
  }
  // const city_vendorCode_PincodeNo = getAllvendorcode;
  const city_vendorCode_PincodeNo = [
    {
      No: "A0029",
    },
    {
      No: "A0056",
    },
  ];
  useEffect(() => {
    apiService.getAllMasterVendorSubUser().then((res) => {
      setgetAllUser(res.data.result);
      const valuesString = res.data.result?.map(
        (value) => value.city_vendorCode_Pincode
      );
      const mappedArray = valuesString.map((valueString) => {
        const values2 = valueString.split(",");
        return values2;
      });
      setOptions(
        options.map((option) => ({
          ...option,
          checked: mappedArray.includes(option.No),
        }))
      );
    });
    apiService
      .getErpVendor_APIByParent_Vendor_Code(params.Parent_Vendor_Code)
      .then((vendorCode) => {
        setgetAllvendorcode(vendorCode.data);
      });
  }, []);
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
                              <div>
                                {!Edit[row.id] &&
                                row.city_vendorCode_Pincode ? (
                                  <p>{row.city_vendorCode_Pincode}</p>
                                ) : (
                                  <Autocomplete
                                    clearOnBlur={false}
                                    ref={autoCompleteRef}
                                    multiple
                                    options={city_vendorCode_PincodeNo}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.No}
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
                                          checked={
                                            selected ||
                                            selectedValues?.includes(option.No)
                                          }
                                        />
                                        {option.No}
                                      </li>
                                    )}
                                    style={{ width: 500 }}
                                    onChange={handleSelectedValues}
                                    onInputChange={(event, value) => {
                                      if (autoCompleteRef.current) {
                                        handleRowDataChange(
                                          autoCompleteRef.current?.inputValue
                                        );
                                      }
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="City_vendor_Pincode"
                                        placeholder="City_vendor_Pincode"
                                      />
                                    )}
                                    isOptionEqualToValue={(option, value) =>
                                      option.No === value.No
                                    }
                                  />
                                )}
                              </div>
                            </TableCell>

                            <TableCell align="left">
                              {!Edit[row.id] && row.city_vendorCode_Pincode ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    editMasterVendor(
                                      row.id,
                                      row.city_vendorCode_Pincode
                                    )
                                  }
                                  className="btn m-2 uploadFile"
                                >
                                  Edit
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    UpdateMasterVendor(row.SubUserId)
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
                    count={getAllUser?.length}
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
