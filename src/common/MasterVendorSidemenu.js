import AppRegistrationSharpIcon from "@mui/icons-material/AppRegistrationSharp";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PostAddIcon from "@mui/icons-material/PostAdd";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Container } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import apiService from "../services/api.service";
import { useNavigate } from "react-router-dom";

export const MasterVendorSidemenu = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [open, setOpen] = useState(false);
  const sidemenuOpen = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  const [vendorDetails, setvendorDetails] = useState([]);
  const [vendorComDetails, setvendorComDetails] = useState([]);
  const [UserId, setUserId] = useState("");
  const [City, setCity] = useState();
  const [Post_Code, setPincode] = useState();
  const [state, setState] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [getAllvendorcode,setgetAllvendorcode] = useState([]);
  const [VendorId, setVendorId] = useState("");

  useEffect(() => {
    apiService.getErpVendor_APIByP_A_N_No(JSON.parse(window.sessionStorage.getItem("jwt")).result.Ticket_ID).then((vendorCode) => {
      if (vendorCode.message === "No record found for the given Ticket_ID") {
      setgetAllvendorcode("");
      }
      else
      {
        setgetAllvendorcode(vendorCode.data);
      }
    });
    apiService.getAllUserDetail().then((res) => {
      setvendorDetails(res.data.basicInfo[0]);
    });
    let userid = JSON.parse(window.sessionStorage.getItem("jwt")).result.userId;

    apiService.signupFindByUserId(userid).then((res) => {
      setAdminEmail(res.data.result.emailId);
    });

    apiService.getAllUserDetail().then((res) => {
      setvendorComDetails(res.data.CommunicationDetails[0]);
    });
  }, []);

  const handlePincode = (e) => {
    if (City) {
      setPincode(e);
      const id = vendorDetails?.filter((item) => {
        return item.Post_Code === e && item.City === City;
      });

      setUserId(id[0].userId);
      setCity(id[0].City);
    } else {
      setPincode(e);

      const id = vendorDetails?.filter((item) => {
        return item.Post_Code === e;
      });

      setUserId(id[0].userId);
      setCity(id[0].City);
    }
  };
  const handleUserId = (e) => {
    setVendorId(e);
  };
  const handleCity = (e) => {
    setCity(e);
  };

  const openModelShow = () => {
    apiService.getAllUserDetail().then((res) => {
      setvendorDetails(res.data.basicInfo[0]);
    });

    setModalShow(true);
  };

  const handleState = () => {
    let id = 'newReg'
    navigate(`/basic/newReg/${id}`);
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "block", sm: "none" },
          maxWidth: 60,
          minHeight: "100%",
          bgcolor: "#B1000E",
          color: "white",
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={sidemenuOpen}
              sx={{ ml: 1 }}
            ></IconButton>
          </List>
          <List>
            <ListItem
              disablePadding
              sx={{ color: "white" }}
              component={Link}
              to="/userCreation"
            >
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
              >
                <ListItemIcon>
                  <PersonAddAltRoundedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="User Creation"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ color: "white" }}
              component={Link}
              to="/UserAccess"
            >
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
              >
                <ListItemIcon>
                  <VerifiedUserIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="User Access"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              component={Link}
              to="/"
              sx={{ color: "white" }}
            >
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
              >
                <ListItemIcon>
                  <PostAddIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="New Registration"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ color: "white" }}>
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
              >
                <ListItemIcon>
                  <AppRegistrationSharpIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Master Data"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          width: "100%",
          ...(open && { width: "60px" }),
          maxWidth: 280,
          minHeight: "100vh",
          bgcolor: "#B1000E",
          color: "white",
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={sidemenuOpen}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          </List>
          <List>
            <ListItem
              disablePadding
              sx={{ color: "white" }}
              component={Link}
              to="/userCreation"
            >
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
              >
                <ListItemIcon>
                  <PersonAddAltRoundedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="User Creation"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ color: "white" }}
              component={Link}
              to="/UserAccess"
            >
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
              >
                <ListItemIcon>
                  <VerifiedUserIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="User Access"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ color: "white" }}>
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
                value={state}
                onClick={(e) => handleState(e.target.value)}
              >
                <ListItemIcon>
                  <PostAddIcon sx={{ color: "white" }} />
                </ListItemIcon>

                <ListItemText
                  primary="New Registration"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ color: "white" }}>
              <ListItemButton
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  borderRadius: "20px",
                }}
              >
                <ListItemIcon>
                  <AppRegistrationSharpIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Master Data"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                  onClick={openModelShow}
                />
                <Modal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  aria-labelledby="contained-modal-title-vcenter"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Select City,Pincode and Vendor Code
                    </Modal.Title>
                  </Modal.Header>
                  <Container sx={{ mt: 5 }}>
                    <Row>
                      <Col>
                        {" "}
                        <Box sx={{ display: "flex" }}>
                          {" "}
                          <InputLabel sx={{ mt: 2 }}> City:</InputLabel>
                          <FormControl sx={{ width: 200, ml: 11 }}>
                            <Select
                              native
                              value={City}
                              onChange={(e) => handleCity(e.target.value)}
                              input={
                                <OutlinedInput
                                  label=""
                                  id="demo-dialog-native"
                                />
                              }
                            >
                              <option>Select City</option>
                              {vendorDetails?.map((item) => {
                                return (
                                  <option key={item.id} value={item.City}>
                                    {item.City}
                                  </option>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Box>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {" "}
                        <Box sx={{ mt: 5, display: "flex" }}>
                          <InputLabel sx={{ mt: 2 }}>Pin Code:</InputLabel>
                          <FormControl sx={{ width: 200, ml: 6 }}>
                            <Select
                              native
                              value={Post_Code}
                              onChange={(e) => handlePincode(e.target.value)}
                              input={
                                <OutlinedInput
                                  label=""
                                  id="demo-dialog-native"
                                />
                              }
                            >
                              <option>Select Pincode</option>
                              {City
                                ? vendorDetails
                                    ?.filter((item) => {
                                      return item.City === City;
                                    })
                                    ?.map((item) => {
                                      return (
                                        <option
                                          key={item.id}
                                          value={item.Post_Code}
                                        >
                                          {item.Post_Code}
                                        </option>
                                      );
                                    })
                                : vendorDetails?.map((item) => {
                                    return (
                                      <option
                                        key={item.id}
                                        value={item.Post_Code}
                                      >
                                        {item.Post_Code}
                                      </option>
                                    );
                                  })}
                            </Select>
                          </FormControl>
                        </Box>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Box sx={{ mt: 5, display: "flex" }}>
                          <InputLabel sx={{ mt: 2 }}>Vendor Code:</InputLabel>

                          <FormControl sx={{ width: 200, ml: 2.5 }}>
                            <Select
                              value={VendorId}
                              onChange={(e) => handleUserId(e.target.value)}
                              native
                              input={
                                <OutlinedInput
                                  label=""
                                  id="demo-dialog-native"
                                />
                              }
                            >
                              <option> Select Vendorcode</option>
                              {getAllvendorcode?.map((item) => {
                                    return (
                                      <option
                                        key={item.No}
                                        value={item.No}
                                      >
                                        {item.No}
                                      </option>
                                    );
                                  })}
                            </Select>
                          </FormControl>
                        </Box>
                      </Col>
                    </Row>
                  </Container>
                  <Box sx={{ display: "flex", ml: 50, mb: 1 }}>
                    <Box>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/basic/${UserId}`)}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </>
  );
};

export default MasterVendorSidemenu;
