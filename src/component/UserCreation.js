
import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from "@mui/material";
import VendorPortalHeader from '../common/MasterVendorHeader';
import VendorPortSidemenu from '../common/MasterVendorSidemenu';
import Button from '@mui/material/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import "../css/userCreation.css"
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import DeleteIcon from '@mui/icons-material/Delete';
function createData(Name, designation, Department, emailId, mobileNo, loginId, password, roles) {
  return { Name, designation, Department, emailId, mobileNo, loginId, password, roles };
}
const rows = [
  createData('Rahul', "Am", "finance", "xxx@gmail.com", "9876543210", "xxxxxx", "xxx9", "financial"),
  createData('Ankit', "Manager", "finance", "xxx@gmail.com", "9876543210", "xxxxxx", "xxx9", "financial"),
  createData('Nitin', "CEO", "finance", "xxx@gmail.com", "9876543210", "xxxxxx", "xxx9", "financial"),
];

function UserCreation() {
  const [getAllUser, setgetAllUser] = useState(null);
  const [subUserId, setsubUserId] = useState(null);
  const [values, setValues] = useState({
    Name: '',
    designation: '',
    Department: '',
    emailId: '',
    mobileNo: '',
    loginId: '',
    password: '',
    roles: '',
    userId: '',
  });
  const [modalShow, setModalShow] = useState(false);
  const [editmodalShow, setEditModalShow] = useState(false);
  const theme = createTheme({
    Link: {
      textTransform: "none"
    }
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  function editMasterVendor(id) {
    const user = {
      SubUserId: id || undefined,
    }
    setEditModalShow(true);
    setsubUserId(user);
    apiService.getMasterVendorSubUserById(user)
      .then(response => {
        setValues({
          Name: response.data.result.Name || undefined,
          designation: response.data.result.designation || undefined,
          Department: response.data.result.Department || undefined,
          emailId: response.data.result.emailId || undefined,
          mobileNo: response.data.result.mobileNo || undefined,
          loginId: response.data.result.loginId || undefined,
          password: response.data.result.password || undefined,
          roles: response.data.result.roles || undefined,
        })
      })
  }
  const UpdateMasterVendor = (e) => {
    e.preventDefault();
    const user = {
      SubUserId: subUserId.SubUserId,
      Name: values.Name || undefined,
      designation: values.designation || undefined,
      Department: values.Department || undefined,
      emailId: values.emailId || undefined,
      mobileNo: values.mobileNo || undefined,
      loginId: values.loginId || undefined,
      password: values.password || undefined,
      roles: values.roles || undefined,
    }
    apiService.UpdateMasterVendorSubUserById(user)
      .then(response => {
        console.log("Updateresponse", response);
      })
  }
  const saveMasterVendor = (e) => {
    e.preventDefault();
    const user = {
      userId: JSON.parse(window.sessionStorage.getItem("jwt")).result.userId || undefined,
      Name: values.Name || undefined,
      designation: values.designation || undefined,
      Department: values.Department || undefined,
      emailId: values.emailId || undefined,
      mobileNo: values.mobileNo || undefined,
      loginId: values.loginId || undefined,
      password: values.password || undefined,
      roles: values.roles || undefined,
    }
    apiService.saveMasterVendor(user)
      .then(response => {
        console.log("response", user);
      })
  }
  useEffect(() => {
    apiService.getAllMasterVendorSubUser().then((res) => {
      setgetAllUser(res.data.result);
    })
  }, [])
  const deleteRecord = () => {
    Swal.fire({
      title: "Are You sure You want to delete?",
      icon: "warning",
      confirmButtonText: "OK",
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
              <div className="row p-3" >
                <div className="col-lg-10">
                  <h2 className='masterTitle'>MULTIPLE SUB USER CREATION</h2>
                </div>
                <div className="col-sm-2">
                  <Button className='add_vendor' variant="primary" onClick={() => setModalShow(true)}>
                    <AddIcon sx={{ color: 'black' }} />  Add
                  </Button>
                  <Modal show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Add User Detail
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                      <Container>
                        <Row>
                          <Col xs={12} md={6}>
                            <input type="text" className="swal2-input" name="Name" value={values.Name} onChange={handleChange('Name')} placeholder="Username" />
                          </Col>
                          <Col xs={12} md={6}>
                            <input type="text" id="designation" className="swal2-input" name="designation" value={values.designation} onChange={handleChange('designation')} placeholder="Designation" />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={6}>
                            <input type="text" id="department" className="swal2-input" name="Department" value={values.Department} onChange={handleChange('Department')} placeholder="department" />
                          </Col>
                          <Col xs={12} md={6}>
                            <input type="text" id="emailId" className="swal2-input" name="emailId" value={values.emailId} onChange={handleChange('emailId')} placeholder="Email Id" />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={6}>
                            <input type="text" id="MobNo" className="swal2-input" name="mobileNo" value={values.mobileNo} onChange={handleChange('mobileNo')} placeholder="mobile No" />
                          </Col>
                          <Col xs={12} md={6}>
                            <input type="text" id="LoginId" className="swal2-input" name="loginId" value={values.loginId} onChange={handleChange('loginId')} placeholder="LoginId" />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={6}>
                            <input type="text" id="Password" className="swal2-input" name="password" value={values.password} onChange={handleChange('password')} placeholder="Password" />
                          </Col>
                          <Col xs={12} md={6}>
                            <input type="text" id="roles" className="swal2-input" name="roles" value={values.roles} onChange={handleChange('roles')} placeholder="roles"></input>
                          </Col>
                        </Row>
                      </Container>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className='popupSave col-md-12' onClick={saveMasterVendor}>save</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
              <Box sx={{ mt: 2, height: 350, width: '100%' }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead >
                      <TableRow>
                        <TableCell className='userHead'>Action</TableCell>
                        <TableCell className='userHead' align="center">Name</TableCell>
                        <TableCell className='userHead' align="center">Designation</TableCell>
                        <TableCell className='userHead' align="center">Department</TableCell>
                        <TableCell className='userHead' align="center">Email Id</TableCell>
                        <TableCell className='userHead' align="center">Mob No</TableCell>
                        <TableCell className='userHead' align="center">Login Id</TableCell>
                        <TableCell className='userHead' align="center">Password</TableCell>
                        <TableCell className='userHead' align="center">Role</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getAllUser?.map((row) => (
                        <TableRow key={row.SubUserId}>
                          <TableCell component="th" scope="row">
                            <EditIcon onClick={() => editMasterVendor(row.SubUserId)} sx={{ color: 'black' }} />
                            <DeleteIcon onClick={deleteRecord} sx={{ color: 'black' }} />
                            <Modal show={editmodalShow} onHide={() => setEditModalShow(false)} aria-labelledby="contained-modal-title-vcenter">
                              <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                  edit User Detail
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body className="show-grid">
                                <Container>
                                  <Row>
                                    <Col xs={12} md={6}>
                                      <input type="text" className="swal2-input" name="Name" value={values.Name} onChange={handleChange('Name')} placeholder="Username" />
                                    </Col>
                                    <Col xs={12} md={6}>
                                      <input type="text" id="designation" className="swal2-input" name="designation" value={values.designation} onChange={handleChange('designation')} placeholder="Designation" />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={12} md={6}>
                                      <input type="text" id="department" className="swal2-input" name="Department" value={values.Department} onChange={handleChange('Department')} placeholder="department" />
                                    </Col>
                                    <Col xs={12} md={6}>
                                      <input type="text" id="emailId" className="swal2-input" name="emailId" value={values.emailId} onChange={handleChange('emailId')} placeholder="Email Id" />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={12} md={6}>
                                      <input type="text" id="MobNo" className="swal2-input" name="mobileNo" value={values.mobileNo} onChange={handleChange('mobileNo')} placeholder="mobile No" />
                                    </Col>
                                    <Col xs={12} md={6}>
                                      <input type="text" id="LoginId" className="swal2-input" name="loginId" value={values.loginId} onChange={handleChange('loginId')} placeholder="LoginId" />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={12} md={6}>
                                      <input type="text" id="Password" className="swal2-input" name="password" value={values.password} onChange={handleChange('password')} placeholder="Password" />
                                    </Col>
                                    <Col xs={12} md={6}>
                                      <input type="text" id="roles" className="swal2-input" name="roles" value={values.roles} onChange={handleChange('roles')} placeholder="roles"></input>
                                    </Col>
                                  </Row>
                                </Container>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button className='popupSave col-md-12' onClick={UpdateMasterVendor}>Update</Button>
                              </Modal.Footer>
                            </Modal>
                          </TableCell>
                          <TableCell align="center">{row.Name}</TableCell>
                          <TableCell align="center">{row.designation}</TableCell>
                          <TableCell align="center">{row.Department}</TableCell>
                          <TableCell align="center">{row.emailId}</TableCell>
                          <TableCell align="center">{row.mobileNo}</TableCell>
                          <TableCell align="center">{row.loginId}</TableCell>
                          <TableCell align="center">{row.password}</TableCell>
                          <TableCell align="center">
                            {row.roles}
                          </TableCell>
                        </TableRow>
                      ))}

                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
export default UserCreation;

