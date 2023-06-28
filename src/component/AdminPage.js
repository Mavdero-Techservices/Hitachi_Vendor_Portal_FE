import InputAdornment from "@material-ui/core/InputAdornment";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import TextField1 from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Container, ThemeProvider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminHeader from "../common/AdminHeader";
import apiService from "../services/api.service";
import ApprovalFields from "./ApprovalFields";
import SideBar from "./SideBar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Button from "@mui/material/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Grid from '@mui/material/Grid';

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
    width: 500,
    height: 200,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    padding: theme.spacing(2, 4, 3),
  },
}));

function AdminPage() {
  const [expanded, setExpanded] = useState(false);
  const [vendors, setvendors] = useState([]);
  const [filter, setFilter] = useState([]);
  const [submitDate, setsubmitDate] = useState();
  const [dueDay, setdueDay] = useState();
  const [approveList, setapproveList] = useState([]);

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

  useEffect(() => {
    getApprovalList();
  }, [])

  const getApprovalList = async () => {
    let applist = [];
    apiService.getApprovalList().then((res) => {
      setapproveList(res.data.result)
      applist = res.data.result;
    });

    apiService.getAllUserDetail().then((res) => {
      setFilter(res.data.basicInfo[0]);
      res.data.basicInfo[0].forEach((item) => {
        // var date1 = new Date();
        // var date01 = new Date(item.submitDate);
        // var date2 = new Date();
        // date2.setDate(date01.getDate() + 3);
        // var Difference_In_Time = date2.getTime() - date1.getTime();
        // var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        // item.updatedAt = Difference_In_Days;
        // const s = moment(date01).format("MMM DD");
        var currentdate = new Date();
        // var dates = new Date();
        // currentdate.setDate(currentdate.getDate() + 1);
        var subDate = new Date(item.submitDate);
        var dueDate = new Date();
        dueDate.setDate(subDate.getDate() + 3);
        var Difference_In_Time = dueDate.getTime() - currentdate.getTime();
        var Difference_In_Days = Math.trunc(Difference_In_Time / (1000 * 3600 * 24));
        console.log("Difference_In_Days--------------->>>>>>>>>", Difference_In_Days)
        let arr = [3, 2, 1]

        // if (Difference_In_Days === 3) {
        //   item.updatedAt = 1;
        // } else if (Difference_In_Days === 2) {
        //   item.updatedAt = 2;
        // }
        // else if (Difference_In_Days === 1) {
        //   item.updatedAt = 3;
        // }else{
        //   item.updatedAt ="expired";
        // }
        // item.updatedAt = Difference_In_Days === 3 ? 1 : Difference_In_Days === 2 ? 2 : Difference_In_Days === 1?3;

        item.updatedAt = arr.indexOf(Difference_In_Days) + 1;
        const s = moment(item.submitDate).format("MMM DD");
        item.submitDate = s;
      });
      setvendors([]);

      const arr = res.data.basicInfo[0]?.filter((vend) => {
        if (vend.submitStatus === "Submitted") {
          return !applist?.find((item1) => item1.userId === vend.userId);
        }
      });
      setvendors((array) => [...array, ...arr]);
    });
  };

  const searchHandler = (e) => {
    let input;
    let newFilteredSuggestions;

    if (e.target.value.length > 3) {
      input = e.currentTarget.value;
      newFilteredSuggestions = vendors?.filter(
        (suggestion) =>
          suggestion.companyName.toLowerCase().indexOf(input.toLowerCase()) > -1
      );
      setvendors(newFilteredSuggestions);
    } else {
      getApprovalList();
    }
  };

  


  const filterHandler = (e) => {
    
    setOpen(false);
    let newFilteredSuggestions;
    let newFilteredSuggestions1;

    if (submitDate) {
      newFilteredSuggestions = filter?.filter(
        (suggestion) =>
          suggestion.submitDate === submitDate &&
          suggestion.submitStatus === "Submitted" 
      );

      if(newFilteredSuggestions) {
        console.log("newFilteredSuggestions---------->", newFilteredSuggestions);
      }


      newFilteredSuggestions1 = newFilteredSuggestions?.filter(
        (suggestion) =>
        !approveList?.find((item1) => item1.userId === suggestion.userId)    
      );

      if(newFilteredSuggestions1) {
        console.log("newFilteredSuggestions1---------->", newFilteredSuggestions1);
      }
      
      setvendors(newFilteredSuggestions1);
    } 
    else if (dueDay) {
      let newFilteredSuggestions2;
      let newFilteredSuggestions3;
      newFilteredSuggestions2 = filter?.filter(
        (suggestion) =>
          suggestion.updatedAt == dueDay &&
          suggestion.submitStatus == "Submitted"
      );

      newFilteredSuggestions3 = newFilteredSuggestions2?.filter(
        (suggestion) =>
        !approveList?.find((item1) => item1.userId === suggestion.userId)    
      );

    console.log("newFilteredSuggestions2--------->", newFilteredSuggestions2);
      setvendors(newFilteredSuggestions3);
    } else {
      getApprovalList();
    }
  };

  const dateHandler = (e) => {
    setsubmitDate(moment(e.$d).format("MMM DD"));
  };

  const dueDayHandler = (e) => {
    console.log("setdueDay", e.target.value)
    setdueDay(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ backgroundColor: '#f3f4f7' }}  >
        <CssBaseline />
        <AdminHeader team="vendor" />
        <Box sx={{ display: 'flex' }}>
          <SideBar />
          <Box sx={{ mt: 2, width: '100%' }}>
            <Container>
              <Accordion className='accordion1' sx={{ mt: 1 }}>
                <AccordionSummary
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography variant="h5" sx={{ width: '40%', flexShrink: 0, fontWeight: "bold" }}>Approvals</Typography>
                  <Typography sx={{ width: '36%', }}></Typography>
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      )
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
              <Accordion className='accordion1' >
                <AccordionSummary
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography sx={{ width: '40%', flexShrink: 0, fontWeight: "bold" }}>Company name</Typography>
                  <Typography sx={{ width: '36%', }}></Typography>
                  <Typography sx={{ width: '12%', fontWeight: "bold" }}>Submit date</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>Age</Typography>
                </AccordionSummary>
              </Accordion>
              {vendors?.map((item, key) => <>
                <Accordion expanded={expanded === 'panel' + item.id} key={key} onChange={handleChange('panel' + item.id)} >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panelbh-content"
                    id={"panel1bh-header"}
                  >
                    <IconButton sx={{ p: 0, width: '18%', justifyContent: 'flex-start' }} >
                    {item.image && item.image !== 'null' ? <Avatar alt="Remy Sharp" src={`data:image/jpeg;base64, ${item.image}`} /> : <Typography variant="h6" sx={{ border: 'none', width:'40px',backgroundColor:'#0001', borderRadius: '50%',textTransform:'uppercase' }}> {item.companyName?.charAt(0)}</Typography>}
                      <Typography >&nbsp;{item.companyName}</Typography>
                    </IconButton>
                    <Typography textAlign="center" sx={{ width: '55%', flexShrink: 0, my: 'auto', fontWeight: "bold" }}>{item.userStatus === "MasterData" ? "Review updated vendor details" : "Review Vendor Details"}</Typography>
                    <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }} >{item.submitDate}</Typography>
                    <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }} >{item.updatedAt} {item.updatedAt > 1 ? "Days" : "Day"}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ApprovalFields userid={item.userId} approvedV="approvalTeam"/>
                  </AccordionDetails>
                </Accordion>
              </>)}
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
            <Typography variant="h6" gutterBottom sx={{ fontSize: "16px",fontWeight: 600 }}>
              Filter Results For Approval
            </Typography>

            <HighlightOffIcon
              sx={{ float: "right", marginTop: "-31px", fontSize: "20px" }}
              onClick={() => {
                setOpen(false);
              }}
            />
          </Box>

          <Grid container spacing={2}>
              <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Submit Date" onChange={dateHandler} />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
            <Grid item xs={6}>
            <TextField1
              id="outlined-number"
              placeholder="Due Day"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
                  onChange={(e) => dueDayHandler(e)}
              sx={{ top: "9px" }}
            />
            </Grid>
            </Grid>

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
  )
}

export default AdminPage
