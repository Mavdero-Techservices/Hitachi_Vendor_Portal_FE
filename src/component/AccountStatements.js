import React,{useState} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import VendorPortalHeader from '../common/VendorPortalHeader';
import VendorPortSidemenu from '../common/VendorPortSidemenu';
import Button from '@mui/material/Button';
import { CustomFooterTotalComponent } from './CustomFooterTotalComponent';

function AccountStatements() {
    const [total, setTotal] = useState("");
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
                    sx={{'&:hover': { backgroundColor: '#B1000E' },textTransform: 'capitalize', backgroundColor: '#B1000E'}}
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        // parseName(params.row.col6)
                    }}
                >
                    Reject
                </Button>
                <Button
                    variant="contained"
                    sx={{'&:hover': { backgroundColor: '#4f4f4f' },textTransform: 'capitalize', backgroundColor: '#4f4f4f'}}
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        // parseName(params.row.col6)
                    }}
                >
                    Approve
                </Button>
            </strong>
        )
    }
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'date',
            headerName: 'Document Date',
            width: 150,
            editable: true,
        },
        {
            field: 'externalno',
            headerName: 'External Document No.',
            width: 160,
            editable: true,
        },
        {
            field: 'poNo',
            headerName: 'Purchase Order No.',
            width: 150,
            editable: true,
        },
        {
            field: 'tdsAmt',
            headerName: 'TDS Amount',
            width: 150,
            editable: true,
        },
        {
            field: 'remainAmt',
            headerName: 'Remaining Amount',
            width: 150,
            editable: true,
        },
        {
            field: 'actions',
            headerName: '',
            renderCell:renderDetailsButton,
            width: 300,
        },
    ];

    const rows = [
        { id: 1, name: 'HARMEEN INFONET', date: '19/10/22', externalno: 'HIPL2602/2022-23', poNo: 'DELXXXXXXXX', tdsAmt: '62.6', remainAmt: '80,065.40' },
          { id: 2, name: 'HARMEEN INFONET', date: '19/10/22', externalno: 'HIPL2602/2022-23', poNo: 'DELXXXXXXXX', tdsAmt: '62.6', remainAmt: '80,065.40' },
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
                                    <Typography sx={{ mt: 1, width: '40%', flexShrink: 0, fontWeight: "bold", color: '#B1000E' }}>CURRENT ACCOUNT STATEMENT</Typography>
                                    <Typography sx={{ mt: 1, width: '40%', flexShrink: 0, color: '#B1000E' }}>ACCOUNT STATEMENT CONFIRMATION</Typography>

                                </AccordionSummary>
                            </Accordion>

                            <Box sx={{ mt: 2, height: 350, width: '100%' }}>
                                <Typography variant='p' sx={{ mt: 2 }}>Kindly find the details of the outstanding balance as of (report run rate), Kindly review the same and let us know if you have found any difference in the outstanding balance, kindly approve/reject based on the showing detail or you can mention the comments here for the disputed items we will connect to you for the detail to close the same.</Typography>
                                <DataGrid
                                    sx={{ backgroundColor: "white", mt: 2 }}
                                    rows={rows}
                                    columns={columns}
                                    components={{
                                        // Toolbar: GridToolbar,
                                        Footer: CustomFooterTotalComponent
                                      }}
                                      componentsProps={{
                                        footer: { total }
                                      }}

                                      onStateChange={(state) => {
                                        const visibleRows = state.filter.visibleRowsLookup;
                                        let visibleItems = [];
                                        for (const [id, value] of Object.entries(visibleRows)) {
                                          if (value === true) {
                                            visibleItems.push(id);
                                          }
                                        }
                                        console.log(visibleItems);
                                        const res = rows.filter((item) => visibleItems.includes(item.id));
                                       console.log("res=========>>>>", res)
                                        const total = res
                                          .map((item) => item.remainAmt)
                                          .reduce((a, b) => a + b, 0);
                                        console.log(total);
                                        setTotal(total);
                                      }}
                                    // pageSize={5}
                                  
                                    //  initialState={{
                                    //     aggregation: {
                                    //         model: {
                                    //             remainAmt: 'sum',
                                    //         },
                                    //     },
                                    // }}
                                    // experimentalFeatures={{aggregation: true }}
                                />
                                {/* <div className="float-end" >
                                    <button type="button" className="btn bankbtn btn-primary btn-md m-2">Download</button>
                                </div> */}
                            </Box>

                        </Container>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default AccountStatements
