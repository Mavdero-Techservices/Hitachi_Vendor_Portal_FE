import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import VendorPortalHeader from '../common/VendorPortalHeader';
import VendorPortSidemenu from '../common/VendorPortSidemenu';
import Button from '@mui/material/Button';

function createData(
  id,
  paymentterms,
  poDate,
  address,
  custom,
  billto,
  shipto,
  totalpo,
  billedamt,
  unbilledamt,
  mfgcode,
  quoteno,
  purspoc,
  other
) {
  return {
    id,
    paymentterms,
    poDate,
    address,
    custom,
    billto,
    shipto,
    totalpo,
    billedamt,
    unbilledamt,
    mfgcode,
    quoteno,
    purspoc,
    other,
    history: [
      {
        ItemCodewithDescription: 'MR44',
        qty: 11,
        amount: 5000,
      },
      {
        ItemCodewithDescription: 'wifi6',
        qty: 11,
        amount: 5000,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>

        <TableCell align="right">{row.paymentterms}</TableCell>
        <TableCell align="right">{row.poDate}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell align="right">{row.custom}</TableCell>
        <TableCell align="right">{row.billto}</TableCell>
        <TableCell align="right">{row.shipto}</TableCell>
        <TableCell align="right">{row.totalpo}</TableCell>
        <TableCell align="right">{row.billedamt}</TableCell>
        <TableCell align="right">{row.unbilledamt}</TableCell>
        <TableCell align="right">{row.mfgcode}</TableCell>
        <TableCell align="right">{row.quoteno}</TableCell>
        <TableCell align="right">{row.purspoc}</TableCell>
        <TableCell align="right">{row.other}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Item Code with Description</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="center">EstimateDeliveryDate</TableCell>
                    <TableCell align="center">StartDate</TableCell>
                    <TableCell align="center">EndDate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.ItemCodewithDescription}>
                      <TableCell component="th" scope="row">
                        {historyRow.ItemCodewithDescription}
                      </TableCell>
                      <TableCell>{historyRow.qty}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        <Box>
                          <TextField
                            id="outlined-basic"
                            type="date"
                            variant="outlined"
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box>
                          <TextField
                            id="outlined-basic"
                            type="date"
                            variant="outlined"
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box>
                          <TextField
                            id="outlined-basic"
                            type="date"
                            variant="outlined"
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData(
    22114455,
    'Cheque',
    '12/01/2023',
    'chennai',
    'ABC',
    'xyz',
    'Mumbai',
    '20000',
    '15000',
    '5000',
    'efgt45',
    '67895',
    'Don quixote',
    'others'
  ),
  createData(
    22114455,
    'Cheque',
    '12/01/2023',
    'chennai',
    'ABC',
    'xyz',
    'Mumbai',
    '20000',
    '15000',
    '5000',
    'efgt45',
    '67895',
    'Don quixote',
    'others'
  ),
];
const theme = createTheme({
  Link: {
    textTransform: 'none',
  },
});

export default function EstimateDeliveryDate() {
  return (
    <ThemeProvider theme={theme}>
      <Box style={{ backgroundColor: '#f3f4f7' }}>
        <CssBaseline />
        <VendorPortalHeader />
        <Box sx={{ display: 'flex' }}>
          <VendorPortSidemenu />
          <Box sx={{ mt: 2, width: '100%', overflowX: 'auto' }}>
            {' '}
            <Box>
              <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>PO Number</TableCell>
                      <TableCell style={{ width: 200 }}>
                        Payment Terms
                      </TableCell>
                      <TableCell style={{ width: 200 }}>PO Date</TableCell>
                      <TableCell style={{ width: 200 }}>
                        Vendor Address
                      </TableCell>
                      <TableCell style={{ width: 200 }}>
                        Customer Name
                      </TableCell>
                      <TableCell style={{ width: 200 }}>Bill to</TableCell>
                      <TableCell style={{ width: 200 }}>Ship to</TableCell>
                      <TableCell style={{ width: 200 }}>Total Po Amt</TableCell>
                      <TableCell style={{ width: 200 }}>Billed amt</TableCell>
                      <TableCell style={{ width: 200 }}>Unbilled amt</TableCell>
                      <TableCell style={{ width: 200 }}>
                        Manufacturing code
                      </TableCell>
                      <TableCell style={{ width: 200 }}>Quote No</TableCell>
                      <TableCell style={{ width: 200 }}>
                        Purchase spoc
                      </TableCell>
                      <TableCell style={{ width: 200 }}>Others</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <Row key={row.name} row={row} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Button variant="contained" sx={{ ml: 110, mt: 10 }}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
