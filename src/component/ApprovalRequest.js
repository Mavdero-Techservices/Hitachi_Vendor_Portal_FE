import React, { useState } from 'react'
import AdminHeader from '../common/AdminHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Box, Checkbox, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from "@mui/material";
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { DataGrid } from '@mui/x-data-grid';

function ApprovalRequest() {
    const theme = createTheme({
        Link: {
            textTransform: "none"
        }
    });

    const columns = [
        {
            field: 'documents',
            headerName: 'Documents',
            width: 550,
            editable: true,
        },
        {
            field: 'quaterly',
            headerName: 'Quaterly',
            renderCell: (params) => (
                <Checkbox
                    checked={params.rows?.confirmed}
                //   onChange={() => handleConfirmChange(params.row)}
                />
            ),
            width: 150,
        },
        {
            field: 'halfyearly',
            headerName: 'Half-yearly',
            renderCell: (params) => (
                <Checkbox
                    checked={params.rows?.confirmed}
                //   onChange={() => handleConfirmChange(params.row)}
                />
            ),
            width: 150,
        },
        {
            field: 'yearly',
            headerName: 'Yearly',
            renderCell: (params) => (
                <Checkbox
                    checked={params.rows?.confirmed}
                //   onChange={() => handleConfirmChange(params.row)}
                />
            ),

            width: 160,
            // valueGetter: (params) =>
            //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];

    const rows = [
        { id: 1, documents: 'Doc name 1' },
        { id: 2, documents: 'Doc name 2' },
    ];

    return (
        <ThemeProvider theme={theme}>
            <Box style={{ backgroundColor: '#f3f4f7' }}  >
                <CssBaseline />
                <AdminHeader team="mrtTeam"/>
                <Box sx={{ display: 'flex' }}>
                    <SideBar MRT="MRTteam"/>
                    <Box sx={{ mt: 2, width: '100%' }}>
                        <Container>
                            <Accordion className='accordion1' sx={{ mt: 1, }}>
                                <AccordionSummary
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <Typography sx={{ mt: 1, width: '30%', flexShrink: 0, fontWeight: "bold" }}>Periodic requests</Typography>
                                    <Typography sx={{ mt: 1, width: '20%', flexShrink: 0, fontWeight: "bold" }}>Agreement</Typography>
                                    <Typography sx={{ mt: 1, width: '30%', }}></Typography>
                                    <Button style={{ textTransform: 'capitalize', }}
                                        variant="contained"
                                        component="label"
                                        sx={{ mr: 2, color: 'white','&:hover': { backgroundColor: '#4f4f4f' }, backgroundColor: '#4f4f4f', fontWeight: '700', display: 'block' }}
                                    >
                                        <AddBoxIcon />&nbsp;Add documents
                                        <input
                                            type="file"
                                            hidden
                                        />
                                    </Button>
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
                            <div className="float-end" >
                                <button type="button" className="btn bankbtn btn-primary btn-md m-2">Save</button>
                                <button type="button" className="btn bankbtn btn-primary btn-md m-2">Request</button>
                            </div>
                        </Container>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default ApprovalRequest
