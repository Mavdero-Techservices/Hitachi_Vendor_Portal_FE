import React from 'react'
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

function Documents() {
    const theme = createTheme({
        Link: {
            textTransform: "none"
        }
    });
    const renderDetailsButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ '&:hover': { backgroundColor: '#B1000E' }, textTransform: 'capitalize', backgroundColor: '#B1000E' }}
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        // parseName(params.row.col6)
                    }}
                >
                    Download
                </Button>
                <Button
                    variant="contained"
                    sx={{ '&:hover': { backgroundColor: '#B1000E' }, textTransform: 'capitalize', backgroundColor: '#B1000E' }}
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        // parseName(params.row.col6)
                    }}
                >
                    Upload
                </Button>
                {/* <div className="approvalManagerfile ">
                    <label for="fileupload">Select File</label>
                    <input type="file" id="fileupload" />
                </div> */}
            </strong>
        )
    }
    const columns = [
        {
            field: 'documents',
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

    const rows = [
        { id: 1, documents: 'Doc name 1' },
        { id: 2, documents: 'Doc name 2' },
        { id: 3, documents: 'Doc name 3' },
        { id: 4, documents: 'Doc name 4' },
        { id: 5, documents: 'Doc name 5' },
    ];

    return (
        <ThemeProvider theme={theme}>
            <Box style={{ backgroundColor: '#f3f4f7' }}  >
                <CssBaseline />
                <VendorPortalHeader />
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
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    disableSelectionOnClick
                                    experimentalFeatures={{ newEditingApi: true }}
                                />
                            </Box>
                        </Container>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Documents
