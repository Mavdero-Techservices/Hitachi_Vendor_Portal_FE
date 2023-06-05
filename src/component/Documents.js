import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from "@mui/material";
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import VendorPortalHeader from '../common/VendorPortalHeader';
import VendorPortSidemenu from '../common/VendorPortSidemenu';
import { useParams } from 'react-router-dom';
import apiService from "../services/api.service";
import Swal from 'sweetalert2';

function Documents() {
    const [doclist, setdoclist] = useState([]);
    const param = useParams();
    const theme = createTheme({
        Link: {
            textTransform: "none"
        }
    });
    const docUpload = (event, fileName) => {
        fileName.vendorId=  event.target.files[0]
        // console.log("fileName22222----------->>>>",fileName)
    }
    const docDownload = (event, fileName) => {
        // NDA_Doc-1675160386209.pdf
        // uploads/bankdetailDoc-1675928620398
        if (fileName) {
            let text = fileName
            let fname = text.split("/");

            //     let name = fname[1]

            fetch(
                `${process.env.REACT_APP_API_URL}:12707/downloadPdfUploads/${fname[1]}`
            ).then((response) => {
                console.log("path---------------->>>>>", response)

                if (response.statusText === "Not Found") {
                    Swal.fire({
                        title: "Error While Fetching",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                } else {
                    response.blob().then((blob) => {
                        let url = URL.createObjectURL(blob, 'application/pdf');
                        let tempLink = document.createElement('a');
                        tempLink.href = url;
                        tempLink.setAttribute('download', fname[1]);
                        tempLink.click();
                        //   window.open(url,fname[1]);
                    });
                }
            });

        } else {
            Swal.fire({
                title: "Error While Fetching",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    }
    const renderDetailsButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ '&:hover': { backgroundColor: '#B1000E' }, textTransform: 'capitalize', backgroundColor: '#B1000E' }}
                    style={{ marginLeft: 16 }}
                    onClick={(e) => {
                        docDownload(e, params.row.docName)
                    }}
                >
                    Download
                </Button>
                {/* <Button
                    variant="contained"
                    sx={{ '&:hover': { backgroundColor: '#B1000E' }, textTransform: 'capitalize', backgroundColor: '#B1000E' }}
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={(e) => {
                        docUpload(e, params.row.createdAt)
                    }}
                >
                    Upload
                </Button> */}
                {/* <div className="approvalManagerfile ">
                    <label for="fileupload">Select File</label>
                    <input type="file" id="fileupload" />
                </div> */}
                <Button
                    variant="contained"
                    component="label"
                    size="small"
                    sx={{ '&:hover': { backgroundColor: '#B1000E' }, textTransform: 'capitalize', backgroundColor: '#B1000E' }}
                    color="primary"
                
                    style={{ marginLeft: 16 }}
                >
                    Upload File
                    <input style={{backgroundColor:'red'}}
                        type="file"  onClick={(e) => {
                            docUpload(e, params.row)
                        }}
                        hidden
                    />
                </Button>
            </strong>
        )
    }
    const columns = [
        {
            field: 'docName',
            headerName: 'Documents Name',
            width: 550,
            editable: true,
        },
        {
            field: 'quaterly',
            headerName: '',
            renderCell: renderDetailsButton,
            width: 300,
        },
    ];

    const rows = doclist ? doclist : [];

    useEffect(() => {
        // apiService.VendorregList().then(response => {
        //     setvendorList(response.data.result);
        // })
        apiService.vendorIdList(param?.vId).then(response => {
            setdoclist(response.data.result)
            console.log("response.data.result------------req-->>>", response)
            // setreqData(response.data.result);
        })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log("rows-------------->>>>", rows);
    }
    return (
        <ThemeProvider theme={theme}>
            <Box style={{ backgroundColor: '#f3f4f7' }}  >
                <CssBaseline />
                <VendorPortalHeader vCode={param?.vId} />
                <Box sx={{ display: 'flex' }}>
                    <VendorPortSidemenu />
                    <Box sx={{ mt: 2, width: '100%' }}>
                        <Container>
                            <Accordion className='accordion1' sx={{ mt: 1, }}>
                                <AccordionSummary
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <Typography sx={{ mt: 1, width: '30%', flexShrink: 0, fontWeight: "bold", color: '#B1000E' }}>PERIODIC DOCUMENTS</Typography>
                                    <Typography sx={{ mt: 1, width: '20%', flexShrink: 0, color: '#B1000E' }}>AGREEMENTS</Typography>
                                    <Typography sx={{ mt: 1, width: '30%', flexShrink: 0, color: '#B1000E' }}>TDS CERTIFICATE</Typography>

                                </AccordionSummary>
                            </Accordion>
                            <Box sx={{ mt: 4, height: 350, width: '100%' }}>
                                <DataGrid
                                    sx={{ backgroundColor: "white" }}
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    isloading={true}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    disableSelectionOnClick
                                    experimentalFeatures={{ newEditingApi: true }}
                                />
                                <button type="button" style={{ float: 'right', marginRight: '20px' }} onClick={(e) => submitHandler(e)} className="btn bankbtn btn-primary btn-md m-2">Save</button>
                            </Box>
                        </Container>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Documents
