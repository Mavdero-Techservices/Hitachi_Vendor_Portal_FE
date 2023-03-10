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
import '../css/ApprovalFields.css';
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
        ItemCodewithDescription: 'MR44-HW Meraki ',
        qty: 11,
        amount: 5000,
      },
      {
        ItemCodewithDescription: 'Meraki MR Enterprise License',
        qty: 11,
        amount: 5000,
      },
      {
        ItemCodewithDescription: 'MS225-24P-HW Meraki MS225-24P ',
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
        <TableCell
          component="th"
          scope="row"
          sx={{
            width: 200,
            textAlign: 'center',
          }}
        >
          {row.id}
        </TableCell>

        <TableCell
          sx={{
            width: 200,
            textAlign: 'center',
          }}
        >
          {row.paymentterms}
        </TableCell>
        <TableCell
          sx={{
            width: 200,
            textAlign: 'center',
          }}
        >
          {row.poDate}
        </TableCell>
        <TableCell
          sx={{
            width: 200,
            textAlign: 'center',
          }}
        >
          {row.address}
        </TableCell>
        <TableCell
          sx={{
            width: 200,
            textAlign: 'center',
          }}
        >
          {row.custom}
        </TableCell>
        <TableCell
          sx={{
            width: 200,
            textAlign: 'center',
          }}
        >
          {row.billto}
        </TableCell>
        <TableCell
          sx={{
            width: 200,
            textAlign: 'center',
          }}
        >
          {row.shipto}
        </TableCell>
        <TableCell
          sx={{
            width: 200,
            textAlign: 'center',
          }}
        >
          {row.totalpo}
        </TableCell>
        <TableCell
          sx={{
            width: 200,
            textAlign: 'center',
          }}
        >
          {row.billedamt}
        </TableCell>
        <TableCell
          sx={{
            width: 200,
            textAlign: 'center',
          }}
        >
          {row.unbilledamt}
        </TableCell>
        <TableCell
          sx={{
            width: 200,
            textAlign: 'center',
          }}
        >
          {row.mfgcode}
        </TableCell>
        <TableCell
          sx={{
            width: 200,
            textAlign: 'center',
          }}
        >
          {row.quoteno}
        </TableCell>
        <TableCell
          sx={{
            width: 200,
            textAlign: 'center',
          }}
        >
          {row.purspoc}
        </TableCell>
        <TableCell
          sx={{
            width: 200,
            textAlign: 'center',
          }}
        >
          {row.other}
        </TableCell>
        <TextField type="date" sx={{ width: '8.5rem' }}></TextField>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ width: 200, fontWeight: 'bold', color: '#B1000E' }}
              >
                Details:
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: 200,
                        fontWeight: 'bold',
                        color: '#B1000E',
                        textAlign: 'center',
                        fontSize: 15,
                      }}
                    >
                      Item Code with Description
                    </TableCell>
                    <TableCell
                      sx={{
                        width: 200,
                        fontWeight: 'bold',
                        color: '#B1000E',
                        textAlign: 'center',
                        fontSize: 15,
                      }}
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: 200,
                        fontWeight: 'bold',
                        color: '#B1000E',
                        textAlign: 'center',
                        fontSize: 15,
                      }}
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: 200,
                        fontWeight: 'bold',
                        color: '#B1000E',
                        textAlign: 'center',
                        fontSize: 15,
                      }}
                    >
                      EDD
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: 200,
                        fontWeight: 'bold',
                        color: '#B1000E',
                        textAlign: 'center',
                        fontSize: 15,
                      }}
                    >
                      Start Period
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: 200,
                        fontWeight: 'bold',
                        color: '#B1000E',
                        textAlign: 'center',
                        fontSize: 15,
                      }}
                    >
                      End Period
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.ItemCodewithDescription}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          width: 200,
                          textAlign: 'center',
                        }}
                      >
                        {historyRow.ItemCodewithDescription}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: 200,
                          textAlign: 'center',
                        }}
                      >
                        {historyRow.qty}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: 200,
                          textAlign: 'center',
                        }}
                      >
                        {historyRow.amount}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: 200,
                          textAlign: 'center',
                        }}
                      >
                        <Box>
                          <TextField
                            id="outlined-basic"
                            type="date"
                            variant="outlined"
                          />
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: 200,
                          textAlign: 'center',
                        }}
                      >
                        <Box>
                          <TextField
                            id="outlined-basic"
                            type="date"
                            variant="outlined"
                          />
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: 200,
                          textAlign: 'center',
                        }}
                      >
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
              <TableContainer
                stickyHeader
                component={Paper}
                sx={{ overflowX: 'auto', width: '100%' }}
              >
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        PO Number
                      </TableCell>
                      <TableCell
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        Payment Terms
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        PO Date
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        Vendor Address
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        Customer Name
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        Bill To
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        Ship To
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        Total PoAmt
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        Billed Amt
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        Unbilled Amt
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        Manufacturing code
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        Quote No
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        Purchase spoc
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        Others
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: 200,
                          fontWeight: 'bold',
                          color: '#B1000E',
                          textAlign: 'center',
                          fontSize: 15,
                        }}
                      >
                        EDD
                      </TableCell>
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
            <Box sx={{ display: 'flex' }}>
              <Button variant="contained" sx={{ ml: 110, mt: 5 }} size="large">
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
