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
import TablePagination from "@mui/material/TablePagination";
function createData(
  Name,
) {
  return {
    Name,
  };
}
function UserAccess() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [getAllUser, setgetAllUser] = useState(null);
  const [subUserId, setsubUserId] = useState(null);
  const [values, setValues] = useState({
    Name: "",
    city_vendorCode_Pincode:"",

  });
  const [modalShow, setModalShow] = useState(false);
  const [editmodalShow, setEditModalShow] = useState(false);
  const theme = createTheme({
    Link: {
      textTransform: "none",
    },
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  function editMasterVendor(id) {
    const user = {
      id: id || undefined,
    };
    setEditModalShow(true);
    setsubUserId(user);
    apiService.getMasterVendorUserAccessById(user).then((response) => {
      setValues({
        Name: response.data.result.Name || undefined,
        city_vendorCode_Pincode: response.data.result.city_vendorCode_Pincode || undefined,
      });
    });
  }
  const UpdateMasterVendor = (e) => {
    e.preventDefault();
    const user = {
      id:values.id || undefined,
      Name: values.Name || undefined,
      city_vendorCode_Pincode:values.city_vendorCode_Pincode || undefined
    };
    apiService.UpdateMasterVendorUserAccessById(user).then((response) => {
      apiService.getAllMasterVendorUserAccess().then((res) => {
        setgetAllUser(res.data.result);
      });
    });
  };
  const saveMasterVendor = (e) => {
    e.preventDefault();
    const user = {
      userId:
        JSON.parse(window.sessionStorage.getItem("jwt")).result.userId ||
        undefined,
      Name: values.Name || undefined,
      city_vendorCode_Pincode:values.city_vendorCode_Pincode || undefined,
    };
    apiService.saveMasterVendorUserAccess(user).then((response) => {
      apiService.getAllMasterVendorUserAccess().then((res) => {
        setgetAllUser(res.data.result);
      });
    });
  };
  useEffect(() => {
    console.log("getAllUser",getAllUser);
    apiService.getAllMasterVendorUserAccess().then((res) => {
      setgetAllUser(res.data.result);
    });
  }, []);

  const deleteRecord = (id) => {
    console.log("id::", id);
    Swal.fire({
      title: "Are You sure You want to delete?",
      icon: "warning",
      confirmButtonText: "OK",
    }).then((ClearData) => {
      apiService.deleteMasterVendorUserAccessById(id).then((res) => {
        apiService.getAllMasterVendorUserAccess().then((res) => {
          setgetAllUser(res.data.result);
        });
      });
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <Box style={{ backgroundColor: '#f3f4f7' }}  >
        <CssBaseline />
        <VendorPortalHeader />
        <Box sx={{ display: 'flex' }}>
          <VendorPortSidemenu />
          <Box sx={{ mt: 2, width: '100%' }}>
          <Container>
              <div className="row p-3">
                <div className="col-lg-10">
                  <h2 className="masterTitle">USER ACCESS</h2>
                </div>
                <div className="col-sm-2">
                  <Button
                    className="add_vendor"
                    variant="primary"
                    onClick={() => setModalShow(true)}
                  >
                    <AddIcon sx={{ color: "black" }} /> Add
                  </Button>
                  <Modal
                    show={modalShow}
                    backdrop="static"
                    keyboard={false}
                    onHide={() => setModalShow(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Add User Detail
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                      <Container>
                        <Row>
                          <Col  xs={6}>
                            <input
                              type="text"
                              className="swal2-input"
                              name="Name"
                              value={values.Name}
                              onChange={handleChange("Name")}
                              placeholder="Username"
                            />
                          </Col>
                          <Col  xs={6}>
                            <input
                              type="text"
                              id="City_vendorCode_Pincode"
                              className="swal2-input"
                              name="City_vendorCode_Pincode"
                              value={values.City_vendorCode_Pincode}
                              onChange={handleChange("City_vendorCode_Pincode")}
                              placeholder="City_vendorCode_Pincode"
                            />
                          </Col>
                        </Row>
                      </Container>
                    </Modal.Body>
                    <Modal.Footer>
                      <div className="text-center">
                      <Button
                        className="popupSave"
                        onClick={saveMasterVendor}
                      >
                        save
                      </Button>
                      </div>
                     
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
              <Box sx={{ mt: 2, height: 350, width: "100%" }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="userHead">Action</TableCell>
                        <TableCell className="userHead" align="center">
                          Name
                        </TableCell>
                        <TableCell className="userHead" align="center">
                          City_vendorCode_Pincode
                        </TableCell>  
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
                            <TableCell component="th" scope="row">
                              <EditIcon
                                onClick={() => editMasterVendor(row.id)}
                                sx={{ color: "black" }}
                              />
                              <DeleteIcon
                                onClick={() => deleteRecord(row.id)}
                                sx={{ color: "black" }}
                              />
                              <Modal
                                show={editmodalShow}
                                onHide={() => setEditModalShow(false)}
                                aria-labelledby="contained-modal-title-vcenter"
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title id="contained-modal-title-vcenter">
                                    edit User Detail
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="show-grid">
                                  <Container>
                                    <Row>
                                      <Col xs={12} md={6}>
                                        <input
                                          type="text"
                                          className="swal2-input"
                                          name="Name"
                                          value={values.Name}
                                          onChange={handleChange("Name")}
                                          placeholder="Username"
                                        />
                                      </Col>
                                      <Col xs={12} md={6}>
                                        <input
                                          type="text"
                                          id="city_vendorCode_Pincode"
                                          className="swal2-input"
                                          name="city_vendorCode_Pincode"
                                          value={values.city_vendorCode_Pincode}
                                          onChange={handleChange("city_vendorCode_Pincode")}
                                          placeholder="city_vendorCode_Pincode"
                                        />
                                      </Col>
                                    </Row>
                                  
                                  </Container>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    className="popupSave col-md-12"
                                    onClick={UpdateMasterVendor}
                                  >
                                    Update
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </TableCell>
                            <TableCell align="center">{row.Name}</TableCell>
                            <TableCell align="center">
                              {row.city_vendorCode_Pincode}
                            </TableCell>
                         
                          </TableRow>
      
                      
                    </TableBody>
                    
  ))}
                  </Table>
               
                </TableContainer>
                {getAllUser!=null ? (
                         <TablePagination
                         rowsPerPageOptions={[5, 10]}
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
  )
}

export default UserAccess;

